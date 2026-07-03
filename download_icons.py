import urllib.request
import os

icons = {
    'html': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    'node': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'mongo': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'vscode': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'ubuntu': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg',
    'bash': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
    'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    'photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
    'illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg',
    'canva': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    'postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    
    # Missing from devicons mostly, using raw githubusercontent or wikimedia
    'kali': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg',
    'burp': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Burp_Suite_Logo.svg',
    'wireshark': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Wireshark_Icon.svg',
    'nmap': 'https://raw.githubusercontent.com/nmap/nmap/master/docs/nmap-logo-256-blue.png', 
    'owasp': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/OWASP_logo_with_text.svg',
    'chatgpt': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'claude': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Claude_AI_logo.svg',
    'gemini': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg'
}

for name, url in icons.items():
    ext = url.split('.')[-1]
    filepath = f"public/assets/tech-icons/{name}.{ext}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
