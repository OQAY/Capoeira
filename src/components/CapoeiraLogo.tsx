interface LogoProps {
  size?: number
  color?: string
  className?: string
}

export function CapoeiraIcon({ size = 36, className = '' }: LogoProps) {
  return (
    <img
      src="/capoeira-logo.png"
      alt="CAPOEIRA"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

export function CapoeiraWordmark({ className = '', color = '#1B4332' }: { className?: string; color?: string }) {
  return (
    <span className={`font-bold tracking-wider ${className}`} style={{ color, letterSpacing: '0.08em' }}>
      CAP
      <span className="relative inline-block">
        O
        {/* Leaf inside the O */}
        <svg
          viewBox="0 0 12 12"
          className="absolute"
          style={{ width: '0.35em', height: '0.35em', bottom: '0.15em', left: '50%', transform: 'translateX(-50%)' }}
        >
          <path d="M6 10C4 7 2 4 6 1C10 4 8 7 6 10Z" fill={color} />
        </svg>
      </span>
      EIRA
    </span>
  )
}
