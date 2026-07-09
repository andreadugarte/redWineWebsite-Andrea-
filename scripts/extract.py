#!/usr/bin/env python3
"""Extract all content + media metadata from reddelvino.com via WP REST API."""
import json, os, re, urllib.request, html

BASE = "https://reddelvino.com/wp-json/wp/v2"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "content", "raw")
os.makedirs(RAW, exist_ok=True)


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 extract"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.load(r)


def get_all(endpoint):
    out, page = [], 1
    while True:
        try:
            batch = get(f"{BASE}/{endpoint}?per_page=100&page={page}")
        except Exception as e:
            break
        if not batch:
            break
        out.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    return out


def strip_html(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = html.unescape(s)
    return re.sub(r"\s+", " ", s).strip()


print("Fetching pages...")
pages = get_all("pages")
print("Fetching posts...")
posts = get_all("posts")
print("Fetching media...")
media = get_all("media")
print("Fetching categories...")
cats = get_all("categories")

json.dump(pages, open(f"{RAW}/pages.json", "w"), indent=2, ensure_ascii=False)
json.dump(posts, open(f"{RAW}/posts.json", "w"), indent=2, ensure_ascii=False)
json.dump(media, open(f"{RAW}/media.json", "w"), indent=2, ensure_ascii=False)
json.dump(cats, open(f"{RAW}/categories.json", "w"), indent=2, ensure_ascii=False)

cat_by_id = {c["id"]: c for c in cats}

# Build clean inventory
inv = {"pages": [], "posts": [], "media_count": len(media)}
for p in pages:
    inv["pages"].append({
        "id": p["id"],
        "slug": p["slug"],
        "title": strip_html(p["title"]["rendered"]),
        "link": p["link"],
        "text_len": len(strip_html(p["content"]["rendered"])),
        "featured_media": p.get("featured_media", 0),
    })
for p in posts:
    catnames = [cat_by_id[c]["name"] for c in p.get("categories", []) if c in cat_by_id]
    inv["posts"].append({
        "id": p["id"],
        "slug": p["slug"],
        "title": strip_html(p["title"]["rendered"]),
        "link": p["link"],
        "categories": catnames,
        "text_len": len(strip_html(p["content"]["rendered"])),
        "featured_media": p.get("featured_media", 0),
    })

json.dump(inv, open(f"{ROOT}/content/inventory.json", "w"), indent=2, ensure_ascii=False)

print(f"\nPAGES ({len(pages)}):")
for p in sorted(inv["pages"], key=lambda x: x["slug"]):
    print(f"  {p['slug']:<28} title='{p['title']}' chars={p['text_len']} img={p['featured_media']}")
print(f"\nPOSTS ({len(posts)}):")
for p in sorted(inv["posts"], key=lambda x: (str(x['categories']), x["slug"])):
    print(f"  [{','.join(p['categories']):<28}] {p['title']:<40} chars={p['text_len']}")
print(f"\nMEDIA: {len(media)} items")
