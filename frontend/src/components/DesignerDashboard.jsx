import React from 'react';
import { motion } from 'framer-motion';
import { SiFigma, SiFramer, SiBlender, SiSketch } from 'react-icons/si';
import { 
  TbBrandAdobePhotoshop, TbBrandAdobeIllustrator, TbBrandAdobeAfterEffect,
  TbBrandAdobeXd, TbBrandAdobePremiere, TbBrandAdobeIndesign,
  TbBriefcase, TbUsers, TbTrendingUp 
} from 'react-icons/tb';

export default function DesignerDashboard({ sliderPosition, isMobile, designerOpacity }) {
  // progress goes from 0 (at center, slider=50) to 1 (fully expanded, slider=100)
  const progress = isMobile ? designerOpacity : Math.max(0, (sliderPosition - 50) / 50);

  // Parallax calculations based on progress
  const parallaxX = (1 - progress) * 60; // Slides in from the right
  const scale = 0.95 + (0.05 * progress);
  const opacity = progress;

  const pointerEvents = progress > 0.5 ? 'auto' : 'none';

  return (
    <div 
      className="designer-dashboard" 
      style={{ 
        opacity,
        pointerEvents,
        zIndex: progress > 0 ? 10 : -1 
      }}
    >
      {/* Background Decor */}
      <div className="designer-bg-elements">
        <div className="shape shape-1" style={{ transform: `translate(${-parallaxX * 0.2}px, 0)` }}></div>
        <div className="shape shape-2" style={{ transform: `translate(${-parallaxX * 0.3}px, 0)` }}></div>
        <div className="shape shape-3" style={{ transform: `translate(${-parallaxX * 0.4}px, 0)` }}></div>
      </div>

      <div className="dashboard-grid designer-grid">
        {/* Designer Widgets Container */}
        <>
          {/* Top Skills (Top Right) */}
          <div 
            className="glass-widget skills-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX * -1}px, 0) scale(${scale})`,
              position: 'relative', top: 'auto', left: 'auto', margin: '20px auto'
            } : {
              transform: `translate(${parallaxX * -1}px, 0) scale(${scale})`
            }}
          >
            <h3>Top Skills</h3>
            <div className="skill-bars">
              <SkillBar name="Branding" percent={95} isActive={progress > 0.5} />
              <SkillBar name="UI/UX Design" percent={90} isActive={progress > 0.5} />
              <SkillBar name="Typography" percent={85} isActive={progress > 0.5} />
              <SkillBar name="Illustration" percent={80} isActive={progress > 0.5} />
            </div>
          </div>

          {/* Color Palette (Floating Left of 50+ Clients) */}
          <div 
            className="glass-widget palette-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX * 1.4}px, 0) scale(${scale})`,
              position: 'relative', top: 'auto', left: 'auto', margin: '20px auto'
            } : {
              transform: `translate(${parallaxX * 1.4}px, 0) scale(${scale})`
            }}
          >
            <h3>Color Palette</h3>
            <div className="palette-colors" style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
              <div className="color-circle" style={{background: '#8B5CF6'}} title="Purple"></div>
              <div className="color-circle" style={{background: '#EC4899'}} title="Pink"></div>
              <div className="color-circle" style={{background: '#F97316'}} title="Orange"></div>
              <div className="color-circle" style={{background: '#06B6D4'}} title="Cyan"></div>
              <div className="color-circle" style={{background: '#3B82F6'}} title="Blue"></div>
            </div>
          </div>

          {/* Design Tools (Below Color Palette) */}
          <div 
            className="glass-widget tools-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX * 1.2}px, 0) scale(${scale})`,
              position: 'relative', top: 'auto', left: 'auto', margin: '20px auto'
            } : {
              transform: `translate(${parallaxX * 1.2}px, 0) scale(${scale})`
            }}
          >
            <h3>Design Tools</h3>
            <div className="tools-icons" style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
              <div className="tool-icon" title="Adobe Photoshop"><TbBrandAdobePhotoshop color="#31A8FF" size={24} /></div>
              <div className="tool-icon" title="Adobe Illustrator"><TbBrandAdobeIllustrator color="#FF9A00" size={24} /></div>
              <div className="tool-icon" title="Figma"><SiFigma color="#F24E1E" size={20} /></div>
              <div className="tool-icon" title="Framer"><SiFramer color="#0055FF" size={20} /></div>
              <div className="tool-icon" title="Blender"><SiBlender color="#F5792A" size={20} /></div>
            </div>
          </div>

          {/* Achievements (Right Edge) */}
          <div 
            className="achievements-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX * 0.8}px, 0) scale(${scale})`,
              position: 'relative', top: 'auto', right: 'auto', flexDirection: 'row', justifyContent: 'center'
            } : {
              transform: `translate(${parallaxX * 0.8}px, 0) scale(${scale})`
            }}
          >
            <div className="glass-widget stat-item">
              <TbBriefcase className="stat-icon icon-projects" />
              <div className="stat-value">100+</div>
              <div className="stat-label">Projects</div>
            </div>
            
            <div className="glass-widget stat-item" style={!isMobile ? { transform: `translate(${parallaxX}px, 0) scale(${scale})` } : {}}>
              <TbUsers className="stat-icon icon-clients" />
              <div className="stat-value">50+</div>
              <div className="stat-label">Clients</div>
            </div>
            
            <div className="glass-widget stat-item" style={!isMobile ? { transform: `translate(${parallaxX}px, 0) scale(${scale})` } : {}}>
              <TbTrendingUp className="stat-icon icon-experience" />
              <div className="stat-value">4+</div>
              <div className="stat-label">Years Exp</div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

function SkillBar({ name, percent, isActive }) {
  const width = isActive ? percent : 0;
  
  return (
    <div className="skill-bar-container">
      <div className="skill-info">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="skill-track">
        <motion.div 
          className="skill-fill" 
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
