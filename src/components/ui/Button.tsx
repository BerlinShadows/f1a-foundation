'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

export default function Button({
    children,
    variant = 'primary',
    iconLeft,
    iconRight,
    className = '',
    style,
    ...props
}: ButtonProps) {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.65rem 1.25rem',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: 'none',
        outline: 'none',
    };

    const variants = {
        primary: {
            background: 'var(--accent)',
            color: 'white',
        },
        secondary: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
        },
        outline: {
            background: 'transparent',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
        },
    };

    const activeStyles = {
        primary: { background: 'var(--accent-hover)' },
        secondary: { background: 'rgba(255, 255, 255, 0.08)' },
        outline: { background: 'rgba(99, 102, 241, 0.1)' },
    };

    return (
        <button
            {...props}
            className={className}
            style={{
                ...baseStyles,
                ...variants[variant],
                ...(props.disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!props.disabled) {
                    Object.assign(e.currentTarget.style, activeStyles[variant]);
                }
            }}
            onMouseLeave={(e) => {
                if (!props.disabled) {
                    Object.assign(e.currentTarget.style, variants[variant]);
                }
            }}
        >
            {iconLeft}
            {children}
            {iconRight}
        </button>
    );
}