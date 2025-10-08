import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    circle?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function Skeleton({
    width = '100%',
    height = '1rem',
    circle = false,
    className = '',
    style,
}: SkeletonProps) {
    return (
        <div
            className={className}
            style={{
                width,
                height,
                borderRadius: circle ? '50%' : '8px',
                backgroundColor: 'var(--bg-secondary)',
                animation: 'skeleton-pulse 1.4s ease-in-out infinite',
                ...style,
            }}
        />
    );
}