'use client';

import GradientBackground from '@/components/presentation/GradientBackground';
import Marquee from '@/components/presentation/Marquee';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import StatCard from '@/components/ui/StatCard';
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

            <div style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--text-primary)' }}>
                    UI Components Preview
                </h2>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Buttons</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Inputs</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <Input label="Wallet Address" placeholder="0x..." />
                        </div>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <Input
                                label="Amount"
                                placeholder="0.0"
                                icon={<span style={{ fontSize: '1.1rem' }}>Ξ</span>}
                            />
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Badges</h3>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        <Badge>Default</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="danger">Danger</Badge>
                    </div>
                </section>

                <section>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Stat Cards</h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '1.5rem',
                        }}
                    >
                        <StatCard
                            title="Total Value"
                            value="$24,582"
                            icon={<CpuChipIcon style={{ width: '20px', height: '20px' }} />}
                            trend="up"
                            trendValue="12.4%"
                        />
                        <StatCard
                            title="Active Users"
                            value="1,842"
                            icon={<UserCircleIcon style={{ width: '20px', height: '20px' }} />}
                            trend="down"
                            trendValue="3.1%"
                        />
                        <StatCard
                            title="Transactions"
                            value="42,109"
                            icon={<DocumentTextIcon style={{ width: '20px', height: '20px' }} />}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}