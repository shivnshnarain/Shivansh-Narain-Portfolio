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
        {/* Right Column: Mathematically spaced */}
        <div 
          className="right-column"
          style={isMobile ? { display: 'contents' } : {
            position: 'absolute',
            top: '8%',
            bottom: '8%',
            right: '6%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          {/* Top Skills (Top Right) */}
          <div 
            className="glass-widget skills-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX * 0.8}px, 0) scale(${scale})`,
              top: '8%', right: '6%', left: 'auto', bottom: 'auto'
            } : {
              transform: `translate(${parallaxX * 0.8}px, 0) scale(${scale})`,
              position: 'relative', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto'
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

          {/* Achievements (Center Right, between Top Skills and Design Tools) */}
          <div 
            className="achievements-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX}px, 0) scale(${scale})`,
              top: '40%', right: '6%', left: 'auto'
            } : {
              display: 'contents'
            }}
          >
            <div className="glass-widget stat-item" style={!isMobile ? { transform: `translate(${parallaxX}px, 0) scale(${scale})` } : {}}>
              <TbBriefcase className="stat-icon icon-projects" />
              <div className="stat-value">100+</div>
              <div className="stat-label">Projects</div>
            </div>

            <div style={!isMobile ? { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '28px' } : { display: 'contents' }}>
              <div 
                className="glass-widget palette-widget"
                style={isMobile ? { 
                  transform: `translate(${parallaxX * 1.4}px, 0) scale(${scale})`,
                  top: 'calc(40% + 78px)', right: 'calc(6% + 200px)', left: 'auto', bottom: 'auto'
                } : {
                  transform: `translate(${parallaxX * 1.4}px, 0) scale(${scale})`,
                  position: 'relative', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto'
                }}
              >
                <h3>Color Palette</h3>
                <div className="marquee-container">
                  <div className="marquee-track">
                    <div className="marquee-group" style={{ gap: '12px', paddingRight: '12px' }}>
                      <div className="color-circle" style={{background: '#8B5CF6'}} title="Purple"></div>
                      <div className="color-circle" style={{background: '#EC4899'}} title="Pink"></div>
                      <div className="color-circle" style={{background: '#F97316'}} title="Orange"></div>
                      <div className="color-circle" style={{background: '#06B6D4'}} title="Cyan"></div>
                      <div className="color-circle" style={{background: '#3B82F6'}} title="Blue"></div>
                      <div className="color-circle" style={{background: '#FACC15'}} title="Yellow"></div>
                      <div className="color-circle" style={{background: '#22C55E'}} title="Green"></div>
                      <div className="color-circle" style={{background: '#34D399'}} title="Mint"></div>
                      <div className="color-circle" style={{background: '#0EA5E9'}} title="Sky Blue"></div>
                      <div className="color-circle" style={{background: '#4169E1'}} title="Royal Blue"></div>
                      <div className="color-circle" style={{background: '#4338CA'}} title="Indigo"></div>
                      <div className="color-circle" style={{background: '#D946EF'}} title="Magenta"></div>
                      <div className="color-circle" style={{background: '#F43F5E'}} title="Coral"></div>
                      <div className="color-circle" style={{background: '#14B8A6'}} title="Teal"></div>
                    </div>
                    <div className="marquee-group" style={{ gap: '12px', paddingRight: '12px' }}>
                      <div className="color-circle" style={{background: '#8B5CF6'}} title="Purple"></div>
                      <div className="color-circle" style={{background: '#EC4899'}} title="Pink"></div>
                      <div className="color-circle" style={{background: '#F97316'}} title="Orange"></div>
                      <div className="color-circle" style={{background: '#06B6D4'}} title="Cyan"></div>
                      <div className="color-circle" style={{background: '#3B82F6'}} title="Blue"></div>
                      <div className="color-circle" style={{background: '#FACC15'}} title="Yellow"></div>
                      <div className="color-circle" style={{background: '#22C55E'}} title="Green"></div>
                      <div className="color-circle" style={{background: '#34D399'}} title="Mint"></div>
                      <div className="color-circle" style={{background: '#0EA5E9'}} title="Sky Blue"></div>
                      <div className="color-circle" style={{background: '#4169E1'}} title="Royal Blue"></div>
                      <div className="color-circle" style={{background: '#4338CA'}} title="Indigo"></div>
                      <div className="color-circle" style={{background: '#D946EF'}} title="Magenta"></div>
                      <div className="color-circle" style={{background: '#F43F5E'}} title="Coral"></div>
                      <div className="color-circle" style={{background: '#14B8A6'}} title="Teal"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-widget stat-item" style={!isMobile ? { transform: `translate(${parallaxX}px, 0) scale(${scale})` } : {}}>
                <TbUsers className="stat-icon icon-clients" />
                <div className="stat-value">50+</div>
                <div className="stat-label">Clients</div>
              </div>
            </div>
            <div className="glass-widget stat-item" style={!isMobile ? { transform: `translate(${parallaxX}px, 0) scale(${scale})` } : {}}>
              <TbTrendingUp className="stat-icon icon-experience" />
              <div className="stat-value">4+</div>
              <div className="stat-label">Years Exp</div>
            </div>
          </div>

          {/* Design Tools (Bottom Right) */}
          <div 
            className="glass-widget tools-widget"
            style={isMobile ? { 
              transform: `translate(${parallaxX * 1.2}px, 0) scale(${scale})`,
              bottom: '8%', right: '6%', top: 'auto', left: 'auto'
            } : {
              transform: `translate(${parallaxX * 1.2}px, 0) scale(${scale})`,
              position: 'relative', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto'
            }}
          >
            <h3>Design Tools</h3>
            <div className="marquee-container">
              <div className="marquee-track">
                <div className="marquee-group" style={{ gap: '16px', paddingRight: '16px' }}>
                  <div className="tool-icon" title="Adobe Photoshop"><TbBrandAdobePhotoshop color="#31A8FF" /></div>
                  <div className="tool-icon" title="Adobe Illustrator"><TbBrandAdobeIllustrator color="#FF9A00" /></div>
                  <div className="tool-icon" title="Adobe XD"><TbBrandAdobeXd color="#FF61F6" /></div>
                  <div className="tool-icon" title="After Effects"><TbBrandAdobeAfterEffect color="#9999FF" /></div>
                  <div className="tool-icon" title="Premiere Pro"><TbBrandAdobePremiere color="#EA77FF" /></div>
                  <div className="tool-icon" title="InDesign"><TbBrandAdobeIndesign color="#FF3366" /></div>
                  <div className="tool-icon" title="Figma"><SiFigma color="#F24E1E" /></div>
                  {/* Canva icon removed */}
                  <div className="tool-icon" title="Framer"><SiFramer color="#0055FF" /></div>
                  <div className="tool-icon" title="Blender"><SiBlender color="#F5792A" /></div>
                  <div className="tool-icon" title="Sketch"><SiSketch color="#FDB300" /></div>
                </div>
                <div className="marquee-group" style={{ gap: '16px', paddingRight: '16px' }}>
                  <div className="tool-icon" title="Adobe Photoshop"><TbBrandAdobePhotoshop color="#31A8FF" /></div>
                  <div className="tool-icon" title="Adobe Illustrator"><TbBrandAdobeIllustrator color="#FF9A00" /></div>
                  <div className="tool-icon" title="Adobe XD"><TbBrandAdobeXd color="#FF61F6" /></div>
                  <div className="tool-icon" title="After Effects"><TbBrandAdobeAfterEffect color="#9999FF" /></div>
                  <div className="tool-icon" title="Premiere Pro"><TbBrandAdobePremiere color="#EA77FF" /></div>
                  <div className="tool-icon" title="InDesign"><TbBrandAdobeIndesign color="#FF3366" /></div>
                  <div className="tool-icon" title="Figma"><SiFigma color="#F24E1E" /></div>
                  {/* Canva icon removed */}
                  <div className="tool-icon" title="Framer"><SiFramer color="#0055FF" /></div>
                  <div className="tool-icon" title="Blender"><SiBlender color="#F5792A" /></div>
                  <div className="tool-icon" title="Sketch"><SiSketch color="#FDB300" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
