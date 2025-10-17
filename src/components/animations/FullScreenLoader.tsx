import React from 'react';

interface FullScreenLoaderProps {
    show?: boolean;
    message?: string;
    progress?: number;
}

export default function FullScreenLoader({
    show = true,
    message = 'Loading...',
    progress,
}: FullScreenLoaderProps) {
    if (!show) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                color: 'var(--text-primary)',
            }}
        >
            <div
                style={{
                    width: '300px',
                    height: '4px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: progress ? `${progress}%` : '100%',
                        background: progress ? 'var(--accent)' : 'var(--accent)',
                        borderRadius: '2px',
                        animation: progress ? 'none' : 'loadingLine 1.2s ease-in-out infinite',
                    }}
                />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 500, textAlign: 'center' }}>
                {message}
                {progress !== undefined && (
                    <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                        {progress}%
                    </span>
                )}
            </div>

            <style jsx global>{`
        @keyframes loadingLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </div>
    );
}