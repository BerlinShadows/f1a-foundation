'use client';

import AccentBackground from '@/components/presentation/AccentBackground';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ margin: '0 auto' }}>
            <AccentBackground isActive={true} duration={Infinity} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    padding: '2rem',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <h1
                    style={{
                        fontSize: '6rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--accent), var(--gradient-end))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    404
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    {`Oops! This page doesn't exist.`}
                </p>
                <Link
                    href="/"
                    style={{
                        background: 'var(--accent)',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '10px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}