'use client';

import React, { useState, useEffect } from 'react';

interface AccentBackgroundProps {
  isActive?: boolean;
  duration?: number;
}

export default function AccentBackground({
  isActive = false,
  duration = 20,
}: AccentBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  if (!isVisible && !isActive) return null;

  return (
    <>
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
            radial-gradient(circle at 30% 20%, var(--accent), transparent 40%),
            radial-gradient(circle at 70% 80%, var(--gradient-end), transparent 40%)
          `,
          backgroundSize: '300% 300%',
          animation: `accentFlow ${duration}s ease-in-out infinite`,
          opacity: isVisible ? 0.7 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.8s ease',
        }}
      />
      <style jsx global>{`
        @keyframes accentFlow {
          0% {
            background-position: 0% 0%, 100% 100%;
          }
          50% {
            background-position: 100% 100%, 0% 0%;
          }
          100% {
            background-position: 0% 0%, 100% 100%;
          }
        }
      `}</style>
    </>
  );
}