'use client';

import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const Footer = () => {
    return (
        <footer
            style={{
                background: 'var(--footer-bg)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--footer-border)',
                padding: '3rem 1.5rem 2rem',
                marginTop: 'auto',
                boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.08)',
                width: '100%',
                minWidth: '100vw',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2.5rem',
                    width: '100%',
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            background: 'linear-gradient(135deg, var(--accent), var(--gradient-end))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Web3<span style={{ opacity: 0.65 }}>Template</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        Building infrastructure for a user-owned digital future.
                    </p>
                </div>

                <div>
                    <h4
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            marginBottom: '1.25rem',
                            color: 'var(--text-primary)',
                        }}
                    >
                        Navigation
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            { name: 'Overview', href: '/' },
                            { name: 'Ecosystem', href: '/reference' },
                            { name: 'Identity', href: '/profile' },
                            { name: 'Activity', href: '/audit' },
                        ].map((item) => (
                            <li key={item.href} style={{ marginBottom: '0.75rem' }}>
                                <Link
                                    href={item.href}
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        fontSize: '0.95rem',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            marginBottom: '1.25rem',
                            color: 'var(--text-primary)',
                        }}
                    >
                        Resources
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            { name: 'GitHub', href: 'https://github.com/BerlinShadows/' },
                            { name: 'Whitepaper', href: '#' },
                            { name: 'Roadmap', href: '/' },
                            { name: 'Community', href: '.' },
                        ].map((item) => (
                            <li key={item.href} style={{ marginBottom: '0.75rem' }}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        fontSize: '0.95rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                >
                                    {item.name}
                                    <ArrowTopRightOnSquareIcon style={{ width: '14px', height: '14px' }} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            marginBottom: '1.25rem',
                            color: 'var(--text-primary)',
                        }}
                    >
                        Connect
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        Follow us for updates and community news.
                    </p>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                        {['Twitter', 'Discord', 'Telegram'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--accent)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--bg-secondary)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                {social[0]}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div
                style={{
                    maxWidth: '1200px',
                    margin: '2.5rem auto 0',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--footer-border)',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    width: '100%',
                }}
            >
                © {new Date().getFullYear()} Protocol Labs. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;