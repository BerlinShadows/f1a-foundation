'use client';

import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: React.CSSProperties;
}

const variantColors: Record<BadgeVariant, string> = {
  default: 'rgba(148, 163, 184, 0.2)',
  success: 'rgba(72, 187, 120, 0.2)',
  warning: 'rgba(234, 179, 8, 0.2)',
  danger: 'rgba(239, 68, 68, 0.2)',
};

const variantTextColors: Record<BadgeVariant, string> = {
  default: '#94a3b8',
  success: '#48bb78',
  warning: '#eab308',
  danger: '#ef4444',
};

export default function Badge({
  children,
  variant = 'default',
  className = '',
  style,
}: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.25rem 0.6rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 600,
        backgroundColor: variantColors[variant],
        color: variantTextColors[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}