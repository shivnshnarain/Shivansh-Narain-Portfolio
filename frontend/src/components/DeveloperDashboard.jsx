import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaDocker, FaBootstrap, FaGitAlt, FaCode } from 'react-icons/fa';
import { SiMongodb, SiVite, SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMysql, SiPostgresql, SiFirebase } from 'react-icons/si';

export default function DeveloperDashboard({ sliderPosition, isMobile, developerOpacity }) {
  // progress goes from 0 (at center, slider=50) to 1 (fully expanded, slider=0)
  const progress = isMobile ? developerOpacity : Math.max(0, (50 - sliderPosition) / 50);
  
  // Parallax calculations based on progress
  const parallaxX = (1 - progress) * -60; // Slides in from the left
  const scale = 0.95 + (0.05 * progress);
  const opacity = progress;

  // If not visible at all, pointer events should be none
  const pointerEvents = progress > 0.5 ? 'auto' : 'none';

  return (
    <div 
      className="developer-dashboard" 
      style={{ 
        opacity,
        pointerEvents,
        zIndex: progress > 0 ? 10 : -1 
      }}
    >
      {/* Code Background Parallax */}
      <div className="code-bg-snippets" style={{ transform: `translateX(${parallaxX * 0.5}px)` }}>
        <pre className="snippet snip-1">
{`const developer = {
  name: "Shivansh",
  role: "Full Stack",
  skills: ["React", "Node"]
}`}
        </pre>
      </div>



      <div className="developer-grid">
        {/* Terminal Window (Top Left) */}
        <div 
          className="glass-widget terminal-widget" 
          style={isMobile ? { 
            transform: `translate(${parallaxX}px, 0) scale(${scale})`,
            position: 'relative', top: 'auto', left: 'auto', margin: '20px auto'
          } : { 
            transform: `translate(${parallaxX}px, 0) scale(${scale})`
          }}
        >
          <div className="terminal-header">
            <div className="term-dot red"></div>
            <div className="term-dot yellow"></div>
            <div className="term-dot green"></div>
            <span className="term-title">bash ~ shivansh</span>
          </div>
          <div className="terminal-body">
            <TerminalTyping isActive={progress > 0.5} />
          </div>
        </div>

        {/* Professional Profile (Middle Left) */}
        <div 
          className="glass-widget profile-widget"
          style={isMobile ? { 
            transform: `translate(${parallaxX}px, 0) scale(${scale})`,
            position: 'relative', top: 'auto', left: 'auto', margin: '20px auto'
          } : { 
            transform: `translate(${parallaxX}px, 0) scale(${scale})`
          }}
        >
          <div className="profile-content">
            <FaCode className="profile-icon" />
            <div className="profile-text">
              <div className="profile-title">Full Stack Developer</div>
              <div className="profile-subtitle">React • Node.js • MongoDB</div>
            </div>
          </div>
        </div>

        {/* Tech Stack (Bottom Left) */}
        <div 
          className="glass-widget tech-widget"
          style={isMobile ? { 
            transform: `translate(${parallaxX}px, 0) scale(${scale})`,
            position: 'relative', top: 'auto', left: 'auto', margin: '20px auto'
          } : { 
            transform: `translate(${parallaxX}px, 0) scale(${scale})`
          }}
        >
          <h3>Tech Stack</h3>
          <div className="dev-marquee-container">
            <div className="dev-marquee-track left">
              <div className="dev-marquee-group" style={{ gap: '16px', paddingRight: '16px' }}>
                <div className="tech-icon" title="HTML5"><FaHtml5 color="#E34F26" /></div>
                <div className="tech-icon" title="CSS3"><FaCss3Alt color="#1572B6" /></div>
                <div className="tech-icon" title="JavaScript"><FaJs color="#F7DF1E" /></div>
                <div className="tech-icon" title="TypeScript"><SiTypescript color="#3178C6" /></div>
                <div className="tech-icon" title="React"><FaReact color="#61DAFB" /></div>
                <div className="tech-icon" title="Next.js"><SiNextdotjs color="#000000" /></div>
                <div className="tech-icon" title="Tailwind CSS"><SiTailwindcss color="#06B6D4" /></div>
                <div className="tech-icon" title="Bootstrap"><FaBootstrap color="#7952B3" /></div>
              </div>
              <div className="dev-marquee-group" style={{ gap: '16px', paddingRight: '16px' }}>
                <div className="tech-icon" title="HTML5"><FaHtml5 color="#E34F26" /></div>
                <div className="tech-icon" title="CSS3"><FaCss3Alt color="#1572B6" /></div>
                <div className="tech-icon" title="JavaScript"><FaJs color="#F7DF1E" /></div>
                <div className="tech-icon" title="TypeScript"><SiTypescript color="#3178C6" /></div>
                <div className="tech-icon" title="React"><FaReact color="#61DAFB" /></div>
                <div className="tech-icon" title="Next.js"><SiNextdotjs color="#000000" /></div>
                <div className="tech-icon" title="Tailwind CSS"><SiTailwindcss color="#06B6D4" /></div>
                <div className="tech-icon" title="Bootstrap"><FaBootstrap color="#7952B3" /></div>
              </div>
            </div>
            <div className="dev-marquee-track right">
              <div className="dev-marquee-group" style={{ gap: '16px', paddingRight: '16px' }}>
                <div className="tech-icon" title="Node.js"><FaNodeJs color="#339933" /></div>
                <div className="tech-icon" title="Express.js"><SiExpress color="#000000" /></div>
                <div className="tech-icon" title="MongoDB"><SiMongodb color="#47A248" /></div>
                <div className="tech-icon" title="MySQL"><SiMysql color="#4479A1" /></div>
                <div className="tech-icon" title="PostgreSQL"><SiPostgresql color="#4169E1" /></div>
                <div className="tech-icon" title="Firebase"><SiFirebase color="#FFCA28" /></div>
                <div className="tech-icon" title="Docker"><FaDocker color="#2496ED" /></div>
                <div className="tech-icon" title="Git"><FaGitAlt color="#F05032" /></div>
              </div>
              <div className="dev-marquee-group" style={{ gap: '16px', paddingRight: '16px' }}>
                <div className="tech-icon" title="Node.js"><FaNodeJs color="#339933" /></div>
                <div className="tech-icon" title="Express.js"><SiExpress color="#000000" /></div>
                <div className="tech-icon" title="MongoDB"><SiMongodb color="#47A248" /></div>
                <div className="tech-icon" title="MySQL"><SiMysql color="#4479A1" /></div>
                <div className="tech-icon" title="PostgreSQL"><SiPostgresql color="#4169E1" /></div>
                <div className="tech-icon" title="Firebase"><SiFirebase color="#FFCA28" /></div>
                <div className="tech-icon" title="Docker"><FaDocker color="#2496ED" /></div>
                <div className="tech-icon" title="Git"><FaGitAlt color="#F05032" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function TerminalTyping({ isActive }) {
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    if (!isActive) {
      setLines([]);
      return;
    }
    
    const script = [
      { type: 'cmd', text: 'npm init' },
      { type: 'out', text: '✔ package.json created' },
      { type: 'cmd', text: 'npm install' },
      { type: 'out', text: '✔ Dependencies installed' },
      { type: 'cmd', text: 'npm run dev' },
      { type: 'out', text: '✔ Development Server Running' },
      { type: 'cmd', text: 'git push origin main' },
      { type: 'out', text: '✔ Deployment Successful' }
    ];
    
    let isCancelled = false;
    
    const runScript = async () => {
      while (!isCancelled) {
        setLines([]);
        for (let i = 0; i < script.length; i++) {
          if (isCancelled) break;
          await new Promise(r => setTimeout(r, script[i].type === 'cmd' ? 800 : 400));
          if (isCancelled) break;
          setLines(prev => [...prev, script[i]]);
        }
        if (!isCancelled) {
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    };
    
    runScript();
    
    return () => {
      isCancelled = true;
    };
  }, [isActive]);

  return (
    <div className="term-content">
      {lines.map((line, i) => (
        <div key={i} className={`term-line ${line.type === 'out' ? 'success' : ''}`}>
          {line.type === 'cmd' && <span className="prompt">{'>'} </span>}
          {line.type === 'cmd' ? <span className="cmd">{line.text}</span> : line.text}
        </div>
      ))}
      <div className="term-line"><span className="prompt">{'>'} </span><span className="cursor"></span></div>
    </div>
  );
}


