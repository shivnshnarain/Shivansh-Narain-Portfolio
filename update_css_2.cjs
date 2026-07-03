const fs = require('fs');

const cssPath = '/Users/shivanshnarain/Documents/shivanshfin/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

const startTag = '.gallery-hero {';
const endStr = '  .gallery-hero-title { align-items: center; }\n}';

const startIndex = css.indexOf(startTag);
const endIndex = css.indexOf(endStr, startIndex) + endStr.length;

if (startIndex === -1 || endIndex < endStr.length) {
  console.log("Could not find start or end block.");
  process.exit(1);
}

const newCssBlock = `.gallery-hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #FF4D73;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0;
}

.hero-background-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-color: #FF4D73;
  background-image: 
    radial-gradient(circle at center, #FF6B81 0%, #FF4D73 100%),
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
}

.hero-glow-blob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vw;
  max-width: 800px;
  max-height: 800px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
  filter: blur(80px);
}

.hero-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.white-particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
  opacity: 0.6;
  animation: particle-float 25s infinite linear;
}

@keyframes particle-float {
  0% { transform: translateY(100vh) translateX(0) scale(1); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-20vh) translateX(50px) scale(0.5); opacity: 0; }
}

/* Generate random particle positions and delays */
.particle-0 { left: 10%; width: 4px; height: 4px; animation-duration: 25s; animation-delay: -5s; }
.particle-1 { left: 20%; width: 6px; height: 6px; animation-duration: 30s; animation-delay: -12s; filter: blur(1px); }
.particle-2 { left: 30%; width: 3px; height: 3px; animation-duration: 22s; animation-delay: -2s; }
.particle-3 { left: 40%; width: 5px; height: 5px; animation-duration: 28s; animation-delay: -15s; }
.particle-4 { left: 50%; width: 7px; height: 7px; animation-duration: 35s; animation-delay: -8s; filter: blur(2px); }
.particle-5 { left: 60%; width: 4px; height: 4px; animation-duration: 20s; animation-delay: -18s; }
.particle-6 { left: 70%; width: 6px; height: 6px; animation-duration: 32s; animation-delay: -4s; filter: blur(1px); }
.particle-7 { left: 80%; width: 3px; height: 3px; animation-duration: 26s; animation-delay: -10s; }
.particle-8 { left: 90%; width: 5px; height: 5px; animation-duration: 29s; animation-delay: -1s; }
.particle-9 { left: 15%; width: 4px; height: 4px; animation-duration: 24s; animation-delay: -14s; }
.particle-10 { left: 25%; width: 6px; height: 6px; animation-duration: 33s; animation-delay: -6s; filter: blur(2px); }
.particle-11 { left: 35%; width: 3px; height: 3px; animation-duration: 21s; animation-delay: -19s; }
.particle-12 { left: 45%; width: 5px; height: 5px; animation-duration: 27s; animation-delay: -3s; }
.particle-13 { left: 55%; width: 7px; height: 7px; animation-duration: 36s; animation-delay: -16s; filter: blur(1px); }
.particle-14 { left: 65%; width: 4px; height: 4px; animation-duration: 23s; animation-delay: -7s; }
.particle-15 { left: 75%; width: 6px; height: 6px; animation-duration: 31s; animation-delay: -11s; }
.particle-16 { left: 85%; width: 3px; height: 3px; animation-duration: 25s; animation-delay: -20s; }
.particle-17 { left: 95%; width: 5px; height: 5px; animation-duration: 28s; animation-delay: -9s; filter: blur(1px); }
.particle-18 { left: 5%; width: 4px; height: 4px; animation-duration: 20s; animation-delay: -13s; }
.particle-19 { left: 50%; width: 8px; height: 8px; animation-duration: 40s; animation-delay: -2s; filter: blur(3px); }

.gallery-hero-left {
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 8%;
  padding-right: 2rem;
  position: relative;
  z-index: 10;
  text-align: left;
  pointer-events: none;
}

.gallery-hero-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.hero-title-small {
  font-family: var(--font);
  font-weight: 600;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  color: #fff;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.hero-title-large {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 5vw, 6rem);
  line-height: 1;
  color: #fff;
  letter-spacing: -0.02em;
  text-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255, 255, 255, 0.1);
}

.gallery-hero-subtitle {
  font-family: var(--font);
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 90%;
  margin: 0 0 40px 0;
  font-weight: 400;
}

.hero-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #FFD54F;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  padding: 16px 36px;
  border-radius: 100px;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 213, 79, 0.4);
  pointer-events: auto;
}

.hero-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 213, 79, 0.6);
  background: #ffe380;
}

.hero-cta-btn .arrow {
  transition: transform 0.3s ease;
}

.hero-cta-btn:hover .arrow {
  transform: translateX(4px);
}

.gallery-hero-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 60%;
  height: 100vh;
  z-index: 5;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.gallery-hero-showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: none;
}
.gallery-hero-showcase-grid::-webkit-scrollbar {
  display: none;
}

.floating-card {
  position: relative;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  width: 100%;
  animation: card-float-dynamic 12s ease-in-out infinite alternate;
}

.floating-card-inner {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid rgba(255, 213, 79, 0.8);
  box-shadow: 0 0 20px rgba(255, 213, 79, 0.25), 0 0 50px rgba(255, 213, 79, 0.12);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.floating-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
  background: rgba(10, 10, 10, 0.9);
}

.floating-card:hover {
  z-index: 20 !important;
}

.floating-card:hover .floating-card-inner {
  transform: scale(1.05) !important;
  box-shadow: 0 0 30px rgba(255, 213, 79, 0.4), 0 0 80px rgba(255, 213, 79, 0.2);
}

.floating-card:hover img {
  transform: scale(1.02);
}

@keyframes card-float-dynamic {
  0% { transform: translateY(-8px); }
  100% { transform: translateY(8px); }
}

/* Add delays to grid items to stagger the float */
.hero-card-1 { animation-delay: -2s; animation-duration: 14s; }
.hero-card-2 { animation-delay: -5s; animation-duration: 11s; }
.hero-card-3 { animation-delay: -1s; animation-duration: 15s; }
.hero-card-4 { animation-delay: -7s; animation-duration: 12s; }
.hero-card-5 { animation-delay: -3s; animation-duration: 10s; }
.hero-card-6 { animation-delay: -6s; animation-duration: 13s; }
.hero-card-7 { animation-delay: -8s; animation-duration: 16s; }
.hero-card-8 { animation-delay: -4s; animation-duration: 14s; }
.hero-card-9 { animation-delay: -2s; animation-duration: 11s; }
.hero-card-10 { animation-delay: -9s; animation-duration: 13s; }

/* Tablet */
@media (max-width: 1024px) {
  .gallery-hero-left {
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
    z-index: 20;
    background: rgba(255,77,115,0.6);
  }
  .gallery-hero-right {
    width: 100%;
    z-index: 5;
    opacity: 0.5;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .gallery-hero-showcase-grid {
    grid-template-columns: 1fr;
  }
  .gallery-hero-title { align-items: center; }
}`;

const newCss = css.substring(0, startIndex) + newCssBlock + css.substring(endIndex);
fs.writeFileSync(cssPath, newCss);
console.log("CSS updated successfully.");
