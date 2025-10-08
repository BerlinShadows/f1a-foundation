'use client';

export default function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: `
          radial-gradient(
            circle at 20% 30%,
            var(--gradient-start),
            transparent 40%
          ),
          radial-gradient(
            circle at 80% 70%,
            var(--gradient-end),
            transparent 40%
          )
        `,
        backgroundSize: '200% 200%',
        animation: `gradientShift var(--gradient-animation-duration, 18s) ease infinite`,
        pointerEvents: 'none',
        transition: 'background 0.5s ease',
      }}
    />
  );
}