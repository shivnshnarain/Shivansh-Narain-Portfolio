from PIL import Image
img = Image.open("/Users/shivanshnarain/Documents/shivanshfin/public/hero_bg.png")
w, h = img.size
new_w = int(h * 16 / 9)
new_img = Image.new("RGB", (new_w, h), (255, 255, 255))
new_img.paste(img, ((new_w - w) // 2, 0))
new_img.save("/Users/shivanshnarain/Documents/shivanshfin/public/hero_bg.png")
print("Done padding image")
