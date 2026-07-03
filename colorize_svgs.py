import os
import re

svgs = {
    'public/assets/tech-icons/burp.svg': '#FF6633',
    'public/assets/tech-icons/claude.svg': '#D97757',
    'public/assets/tech-icons/owasp.svg': '#EEEEEE',
    'public/assets/tech-icons/wireshark.svg': '#1679A7'
}

for path, color in svgs.items():
    if not os.path.exists(path):
        continue
    with open(path, 'r') as f:
        content = f.read()
    
    # Check if there is already a fill attribute on the svg tag or path
    # A simple and robust way is to just add it to the <svg> tag if it doesn't exist,
    # but some simple-icons SVGs just have it in <svg>.
    if 'fill="' not in content:
        content = content.replace('<svg ', f'<svg fill="{color}" ', 1)
        with open(path, 'w') as f:
            f.write(content)
        print(f"Colorized {path} with {color}")
    else:
        print(f"Already colorized {path}")
