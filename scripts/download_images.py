#!/usr/bin/env python3
"""Download all media from media.json into public/images, build url->path map."""
import json, os, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "content", "raw")
OUT = os.path.join(ROOT, "public", "images", "original")
os.makedirs(OUT, exist_ok=True)

media = json.load(open(f"{RAW}/media.json"))
mapping = {}
ok = fail = 0
for m in media:
    url = m.get("source_url")
    if not url:
        continue
    name = os.path.basename(urllib.parse.urlparse(url).path)
    dest = os.path.join(OUT, name)
    mapping[url] = {
        "local": f"/images/original/{name}",
        "id": m["id"],
        "alt": m.get("alt_text", ""),
        "title": (m.get("title", {}) or {}).get("rendered", ""),
        "mime": m.get("mime_type", ""),
        "w": (m.get("media_details", {}) or {}).get("width"),
        "h": (m.get("media_details", {}) or {}).get("height"),
    }
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        ok += 1
        continue
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
            f.write(r.read())
        ok += 1
    except Exception as e:
        fail += 1
        print("FAIL", url, e)

json.dump(mapping, open(f"{ROOT}/content/image-map.json", "w"), indent=2, ensure_ascii=False)
print(f"\nDownloaded/verified: {ok}  failed: {fail}  total mapped: {len(mapping)}")
