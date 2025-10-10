'use client';

import Link from 'next/link';
import './not-found.css';
import VisualFocusContainer from '@/components/animations/VisualFocusContainer';

export default function NotFound() {
    return (
        <div style={{ margin: '0 auto' }}>
            <VisualFocusContainer isActive={true}>
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

                    <div className="glitch-wrapper">
                        <h1 className="glitch" data-text="404">
                            404
                        </h1>
                        <p className="subtitle">lost in the vibe</p>
                    </div>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        {`Oops! This page doesn't exist.`}
                    </p>
                    <Link href="/" className="home-link">
                        ← back to reality
                    </Link>
                </div>
            </VisualFocusContainer>
        </div>
    );
}