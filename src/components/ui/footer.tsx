'use client';

export default function Footer() {
    return (
        <div className="footer-text">
            <footer
                style={{
                    background: 'var(--footer-bg)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid var(--footer-border)',
                    padding: '1.4rem 1.5rem',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    marginTop: 'auto',
                    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',

                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <span>© {new Date().getFullYear()}</span>
                    <span>•</span>
                    <span>Web3 Frontend Template</span>
                    <span>•</span>
                    <a
                        href="https://github.com/BerlinShadows/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--accent)',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
}