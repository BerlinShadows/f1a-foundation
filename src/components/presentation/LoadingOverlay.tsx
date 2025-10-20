'use client';

import { useLoading } from './useLoading';

export default function LoadingOverlay() {
    const { isLoading, type } = useLoading();

    if (!isLoading) return null;

    const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--bg')
        .trim() || '#ffffff';

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: bgColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                transition: 'opacity 0.3s ease',
            }}
        >
            {type === 'spinner' && (
                <div
                    style={{
                        width: '48px',
                        height: '48px',
                        border: '4px solid #f0f0f0',
                        borderTop: '4px solid var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                />
            )}

            {type === 'progress' && (
                <div style={{ width: '200px', height: '6px', background: '#f0f0f0', borderRadius: '3px' }}>
                    <div
                        style={{
                            height: '100%',
                            width: '0%',
                            background: 'var(--accent)',
                            borderRadius: '3px',
                            animation: 'progressPulse 1.5s ease-in-out infinite',
                        }}
                    />
                </div>
            )}

            {type === 'dots' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            style={{
                                width: '12px',
                                height: '12px',
                                background: 'var(--accent)',
                                borderRadius: '50%',
                                animation: `bounce 1.4s ease-in-out infinite`,
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {type === 'logo' && (
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            fontSize: '2.5rem',
                            marginBottom: '1rem',
                            color: 'var(--accent)',
                            animation: 'pulse 2s infinite',
                        }}
                    >
                        🎮
                    </div>
                    <div
                        style={{
                            fontSize: '1rem',
                            color: 'var(--text-secondary)',
                            animation: 'fadeInOut 1.5s infinite',
                        }}
                    >
                        Loading...
                    </div>
                </div>
            )}
        </div>
    );
}