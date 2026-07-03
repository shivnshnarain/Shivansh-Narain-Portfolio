const fs = require('fs');

const cssPath = '/Users/shivanshnarain/Documents/shivanshfin/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

const targetStr = '.hero-card-10 { animation-delay: -9s; animation-duration: 13s; }';
const replacementStr = `.hero-card-10 { animation-delay: -9s; animation-duration: 13s; }
.hero-card-11 { animation-delay: -4s; animation-duration: 15s; }
.hero-card-12 { animation-delay: -7s; animation-duration: 12s; }`;

if (css.includes(targetStr)) {
  css = css.replace(targetStr, replacementStr);
  fs.writeFileSync(cssPath, css);
  console.log("CSS updated with card 11 and 12.");
} else {
  console.log("Target string not found in CSS.");
  process.exit(1);
}
