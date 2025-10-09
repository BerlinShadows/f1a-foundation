'use client';

import React, { useState, useEffect } from 'react';
import ParticleCanvas from './ParticleCanvas';

interface VisualFocusAnimationProps {
    isActive?: boolean;
    children?: React.ReactNode;
}

export default function VisualFocusAnimation({
    isActive = false,
    children,
}: VisualFocusAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isActive) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isActive]);

    if (!isVisible && !isActive) return null;

    return (
        <>
            <ParticleCanvas />

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
                    animation: 'visualFlow 20s ease-in-out infinite',
                    opacity: 0.2,
                    pointerEvents: 'none',
                }}
            />

            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    pointerEvents: 'none',
                }}
            >
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${20 + i * 20}%`,
                            left: '-10%',
                            width: '120%',
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
                            opacity: 0.3,
                            animation: `linePulse ${3 + i}ms ease-in-out infinite`,
                        }}
                    />
                ))}
            </div>

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    padding: '2rem',
                }}
            >
                {children}
            </div>

            <style jsx global>{`
        @keyframes visualFlow {
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

        @keyframes linePulse {
          0%, 100% {
            transform: scaleX(0.5);
          }
          50% {
            transform: scaleX(1);
          }
        }
      `}</style>
        </>
    );
}