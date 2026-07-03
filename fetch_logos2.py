import urllib.request

LOGOS = {
    "css3.svg": "https://cdn.simpleicons.org/css3",
    "canva.svg": "https://cdn.simpleicons.org/canva",
    "adobephotoshop.svg": "https://cdn.simpleicons.org/adobephotoshop",
    "visualstudiocode.svg": "https://cdn.simpleicons.org/visualstudiocode",
}

for filename, url in LOGOS.items():
    filepath = "public/logos/" + filename
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
