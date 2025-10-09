import React from 'react';

interface ImageCardProps {
    src: string;
    alt: string;
    title: string;
    description: string;
}

export default function ImageCard({ src, alt, title, description }: ImageCardProps) {
    return (
        <div
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px var(--shadow)',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 6px 24px var(--shadow)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px var(--shadow)';
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                }}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    'Image Placeholder'
                )}
            </div>
            <div style={{ padding: '1.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {title}
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {description}
                </p>
            </div>
        </div>
    );
}