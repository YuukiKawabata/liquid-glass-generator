'use client';

export function LiquidGlassFilters() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', visibility: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        {/* Original Liquid Glass Distortion - Exact Match */}
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves={2}
            seed={92}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale={230}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtle Version for UI Elements */}
        <filter id="lg-dist-subtle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves={2}
            seed={92}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale={80}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Button Version */}
        <filter id="lg-dist-button" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves={2}
            seed={92}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale={150}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Glow Effect Filter */}
        <filter id="liquid-glass-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={4} result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Inner Shadow Filter */}
        <filter id="liquid-glass-inner-shadow" x="0%" y="0%" width="100%" height="100%">
          <feOffset dx={0} dy={2} />
          <feGaussianBlur stdDeviation={2} result="offset-blur" />
          <feFlood floodColor="#000000" floodOpacity={0.3} />
          <feComposite in2="offset-blur" operator="in" />
          <feComposite in2="SourceGraphic" operator="over" />
        </filter>

        {/* Shimmer Effect */}
        <linearGradient id="shimmer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-100 0;100 0;-100 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>

        {/* Conic Gradient for Borders */}
        <defs>
          <radialGradient id="liquid-border-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Animated Noise for Dynamic Effects */}
        <filter id="animated-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves={3}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.008;0.012;0.008"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={100}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}