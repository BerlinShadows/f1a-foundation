'use client';

import GradientBackground from '@/components/animations/GradientBackground';
import ImageCarousel from '@/components/ui/ImageCarousel';
import Marquee from '@/components/animations/Marquee';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Chart from '@/components/ui/Chart';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Skeleton from '@/components/ui/Skeleton';
import StatCard from '@/components/ui/StatCard';
import Table from '@/components/ui/Table';
import Tabs from '@/components/ui/Tabs';
import { CpuChipIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import image1 from '@/assets/1.jpg';
import image2 from '@/assets/3.jpg';
import VisualFocusContainer from '@/components/animations/VisualFocusContainer';

const carouselItems = [
    {
        src: image1.src,
        alt: 'Concept 1',
        title: 'Decentralized Identity',
        description: 'Own and control your digital identity across platforms without intermediaries.',
    },
    {
        src: image2.src,
        alt: 'Concept 2',
        title: 'Composable Assets',
        description: 'Assets that can be used across multiple protocols and applications seamlessly.',
    },
    {
        src: image2.src,
        alt: 'Concept 3',
        title: 'Transparent Governance',
        description: 'Participate in protocol decisions with full visibility and verifiable voting.',
    },
];

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mockRows, setMockRows] = useState<(string | number | React.ReactNode)[][]>([]);

    useEffect(() => {
        const generateMockRows = () => {
            return Array.from({ length: 25 }, (_, i) => [
                `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
                `${(Math.random() * 10).toFixed(2)} ETH`,
                i % 3 === 0 ? <Badge variant="success">Confirmed</Badge> :
                    i % 3 === 1 ? <Badge variant="warning">Pending</Badge> :
                        <Badge variant="danger">Failed</Badge>,
                `${Math.floor(Math.random() * 60)} min ago`,
            ]);
        };

        setMockRows(generateMockRows());
    }, []);

    return (
        <div style={{ margin: '0 auto' }}>
            <GradientBackground />

            <div
                style={{
                    textAlign: 'center',
                    padding: '3rem 1.5rem 2rem',
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
                        marginBottom: '1.2rem',
                        background: 'linear-gradient(135deg, var(--accent), var(--gradient-end))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1.2,
                    }}
                >
                    Reimagine Ownership
                </h1>

                <p
                    style={{
                        fontSize: '1.15rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        marginTop: '1.2rem',
                    }}
                >
                    A new paradigm for digital identity, assets, and collaboration — built on transparency, user sovereignty, and open protocols.
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

            <div style={{ padding: '3rem 1.5rem', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '3rem', color: 'var(--text-primary)' }}>Stat Cards</h3>
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

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Data Table</h3>
                    <Table
                        headers={['Transaction', 'Amount', 'Status', 'Time']}
                        rows={mockRows}
                        sortable={true}
                        filterable={true}
                    />
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Analytics Chart</h3>
                    <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        <Chart title="Total Value Locked (TVL)" height={320} />
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Modal</h3>
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Transaction Details">
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            You are about to send 1.5 ETH to 0x8a3...f2c.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button>Confirm</Button>
                        </div>
                    </Modal>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Tabs</h3>
                    <Tabs
                        tabs={[
                            {
                                id: 'overview',
                                label: 'Overview',
                                content: <p style={{ color: 'var(--text-secondary)' }}>Total assets, activity summary.</p>,
                            },
                            {
                                id: 'history',
                                label: 'History',
                                content: <Table headers={['Action', 'Date']} rows={[['Deposit', 'Today'], ['Withdraw', 'Yesterday']]} pageSize={5} />,
                            },
                            {
                                id: 'settings',
                                label: 'Settings',
                                content: <Input label="Wallet Name" placeholder="My Wallet" />,
                            },
                        ]}
                    />
                </section>

                <section style={{ marginBottom: '3rem' }} >
                    <h3 style={{ marginBottom: '3rem', color: 'var(--text-primary)' }}>
                        Skeleton Loading
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <Skeleton circle width="40px" height="40px" />
                        <div style={{ flex: 1 }}>
                            <Skeleton width="60%" height="1.2rem" />
                            <Skeleton width="40%" height="1rem" style={{ marginTop: '0.5rem' }} />
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '3rem', color: 'var(--text-primary)' }}>
                        Vision Gallery
                    </h3>
                    <ImageCarousel items={carouselItems} autoPlay interval={6000} />
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '3rem', color: 'var(--text-primary)' }}>
                        Visual Focus Demo
                    </h3>
                    <VisualFocusContainer isActive={true}>
                        <h3
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, var(--accent), var(--gradient-end))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                margin: 0,
                            }}
                        >
                            This is a Visual Focus Container
                        </h3>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            A dynamic, adaptive container with particle effects and gradients.
                        </p>
                    </VisualFocusContainer>
                </section>
            </div>

        </div>
    );
}