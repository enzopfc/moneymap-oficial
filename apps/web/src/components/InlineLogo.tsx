interface InlineLogoProps {
  size?: number;
  className?: string;
}

export function InlineLogo({ size = 32, className = '' }: InlineLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`orangeGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`darkGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34495E" stopOpacity="1" />
          <stop offset="100%" stopColor="#2C3E50" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Main Logo Shape */}
      <path d="M75 225C75 169.772 119.772 125 175 125H225C225 180.228 180.228 225 125 225H75Z" fill={`url(#orangeGradient-${size})`}/>
      
      {/* Globe/World */}
      <circle cx="150" cy="150" r="70" fill={`url(#darkGradient-${size})`} stroke="#34495E" strokeWidth="2"/>
      
      {/* World Map Details */}
      <path d="M120 130C125 125 135 120 145 125C150 130 155 135 160 140C165 145 170 150 165 155C160 160 150 165 140 160C130 155 120 145 120 130Z" fill="white" opacity="0.9"/>
      <path d="M155 125C160 120 170 115 180 120C185 125 190 130 185 135C180 140 170 145 160 140C155 135 155 130 155 125Z" fill="white" opacity="0.8"/>
      <path d="M130 165C135 160 145 155 155 160C160 165 165 170 160 175C155 180 145 185 135 180C130 175 130 170 130 165Z" fill="white" opacity="0.7"/>
      
      {/* Dollar Sign */}
      <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="150" y1="110" x2="150" y2="190"/>
        <path d="M135 125H157.5C162.194 125 166 128.806 166 133.5C166 138.194 162.194 142 157.5 142H142.5C137.806 142 134 145.806 134 150.5C134 155.194 137.806 159 142.5 159H165"/>
      </g>
      
      {/* Navigation Arrow */}
      <path d="M80 100L100 90L95 110Z" fill={`url(#orangeGradient-${size})`}/>
    </svg>
  );
}
