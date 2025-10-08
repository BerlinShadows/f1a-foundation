'use client';

import { useTheme } from '@/hooks/useTheme';
import { useLayoutEffect, useState } from 'react';

const BRANDS = [
  'ETH', 'POLY', 'ARB', 'OP', 'LINK', 'GRT',
  'LENS', 'AAVE', 'UNI', 'OS', 'CB', 'MM',
];

export default function Marquee() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '1.8rem 0',
        marginTop: '3rem',
        marginBottom: '3rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: `marquee ${isMobile ? '35s' : '25s'} linear infinite`,
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          fontWeight: 500,
          color: isDark ? 'rgba(230, 230, 255, 0.6)' : 'rgba(182, 30, 106, 0.6)',
        }}
      >
        {Array(4)
          .fill(0)
          .flatMap(() => BRANDS)
          .map((brand, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                margin: isMobile ? '0 1.2rem' : '0 1.8rem',
                opacity: 0.85,
                letterSpacing: '0.3px',
              }}
            >
              {brand}
            </span>
          ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}