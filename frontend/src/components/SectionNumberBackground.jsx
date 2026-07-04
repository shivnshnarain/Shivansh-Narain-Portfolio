import React from 'react';

export default function SectionNumberBackground({ number }) {
  return (
    <div className="section-number-container">
      <svg
        className="section-number-svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`gradient-num-${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="20%" stopColor="#EC4899" />
            <stop offset="40%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#06B6D4" />
            <stop offset="80%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <text
          x="100%"
          y="50%"
          textAnchor="end"
          dominantBaseline="middle"
          fill="none"
          stroke={`url(#gradient-num-${number})`}
          strokeWidth="2.5"
          className="section-number-text"
        >
          {number}
        </text>
      </svg>
    </div>
  );
}
