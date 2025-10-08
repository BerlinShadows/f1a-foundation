'use client';

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function Card({
    children,
    title,
    icon,
    className = '',
    style,
}: CardProps) {
    return (
        <div
            className={className}
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px var(--shadow)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                ...style,
            }}
            onMouseEnter={(e) => {
                if (style?.pointerEvents !== 'none') {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px var(--shadow)';
                }
            }}
            onMouseLeave={(e) => {
                if (style?.pointerEvents !== 'none') {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px var(--shadow)';
                }
            }}
        >
            {(title || icon) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    {icon}
                    {title && (
                        <h3
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                margin: 0,
                            }}
                        >
                            {title}
                        </h3>
                    )}
                </div>
            )}
            <div>{children}</div>
        </div>
    );
}