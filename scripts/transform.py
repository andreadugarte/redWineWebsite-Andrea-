#!/usr/bin/env python3
"""Transform raw WP (WPBakery) content into clean structured JSON for the Next.js site."""
import json, os, re, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "content", "raw")
SITE = os.path.join(ROOT, "content", "site")
os.makedirs(SITE, exist_ok=True)

pages = json.load(open(f"{RAW}/pages.json"))
posts = json.load(open(f"{RAW}/posts.json"))
cats = json.load(open(f"{RAW}/categories.json"))
imgmap = json.load(open(f"{ROOT}/content/image-map.json"))
cat_by_id = {c["id"]: c for c in cats}

# id -> local image path
id2img = {}
for url, meta in imgmap.items():
    id2img[str(meta["id"])] = {"src": meta["local"], "alt": meta.get("alt") or meta.get("title") or "", "w": meta.get("w"), "h": meta.get("h")}


def clean_text(s):
    s = re.sub(r"<br\s*/?>", " ", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    return re.sub(r"[ \t]+", " ", s).strip()


def paragraphs(block):
    parts = re.split(r"</p>|<p>|\n", block)
    out = []
    for p in parts:
        t = clean_text(p)
        # drop leftover shortcode fragments
        t = re.sub(r"\[/?[a-z_]+[^\]]*\]", "", t).strip()
        if len(t) > 1:
            out.append(t)
    return out


TOKEN = re.compile(
    r"(?P<heading><h[1-6][^>]*class=\"[^\"]*\bheading\b[^\"]*\"[^>]*>(?P<htext>.*?)</h[1-6]>)"
    r"|(?P<pre><div class=\"pre-heading[^>]*>(?P<ptext>.*?)</div>)"
    r"|(?P<text>\[vc_column_text[^\]]*\](?P<ttext>.*?)\[/vc_column_text\])"
    r"|(?P<sub><div class=\"sub-heading[^\"]*\"[^>]*>(?P<stext>.*?)</div>)"
    r"|(?P<img>\[vc_single_image\s+image=[\"”″](?P<iid>\d+))",
    re.DOTALL | re.IGNORECASE,
)


def to_blocks(rendered):
    rendered = html.unescape(rendered)  # normalize smart-quote attr delimiters
    blocks = []
    for m in TOKEN.finditer(rendered):
        if m.group("heading"):
            t = clean_text(m.group("htext"))
            if t:
                blocks.append({"type": "heading", "text": t})
        elif m.group("pre"):
            t = clean_text(m.group("ptext"))
            if t and t.upper() != "RED DEL VINO":
                blocks.append({"type": "eyebrow", "text": t})
        elif m.group("text"):
            ps = paragraphs(m.group("ttext"))
            if ps:
                blocks.append({"type": "text", "paragraphs": ps})
        elif m.group("sub"):
            ps = paragraphs(m.group("stext"))
            if ps:
                blocks.append({"type": "text", "paragraphs": ps})
        elif m.group("img"):
            iid = m.group("iid")
            if iid in id2img:
                blocks.append({"type": "image", **id2img[iid]})
    return blocks


def feat_img(item):
    fid = str(item.get("featured_media", 0))
    return id2img.get(fid)


def all_text(blocks):
    out = []
    for b in blocks:
        if b["type"] == "text":
            out += b["paragraphs"]
    return out


# ---- PAGES ----
site_pages = {}
for p in pages:
    slug = p["slug"]
    blocks = to_blocks(p["content"]["rendered"])
    headings = [b["text"] for b in blocks if b["type"] == "heading"]
    site_pages[slug] = {
        "slug": slug,
        "title": clean_text(p["title"]["rendered"]),
        "hero_heading": headings[0] if headings else clean_text(p["title"]["rendered"]),
        "hero_image": feat_img(p),
        "blocks": blocks,
    }
json.dump(site_pages, open(f"{SITE}/pages.json", "w"), indent=2, ensure_ascii=False)

VARIETALS = {"Cabernet Sauvignon", "Carmenere", "Chardonnay", "Merlot", "Sauvignon Blanc", "Semillón", "Sirah"}

# ---- PRODUCERS (posts in cat 53) ----
producers = []
tourism = []
wines = []
PRICES = {
    "campesino-cabernet-sauvignon-reserva": {"price": 24, "vintage": 2021, "abv": "14.0%"},
    "campesino-carmenere": {"price": 22, "vintage": 2021, "abv": "13.5%"},
    "campesino-chardonnay": {"price": 19, "vintage": 2022, "abv": "13.0%"},
    "campesino-chardonnay-gran-reserva": {"price": 28, "vintage": 2021, "abv": "13.5%"},
}
COLOR = {"Chardonnay": "white", "Sauvignon Blanc": "white", "Semillón": "white"}

for p in posts:
    cids = p.get("categories", [])
    names = [cat_by_id[c]["name"] for c in cids if c in cat_by_id]
    slug = p["slug"]
    blocks = to_blocks(p["content"]["rendered"])
    body = all_text(blocks)
    title = clean_text(p["title"]["rendered"])
    img = feat_img(p) or next((b for b in blocks if b["type"] == "image"), None)
    if "Producers" in names:
        varietals = [n for n in names if n in VARIETALS]
        producers.append({
            "slug": slug, "name": title, "varietals": varietals,
            "portrait": img, "bio": body,
        })
    elif "Tourism" in names:
        tourism.append({"slug": slug, "name": title, "image": img, "body": body, "blocks": blocks})
    elif "Wines" in names:
        pr = PRICES.get(slug, {"price": 20, "vintage": 2022, "abv": "13.5%"})
        low = slug.lower()
        if "cabernet" in low:
            varietal = "Cabernet Sauvignon"
        elif "carmenere" in low or "carménère" in title.lower():
            varietal = "Carménère"
        elif "chardonnay" in low:
            varietal = "Chardonnay"
        else:
            varietal = next((n for n in names if n in VARIETALS), "Red Blend")
        # tasting notes: parse View/Smells/In mouth/Pairing
        joined = " ".join(body)
        wines.append({
            "slug": slug, "name": title, "varietal": varietal,
            "color": COLOR.get(varietal, "red"),
            "image": img, "notes": body, "description": joined[:240],
            "price": pr["price"], "currency": "USD", "vintage": pr["vintage"], "abv": pr["abv"],
        })

json.dump(producers, open(f"{SITE}/producers.json", "w"), indent=2, ensure_ascii=False)
json.dump(tourism, open(f"{SITE}/tourism.json", "w"), indent=2, ensure_ascii=False)
json.dump(wines, open(f"{SITE}/wines.json", "w"), indent=2, ensure_ascii=False)

print(f"pages={len(site_pages)} producers={len(producers)} tourism={len(tourism)} wines={len(wines)}")
print("\nWINES:")
for w in wines:
    print(f"  {w['name']:<40} {w['varietal']:<20} ${w['price']} img={'Y' if w['image'] else 'N'} notes={len(w['notes'])}")
print("\nPRODUCERS (first 6):")
for p in producers[:6]:
    print(f"  {p['name']:<28} {p['varietals']} bio_paras={len(p['bio'])} portrait={'Y' if p['portrait'] else 'N'}")
print("\nPAGE block counts:")
for s, pg in site_pages.items():
    types = {}
    for b in pg["blocks"]:
        types[b["type"]] = types.get(b["type"], 0) + 1
    print(f"  {s:<34} hero_img={'Y' if pg['hero_image'] else 'N'} {types}")
