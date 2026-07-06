import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';
import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { 
  SiReact, SiNodedotjs, SiKalilinux, SiFigma, SiDocker, SiLinux
} from 'react-icons/si';

const TechIcon = ({ src, alt }) => (
  <img src={src} alt={alt} loading="lazy" style={{ width: '1em', height: '1em', objectFit: 'contain', display: 'block' }} />
);

// Centralized tools dictionary to ensure zero duplicates across the entire section
const toolsDict = {
  html: { name: "HTML5", brandColor: "#E34F26", icon: <TechIcon src="/assets/tech-icons/html.svg" alt="HTML5" /> },
  css: { name: "CSS3", brandColor: "#1572B6", icon: <TechIcon src="/assets/tech-icons/css.svg" alt="CSS3" /> },
  js: { name: "JavaScript", brandColor: "#F7DF1E", icon: <TechIcon src="/assets/tech-icons/js.svg" alt="JavaScript" /> },
  react: { name: "React", brandColor: "#61DAFB", icon: <TechIcon src="/assets/tech-icons/react.svg" alt="React" /> },
  tailwind: { name: "Tailwind CSS", brandColor: "#38BDF8", icon: <TechIcon src="/assets/tech-icons/tailwind.svg" alt="Tailwind CSS" /> },
  node: { name: "Node.js", brandColor: "#339933", icon: <TechIcon src="/assets/tech-icons/node.svg" alt="Node.js" /> },
  express: { name: "Express", brandColor: "#888888", icon: <TechIcon src="/assets/tech-icons/express.svg" alt="Express" /> },
  mongo: { name: "MongoDB", brandColor: "#47A248", icon: <TechIcon src="/assets/tech-icons/mongo.svg" alt="MongoDB" /> },
  docker: { name: "Docker", brandColor: "#2496ED", icon: <TechIcon src="/assets/tech-icons/docker.svg" alt="Docker" /> },
  firebase: { name: "Firebase", brandColor: "#FFCA28", icon: <TechIcon src="/assets/tech-icons/firebase.svg" alt="Firebase" /> },
  git: { name: "Git", brandColor: "#F05032", icon: <TechIcon src="/assets/tech-icons/git.svg" alt="Git" /> },
  github: { name: "GitHub", brandColor: "#333333", icon: <TechIcon src="/assets/tech-icons/github.svg" alt="GitHub" /> },
  vscode: { name: "VS Code", brandColor: "#007ACC", icon: <TechIcon src="/assets/tech-icons/vscode.svg" alt="VS Code" /> },
  linux: { name: "Linux", brandColor: "#FCC624", icon: <TechIcon src="/assets/tech-icons/linux.svg" alt="Linux" /> },
  ubuntu: { name: "Ubuntu", brandColor: "#E95420", icon: <TechIcon src="/assets/tech-icons/ubuntu.svg" alt="Ubuntu" /> },
  bash: { name: "Bash", brandColor: "#4EAA25", icon: <TechIcon src="/assets/tech-icons/bash.svg" alt="Bash" /> },
  kali: { name: "Kali Linux", brandColor: "#7C3AED", icon: <TechIcon src="/assets/tech-icons/kali.svg" alt="Kali Linux" /> },
  burp: { name: "Burp Suite", brandColor: "#FF6633", icon: <TechIcon src="/assets/tech-icons/burp.svg" alt="Burp Suite" /> },
  wireshark: { name: "Wireshark", brandColor: "#1679A7", icon: <TechIcon src="/assets/tech-icons/wireshark.svg" alt="Wireshark" /> },
  nmap: { name: "Nmap", brandColor: "#8A2BE2", icon: <TechIcon src="/assets/tech-icons/nmap.svg" alt="Nmap" /> },
  owasp: { name: "OWASP", brandColor: "#888888", icon: <TechIcon src="/assets/tech-icons/owasp.svg" alt="OWASP" /> },
  figma: { name: "Figma", brandColor: "#F24E1E", icon: <TechIcon src="/assets/tech-icons/figma.svg" alt="Figma" /> },
  photoshop: { name: "Adobe Photoshop", brandColor: "#31A8FF", icon: <TechIcon src="/assets/tech-icons/photoshop.svg" alt="Adobe Photoshop" /> },
  illustrator: { name: "Adobe Illustrator", brandColor: "#FF9A00", icon: <TechIcon src="/assets/tech-icons/illustrator.svg" alt="Adobe Illustrator" /> },
  canva: { name: "Canva", brandColor: "#00C4CC", icon: <TechIcon src="/assets/tech-icons/canva.svg" alt="Canva" /> },
  postman: { name: "Postman", brandColor: "#FF6C37", icon: <TechIcon src="/assets/tech-icons/postman.svg" alt="Postman" /> },
  chatgpt: { name: "ChatGPT", brandColor: "#10A37F", icon: <TechIcon src="/assets/tech-icons/chatgpt.svg" alt="ChatGPT" /> },
  claude: { name: "Claude", brandColor: "#D97757", icon: <TechIcon src="/assets/tech-icons/claude.svg" alt="Claude" /> },
  gemini: { name: "Gemini", brandColor: "#1A73E8", icon: <TechIcon src="/assets/tech-icons/gemini.svg" alt="Gemini" /> },
};

const categories = [
  {
    id: "frontend",
    title: "Frontend",
    desc: "Building responsive and interactive user interfaces.",
    color: "#EEF6FF",
    icon: <SiReact color="#4F8EF7" />,
    tools: [toolsDict.html, toolsDict.css, toolsDict.js, toolsDict.react, toolsDict.tailwind]
  },
  {
    id: "backend",
    title: "Backend",
    desc: "Building robust APIs and server-side logic.",
    color: "#F2FFF2",
    icon: <SiNodedotjs color="#22A06B" />,
    tools: [toolsDict.node, toolsDict.express, toolsDict.mongo, toolsDict.firebase]
  },
  {
    id: "cyber",
    title: "Cyber Security",
    desc: "Securing systems and analyzing vulnerabilities.",
    color: "#F7F2FF",
    icon: <SiKalilinux color="#7C3AED" />,
    tools: [toolsDict.kali, toolsDict.burp, toolsDict.wireshark, toolsDict.nmap, toolsDict.owasp]
  },
  {
    id: "design",
    title: "Graphic Design",
    desc: "Creating visuals and digital experiences.",
    color: "#FFF5EC",
    icon: <SiFigma color="#F97316" />,
    tools: [toolsDict.photoshop, toolsDict.illustrator, toolsDict.figma, toolsDict.canva]
  },
  {
    id: "ai",
    title: "AI & Productivity",
    desc: "Leveraging AI for rapid development and innovation.",
    color: "#FFFCE8",
    icon: <TechIcon src="/assets/tech-icons/chatgpt.svg" alt="AI" />,
    tools: [toolsDict.chatgpt, toolsDict.claude, toolsDict.gemini]
  },
  {
    id: "dev-tools",
    title: "Developer Tools",
    desc: "Tools and platforms that power development workflows.",
    color: "#F5F5F5",
    icon: <SiDocker color="#2496ED" />,
    tools: [toolsDict.docker, toolsDict.git, toolsDict.github, toolsDict.vscode, toolsDict.postman]
  },
  {
    id: "linux",
    title: "Linux Environment",
    desc: "Working with Linux environments and shell scripting.",
    color: "#FFF8E6",
    icon: <SiLinux color="#D97706" />,
    tools: [toolsDict.linux, toolsDict.ubuntu, toolsDict.bash]
  }
];

// Flat array of all unique tools for the bottom Tech Stack grid
const techStackItems = Object.values(toolsDict);

// Background binary characters for entire Skills section
const binaryStrings = Array.from({ length: 80 }).map((_, i) => {
  const text = ((i * 17) % 2 === 0) ? '0' : '1';
  
  const p1 = (i * 11.23) % 1;
  const p2 = (i * 23.45) % 1;
  const p3 = (i * 37.89) % 1;
  const p4 = (i * 41.11) % 1;
  
  // Depth layers
  const layer = i % 3;
  let blur, speedMult, opacityBase, fontSize;
  if (layer === 0) { // Layer 1: Very blurred, Slowest
    blur = 2; speedMult = 1.5; opacityBase = 0.06; fontSize = 24;
  } else if (layer === 1) { // Layer 2: Medium blur, Medium speed
    blur = 1.5; speedMult = 1.0; opacityBase = 0.09; fontSize = 20;
  } else { // Layer 3: Sharpest, Slow movement
    blur = 1; speedMult = 0.8; opacityBase = 0.12; fontSize = 16;
  }

  const colors = ['#FFD54A', '#FFB74D', '#F8A5C2', '#BDBDBD'];
  const color = colors[Math.floor(p4 * colors.length)];
  
  const startX = p3 * 100;
  
  let startY, endY;
  // Mix of top->bottom and bottom->top
  if (p1 > 0.5) {
    startY = 110 + (p2 * 10);
    endY = -20 - (p3 * 10);
  } else {
    startY = -20 - (p2 * 10);
    endY = 110 + (p3 * 10);
  }

  const drift1 = -10 + p2 * 20; 
  const drift2 = -10 + p4 * 20;
  const endX = startX + (-15 + p1 * 30); 
  
  const duration = (35 + p1 * 40) * speedMult;
  const delay = -(p3 * 80); 
  
  const rotation = -5 + (p2 * 10); 
  const scale = 0.8 + (p1 * 0.4); 
  
  // Fade pulsing animation variant
  const animName = (i % 2 === 0) ? 'floatAndFade' : 'floatBinary';

  return {
    text,
    color,
    fontSize: `${fontSize}px`,
    filter: `blur(${blur}px)`,
    opacity: opacityBase,
    duration: `${duration}s`,
    delay: `${delay}s`,
    startX: `${startX}vw`,
    startY: `${startY}vh`,
    drift1: `${drift1}vw`,
    drift2: `${drift2}vw`,
    endX: `${endX}vw`,
    endY: `${endY}vh`,
    rotation: `${rotation}deg`,
    scale: `${scale}`,
    animName
  };
});

export default function Skills() {
  const { setActiveSection } = useScrollContext();
  const [pauseMarquee, setPauseMarquee] = useState(false);
  const sectionRef = useRef(null);

  // Mobile Carousel State
  const [isMobile, setIsMobile] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 600);
      }, 150);
    };
    
    // Initial check without delay
    setIsMobile(window.innerWidth < 600);
    
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % categories.length);
  };
  
  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + categories.length) % categories.length);
  };
  
  const handleDragEnd = (e, { offset }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      nextCard();
    } else if (swipe > 50) {
      prevCard();
    }
  };

  // Subtle parallax effect for background logos
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <>
      <section 
        id="skills" 
        className="section minimal-skills-section"
        ref={sectionRef}
      >
        <motion.div 
          className="bg-particles-container"
          style={{ y: parallaxY }}
          onViewportEnter={() => setActiveSection('skills')}
          viewport={{ amount: 0.1 }}
        >
          {binaryStrings.map((bg, idx) => (
            <div 
              key={`bg-${idx}`} 
              className="bg-binary"
              style={{ 
                color: bg.color,
                fontSize: bg.fontSize,
                filter: bg.filter,
                opacity: bg.opacity,
                animationDelay: bg.delay,
                animationDuration: bg.duration,
                animationName: bg.animName,
                '--base-opacity': bg.opacity,
                '--startX': bg.startX,
                '--startY': bg.startY,
                '--drift1': bg.drift1,
                '--drift2': bg.drift2,
                '--endX': bg.endX,
                '--endY': bg.endY,
                '--rotation': bg.rotation,
                '--scale': bg.scale,
              }}
            >
              {bg.text}
            </div>
          ))}
        </motion.div>

        <div className="skills-content-wrapper">
          <motion.div 
            className="skills-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="skills-title">Tools & Technologies</h2>
            <p className="skills-subtitle">
              Technologies I use to build secure, scalable and modern digital products.
            </p>
          </motion.div>

          {/* Marquee Container */}
          {isMobile ? (
            <div className="mobile-carousel-container">
              <button className="carousel-nav-btn left" onClick={prevCard} aria-label="Previous skill">
                <FaChevronLeft />
              </button>
              
              <div className="carousel-viewport">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCard}
                    className="skill-card mobile-skill-card"
                    style={{ 
                      '--card-bg': categories[currentCard].color,
                      willChange: 'transform, opacity',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.25 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="card-top">
                      <div className="card-main-icon">{categories[currentCard].icon}</div>
                      <h3 className="card-title">{categories[currentCard].title}</h3>
                    </div>
                    <p className="card-desc mobile-card-desc">{categories[currentCard].desc}</p>
                    <div className="card-tools mobile-card-tools">
                      {categories[currentCard].tools.map((tool, tIdx) => (
                        <div key={tIdx} className="card-tool-item">
                          <div className="card-tool-icon">{tool.icon}</div>
                          <span className="card-tool-name">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button className="carousel-nav-btn right" onClick={nextCard} aria-label="Next skill">
                <FaChevronRight />
              </button>
            </div>
          ) : (
            /* Desktop Marquee Container */
            <motion.div 
              className="marquee-container"
              onMouseEnter={() => setPauseMarquee(true)}
              onMouseLeave={() => setPauseMarquee(false)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className={`marquee-content ${pauseMarquee ? 'paused' : ''}`}>
                <div className="marquee-group">
                  {categories.map((cat, index) => (
                    <div
                      key={cat.id}
                      className="skill-card"
                      style={{ '--card-bg': cat.color }}
                    >
                      <div className="card-top">
                        <div className="card-main-icon">{cat.icon}</div>
                        <h3 className="card-title">{cat.title}</h3>
                      </div>
                      <p className="card-desc">{cat.desc}</p>
                      <div className="card-tools">
                        {cat.tools.map((tool, tIdx) => (
                          <div key={tIdx} className="card-tool-item">
                            <div className="card-tool-icon">{tool.icon}</div>
                            <span className="card-tool-name">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="marquee-group">
                  {categories.map((cat, index) => (
                    <div
                      key={`${cat.id}-dup`}
                      className="skill-card"
                      style={{ '--card-bg': cat.color }}
                    >
                      <div className="card-top">
                        <div className="card-main-icon">{cat.icon}</div>
                        <h3 className="card-title">{cat.title}</h3>
                      </div>
                      <p className="card-desc">{cat.desc}</p>
                      <div className="card-tools">
                        {cat.tools.map((tool, tIdx) => (
                          <div key={tIdx} className="card-tool-item">
                            <div className="card-tool-icon">{tool.icon}</div>
                            <span className="card-tool-name">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Technology Stack Showcase */}
        <div className="skills-content-wrapper tech-stack-wrapper" onMouseEnter={() => setActiveSection('skills')}>
          <motion.div 
            className="tech-stack-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="tech-title">Technology Stack</h2>
            <p className="tech-subtitle">
              Tools, Technologies & Platforms I Work With
            </p>
          </motion.div>

          <motion.div 
            className="tech-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.04 }
              }
            }}
          >
            {techStackItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="tech-tile"
                style={{ '--brand-color': item.brandColor }}
                variants={{
                  hidden: { opacity: 0, scale: 0.6, y: 30 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                }}
              >
                <div className="tech-tile-icon">{item.icon}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <style>{`
          .minimal-skills-section {
            background-color: var(--premium-bg, #FFFFFF);
            min-height: 100vh;
            padding: 140px 0;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .bg-particles-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
          }

          .bg-binary {
            position: absolute;
            font-weight: 600;
            user-select: none;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform, opacity;
            top: 0;
            left: 0;
          }

          @keyframes floatBinary {
            0% { transform: translate3d(var(--startX), var(--startY), 0) rotate(var(--rotation)) scale(var(--scale)); opacity: var(--base-opacity); }
            100% { transform: translate3d(var(--endX), var(--endY), 0) rotate(var(--rotation)) scale(var(--scale)); opacity: var(--base-opacity); }
          }

          @keyframes floatAndFade {
            0% { transform: translate3d(var(--startX), var(--startY), 0) rotate(var(--rotation)) scale(var(--scale)); opacity: 0; }
            20% { opacity: var(--base-opacity); }
            80% { opacity: var(--base-opacity); }
            100% { transform: translate3d(var(--endX), var(--endY), 0) rotate(var(--rotation)) scale(var(--scale)); opacity: 0; }
          }

          .skills-content-wrapper {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .skills-header {
            text-align: center;
            margin-bottom: 60px;
            padding: 0 24px;
          }

          .skills-title {
            font-size: clamp(32px, 5vw, 48px);
            font-weight: 800;
            color: #111111;
            margin-bottom: 16px;
          }

          .skills-subtitle {
            font-size: 18px;
            color: #666666;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .marquee-container {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            z-index: 2;
          }

          .marquee-container::before,
          .marquee-container::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 250px;
            z-index: 3;
            pointer-events: none;
          }

          .marquee-container::before {
            left: 0;
            background: linear-gradient(to right, var(--premium-bg, #FFFFFF), transparent);
          }

          .marquee-container::after {
            right: 0;
            background: linear-gradient(to left, var(--premium-bg, #FFFFFF), transparent);
          }

          .marquee-content {
            display: flex;
            width: fit-content;
            animation: scroll 65s linear infinite;
            gap: 24px;
            padding-left: 24px;
            will-change: transform;
          }

          .marquee-content.paused {
            animation-play-state: paused;
          }

          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 12px)); }
          }

          .marquee-group {
            display: flex;
            gap: 24px;
            align-items: stretch;
          }

          .skill-card {
            flex: 0 0 auto;
            width: 340px;
            height: 360px;
            background-color: var(--card-bg);
            border-radius: 24px;
            padding: 28px 28px 20px 28px;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0,0,0,0.03);
            transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            overflow: hidden;
            will-change: transform, box-shadow, border-color;
            cursor: default;
          }

          .skill-card:hover {
            transform: scale(1.02) translateY(-4px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
            z-index: 10;
          }

          .card-top {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 12px;
          }

          .card-main-icon {
            font-size: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            padding: 10px;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }

          .card-title {
            font-size: 22px;
            font-weight: 700;
            color: #1a1a1a;
            margin: 0;
            letter-spacing: -0.01em;
          }

          .card-desc {
            font-size: 14px;
            color: #555555;
            line-height: 1.5;
            margin: 0;
            margin-bottom: 12px;
          }

          .card-tools {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px 8px;
            margin-top: 0;
          }

          .card-tool-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
          }

          .card-tool-icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.8);
          }
          
          .card-tool-icon svg {
            width: 24px !important;
            height: 24px !important;
          }

          .card-tool-name {
            font-size: 12px;
            font-weight: 600;
            color: #334155;
            text-align: center;
            line-height: 1.2;
            word-wrap: break-word;
          }

          /* Tech Stack Section */
          .tech-stack-wrapper {
            margin-top: 140px;
            padding: 0 24px;
          }

          .tech-stack-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .tech-title {
            font-size: clamp(36px, 6vw, 56px);
            font-weight: 800;
            color: #111111;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
          }

          .tech-subtitle {
            font-size: 20px;
            color: #666666;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .tech-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            justify-content: center;
          }

          .tech-tile {
            width: 84px;
            height: 84px;
            background-color: #FFFFFF;
            border-radius: 20px;
            border: 1px solid rgba(0,0,0,0.06);
            box-shadow: 0 10px 25px rgba(0,0,0,0.04);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 250ms ease;
            will-change: transform, box-shadow, border-color;
            cursor: pointer;
            position: relative;
          }

          .tech-tile:hover {
            transform: scale(1.12);
            border-color: var(--brand-color);
            box-shadow: 0 0 0 1px var(--brand-color), 0 15px 35px -5px color-mix(in srgb, var(--brand-color) 40%, transparent);
          }

          .tech-tile:hover .tech-tile-icon {
            transform: scale(1.18);
          }

          .tech-tile-icon {
            font-size: 40px;
            display: flex;
            transition: transform 250ms ease;
          }

          @media (max-width: 1024px) {
            .tech-grid {
              gap: 20px;
              max-width: 800px;
            }
            .tech-tile {
              width: 76px;
              height: 76px;
            }
            .tech-tile-icon {
              font-size: 36px;
            }
            .card-tools {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 599px) {
            .tech-stack-wrapper { margin-top: 100px; }
            .tech-grid {
              gap: 16px;
            }
            .tech-tile {
              width: 64px;
              height: 64px;
              border-radius: 16px;
            }
            .tech-tile-icon {
              font-size: 30px;
            }
            .skill-card {
              width: 300px;
              min-height: 420px;
            }
            .card-tools {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 480px) {
            .tech-grid {
              gap: 12px;
            }
            .tech-tile {
              width: 56px;
              height: 56px;
              border-radius: 14px;
            }
            .tech-tile-icon {
              font-size: 26px;
            }
            /* Adjust card size on very small screens to fit horizontally */
            .skill-card {
              width: 280px;
              min-height: 420px;
              padding: 24px;
            }
            .card-tools {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          /* --- Mobile Carousel Styles --- */
          .mobile-carousel-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 100vw;
            gap: 12px;
            padding: 20px 0;
            position: relative;
            z-index: 2;
            min-height: 360px;
          }
          
          .carousel-viewport {
            width: 85%;
            max-width: 700px;
            height: 360px;
            position: relative;
            overflow: visible;
            display: flex;
            justify-content: center;
          }
          
          .carousel-nav-btn {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(0, 0, 0, 0.06);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.06);
            transition: transform 0.2s ease;
            z-index: 10;
            flex-shrink: 0;
          }
          
          .carousel-nav-btn:hover, .carousel-nav-btn:active {
            background: #FFFFFF;
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          }
          
          .mobile-skill-card {
            width: 100% !important;
            height: 360px !important;
            min-height: 360px !important;
            padding: 24px !important;
            margin: 0 !important;
            cursor: grab;
            position: absolute !important;
            top: 0;
            left: 0;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            
            /* Premium Frosted Glass UI Polish */
            background: 
              linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 35%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 100%),
              color-mix(in srgb, var(--card-bg) 65%, transparent) !important;
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            border-top: 1.5px solid rgba(255, 255, 255, 1) !important;
            border-radius: 24px !important;
            box-shadow: 
              0 4px 6px rgba(0, 0, 0, 0.02),
              0 12px 24px rgba(0, 0, 0, 0.04),
              0 24px 48px rgba(0, 0, 0, 0.06),
              inset 0 1px 2px rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(16px) saturate(120%) !important;
            -webkit-backdrop-filter: blur(16px) saturate(120%) !important;
            transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease !important;
          }
          
          .mobile-skill-card:active {
            cursor: grabbing;
            transform: scale(0.98) !important;
            box-shadow: 
              0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 1px 1px rgba(255, 255, 255, 0.8) !important;
          }
          
          .mobile-card-tools {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            gap: 12px 8px !important;
          }
          
          .mobile-card-tools .card-tool-item {
            flex: 0 0 calc(25% - 8px) !important;
            width: auto !important;
            min-width: 50px;
          }
          
          .mobile-card-desc {
            margin-bottom: 24px !important;
            font-size: 13px !important;
          }

          @media (max-width: 480px) {
            .carousel-viewport {
              width: 80%;
            }
            .carousel-nav-btn {
              width: 36px;
              height: 36px;
              font-size: 14px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
