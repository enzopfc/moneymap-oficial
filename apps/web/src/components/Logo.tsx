import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

// Inline SVG logo for better reliability
function InlineLogo({ size, className }: { size: string; className?: string }) {
  return (
    <div className={`${size} ${className} relative flex-shrink-0`}>
      <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
        {/* Main orange shape */}
        <path d="M60 150 C60 95, 105 50, 160 50 L240 50 C240 105, 195 150, 140 150 L60 150 Z" fill="#FFA500"/>
        
        {/* World globe */}
        <circle cx="150" cy="150" r="70" fill="#2C3E50"/>
        <circle cx="150" cy="150" r="68" fill="#34495E"/>
        
        {/* Globe grid lines */}
        <circle cx="150" cy="150" r="68" fill="none" stroke="#4A5568" strokeWidth="1" opacity="0.3"/>
        <ellipse cx="150" cy="150" rx="68" ry="34" fill="none" stroke="#4A5568" strokeWidth="1" opacity="0.3"/>
        <ellipse cx="150" cy="150" rx="34" ry="68" fill="none" stroke="#4A5568" strokeWidth="1" opacity="0.3"/>
        
        {/* World continents */}
        <path d="M115 125 Q125 115, 140 125 Q155 135, 165 145 Q170 155, 160 165 Q145 170, 130 165 Q115 150, 115 125" fill="white" opacity="0.9"/>
        <path d="M165 120 Q175 115, 185 125 Q190 135, 185 145 Q175 150, 165 140 L165 120" fill="white" opacity="0.8"/>
        <path d="M125 170 Q135 165, 150 170 Q165 175, 170 185 Q160 190, 145 185 Q130 180, 125 170" fill="white" opacity="0.7"/>
        
        {/* Dollar sign */}
        <g stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="150" y1="105" x2="150" y2="195"/>
          <path d="M130 125 L165 125 Q175 125, 175 135 Q175 145, 165 145 L135 145 Q125 145, 125 155 Q125 165, 135 165 L170 165"/>
        </g>
        
        {/* Navigation arrow */}
        <path d="M75 95 L100 85 L92 110 Z" fill="#FFA500"/>
      </svg>
    </div>
  );
}

export function Logo({ size = 'md', className = '', showText = true, variant = 'default' }: LogoProps) {
  const logoSize = sizeClasses[size];
  const textSize = textSizeClasses[size];
  
  const textColorClass = variant === 'white' 
    ? 'text-white' 
    : variant === 'dark' 
    ? 'text-gray-900' 
    : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <InlineLogo size={logoSize} />
      {showText && (
        <span className={`${textSize} font-bold ${textColorClass}`}>
          MoneyMapp
        </span>
      )}
    </div>
  );
}
