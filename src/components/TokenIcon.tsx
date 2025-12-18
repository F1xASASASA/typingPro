import React from 'react';

const TokenIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '2px' }}
  >
    <circle cx="12" cy="12" r="11" fill="url(#paint0_linear_icon)" stroke="#FFD700" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="7" stroke="#FFD700" strokeOpacity="0.6" strokeWidth="1"/>
    <path d="M12.37,15.67c-1.39,0.22-2.31,0.59-2.31,1.1c0,0.6,1.06,1.04,2.56,1.04c0.55,0,1.07-0.06,1.54-0.16l0.65,1.7 c-0.65,0.18-1.37,0.28-2.13,0.28c-3.31,0-5.26-1.57-5.26-3.79c0-1.87,1.48-3.13,4.01-3.61V15.67z M12.63,5.81 c1.45-0.19,2.4-0.53,2.4-1.02c0-0.54-1.02-0.96-2.4-0.96c-0.45,0-0.88,0.05-1.28,0.13L10.7,2.23c0.58-0.14,1.22-0.23,1.89-0.23 c3.29,0,5.08,1.55,5.08,3.59c0,1.67-1.23,2.92-3.83,3.37L12.63,5.81z" fill="#FFD700" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}/>
    <defs>
      <linearGradient id="paint0_linear_icon" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFC700"/>
        <stop offset="1" stopColor="#E08E00"/>
      </linearGradient>
    </defs>
  </svg>
);

export default TokenIcon;