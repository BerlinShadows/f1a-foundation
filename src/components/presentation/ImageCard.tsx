import React from 'react';
import Image from 'next/image'

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
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                boxSizing: 'border-box',
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
                    position: 'relative',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                }}
            >
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        width={500}
                        height={500}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                ) : (
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                        {alt || 'Image'}
                    </div>
                )}
            </div>

            <div style={{
                padding: '1.25rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
            }}>
                <h3
                    style={{
                        margin: 0,
                        fontSize: '1.25rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        lineHeight: 1.3,
                    }}>
                    {title}
                </h3>
                <p
                    style={{
                        marginTop: '0.5rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        fontSize: '0.95rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                        hyphens: 'auto',
                        boxSizing: 'border-box',
                        width: '100%',
                    }}>
                    {description}
                </p>
            </div>
        </div>
    );
}