'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export default function Input({ label, icon, error, className = '', style, ...props }: InputProps) {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: '1rem',
              color: 'var(--text-secondary)',
              pointerEvents: 'none',
            }}
          >
            {icon}
          </span>
        )}
        <input
          {...props}
          style={{
            width: '100%',
            padding: icon ? '0.75rem 0.75rem 0.75rem 2.5rem' : '0.75rem',
            background: 'var(--bg-secondary)',
            border: error ? '1px solid #f87171' : '1px solid var(--border)',
            borderRadius: '10px',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            ...style,
          }}
        />
      </div>
      {error && (
        <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.3rem' }}>{error}</p>
      )}
    </div>
  );
}