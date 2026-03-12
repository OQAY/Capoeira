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

export function CapoeiraWordmark({ className = '' }: { className?: string; color?: string }) {
  return (
    <img
      src="/capoeira-wordmark.png"
      alt="CAPOEIRA"
      className={`h-7 mt-2 object-contain ${className}`}
    />
  )
}
