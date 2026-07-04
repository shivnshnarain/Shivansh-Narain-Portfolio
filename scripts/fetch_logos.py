import os
import urllib.request

LOGOS = {
    "html5.svg": "https://cdn.simpleicons.org/html5/E34F26",
    "css3.svg": "https://cdn.simpleicons.org/css3/1572B6",
    "javascript.svg": "https://cdn.simpleicons.org/javascript/F7DF1E",
    "react.svg": "https://cdn.simpleicons.org/react/61DAFB",
    "tailwindcss.svg": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    "nodedotjs.svg": "https://cdn.simpleicons.org/nodedotjs/339933",
    "express.svg": "https://cdn.simpleicons.org/express/000000",
    "mongodb.svg": "https://cdn.simpleicons.org/mongodb/47A248",
    "firebase.svg": "https://cdn.simpleicons.org/firebase/FFCA28",
    "linux.svg": "https://cdn.simpleicons.org/linux/FCC624",
    "arduino.svg": "https://cdn.simpleicons.org/arduino/00979D",
    "espressif.svg": "https://cdn.simpleicons.org/espressif/E7352C",
    "canva.svg": "https://cdn.simpleicons.org/canva/00C4CC",
    "adobephotoshop.svg": "https://cdn.simpleicons.org/adobephotoshop/31A8FF",
    "git.svg": "https://cdn.simpleicons.org/git/F05032",
    "github.svg": "https://cdn.simpleicons.org/github/181717",
    "visualstudiocode.svg": "https://cdn.simpleicons.org/visualstudiocode/007ACC",
}

CUSTOM_ICONS = {
    "networking.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
    "cryptography.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    "ctf.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',
    "embedded.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
    "aitools.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>', # Using CPU for AI too
    "antigravity.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
}

os.makedirs("public/logos", exist_ok=True)

# Delete existing 0 byte files just in case
for filename in os.listdir("public/logos"):
    filepath = os.path.join("public/logos", filename)
    if os.path.isfile(filepath) and os.path.getsize(filepath) == 0:
        os.remove(filepath)

for filename, url in LOGOS.items():
    filepath = os.path.join("public/logos", filename)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

for filename, content in CUSTOM_ICONS.items():
    filepath = os.path.join("public/logos", filename)
    with open(filepath, 'w') as out_file:
        out_file.write(content)
    print(f"Created {filename}")
