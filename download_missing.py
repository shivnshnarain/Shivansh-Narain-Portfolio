import urllib.request
import os

icons = {
    'claude': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Claude_AI_logo.svg',
    'burp': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Burp_Suite_Logo.svg',
    'nmap': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Nmap_logo.svg',
    'wireshark': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Wireshark_Icon.svg',
    'owasp': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/OWASP_logo_with_text.svg'
}

for name, url in icons.items():
    filepath = f"public/assets/tech-icons/{name}.svg"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        with urllib.request.urlopen(req) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
