import GradientBackground from '@/components/presentation/GradientBackground';
import Marquee from '@/components/presentation/Marquee';
import Card from '@/components/ui/Card';
import { CpuChipIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
    return (
        <>
            <GradientBackground />

            <div
                style={{
                    textAlign: 'center',
                    padding: '4rem 1.5rem 2rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <h1
                    style={{
                        fontSize: '2.8rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1.2,
                    }}
                >
                    Web3 Frontend Template
                </h1>

                <p
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginTop: '1.2rem',
                    }}
                >
                    A minimal, themeable, and reusable starter for modern Web3 applications.
                    Built with Next.js, TypeScript, and a focus on developer experience.
                </p>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    padding: '0 1.5rem 3rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <Card
                    title="Reference"
                    icon={<DocumentTextIcon style={{ width: '20px', height: '20px', color: 'var(--accent)' }} />}
                >
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Documentation, guides, and technical references for developers and users.
                    </p>
                </Card>

                <Card
                    title="Profile"
                    icon={<UserCircleIcon style={{ width: '20px', height: '20px', color: 'var(--accent)' }} />}
                >
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Manage your identity, settings, and connected wallets in one place.
                    </p>
                </Card>

                <Card
                    title="Audit Logs"
                    icon={<CpuChipIcon style={{ width: '20px', height: '20px', color: 'var(--accent)' }} />}
                >
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Track all actions, transactions, and system events with full transparency.
                    </p>
                </Card>
            </div>
            
            <Marquee />
        </>
    );
}