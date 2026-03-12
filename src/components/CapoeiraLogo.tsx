interface LogoProps {
  size?: number
  color?: string
  className?: string
}

export function CapoeiraIcon({ size = 36, color = '#7CB342', className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={size * 1.2}
      className={className}
      fill="none"
    >
      {/* Leaves sprouting from top */}
      <path d="M52 28C48 18 44 6 50 1C56 6 54 18 52 28Z" fill={color} />
      <path d="M54 25C60 14 66 7 64 1C72 8 65 18 58 25Z" fill={color} opacity="0.8" />
      {/* Small leaf/bird to the right */}
      <path d="M66 16C70 12 76 10 79 14C75 14 71 16 68 20Z" fill={color} opacity="0.7" />

      {/* Person bottom-left — body + arms reaching up */}
      <circle cx="35" cy="52" r="5" fill={color} />
      <path d="M35 57C35 57 32 68 33 78C34 82 37 86 35 92" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M35 60C28 52 26 44 31 37" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M35 60C42 54 46 46 48 36" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Person bottom-right — body + arms reaching up */}
      <circle cx="67" cy="62" r="5" fill={color} />
      <path d="M67 67C68 76 66 82 68 90" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M67 69C74 62 76 54 72 44" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M67 69C60 65 56 58 55 49" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Person top — smaller, connecting the circle */}
      <circle cx="52" cy="35" r="4" fill={color} />
      <path d="M52 39C52 43 54 47 55 51" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M52 41C47 42 43 45 39 50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 41C58 40 63 43 66 48" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      {/* Outer arc lines forming the seed/fruit shape */}
      <path d="M33 88C25 78 22 65 26 55C28 50 30 47 32 43" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M68 86C76 76 79 63 76 53C74 48 72 45 70 42" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </svg>
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
