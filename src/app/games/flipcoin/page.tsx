'use client';

import { useEffect, useState } from 'react';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import VisualFocusContainer from '@/components/animations/VisualFocusContainer';
import Table from '@/components/ui/Table';
import PlayerNameSetup from '@/components/ui/PlayerNameSetup';

export default function FlipCoinPage() {
    const [isFlipping, setIsFlipping] = useState(false);
    const [playerName, setPlayerName] = useState<string | null>(null);


    const [result, setResult] = useState<'heads' | 'tails' | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        heads: 0,
        tails: 0,
    });

    const [idleRotation, setIdleRotation] = useState(0);


    useEffect(() => {
        if (isFlipping) return;

        const interval = setInterval(() => {
            setIdleRotation(prev => (prev + 1) % 360);
        }, 50);

        return () => clearInterval(interval);
    }, [isFlipping]);

    const flipCoin = () => {
        if (isFlipping) return;

        setIsFlipping(true);
        setResult(null);

        setTimeout(() => {
            const randomResult = Math.random() > 0.5 ? 'heads' : 'tails';
            setResult(randomResult);
            setIsFlipping(false);
            setHistory(prev => [randomResult === 'heads' ? 'Орёл' : 'Решка', ...prev.slice(0, 4)]);

            setStats(prev => ({
                total: prev.total + 1,
                heads: randomResult === 'heads' ? prev.heads + 1 : prev.heads,
                tails: randomResult === 'tails' ? prev.tails + 1 : prev.tails,
            }));
        }, 1500);
    };

    useEffect(() => {
        const saved = localStorage.getItem('flipcoin-stats');
        if (saved) setStats(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('flipcoin-stats', JSON.stringify(stats));
    }, [stats]);


    if (!playerName) {
        return <PlayerNameSetup onReady={setPlayerName} />;
    }

    return (
        <div style={{
            margin: '0 auto',
        }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    textShadow: 'var(--text-shadow)',
                }}>
                    FlipCoin
                </h1>
            </div>

            <div style={{
                display: 'flex',
                gap: '1.25rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {[
                    { label: 'Всего', value: stats.total, color: 'var(--text-primary)' },
                    { label: 'Орёл', value: stats.heads, color: 'var(--coin-heads-start)' },
                    { label: 'Решка', value: stats.tails, color: 'var(--coin-tails-start)' },
                ].map((item, i) => (
                    <div key={i} style={{
                        background: 'var(--card-bg)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        minWidth: '90px',
                    }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.label}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: item.color }}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>


            <VisualFocusContainer isActive={true}>

                <div
                    style={{
                        position: 'relative',
                        width: '180px',
                        height: '180px',
                        margin: '0 auto',
                        perspective: '1000px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            transform: isFlipping
                                ? 'rotateY(1800deg)'
                                : `rotateY(${idleRotation}deg)`,
                            transition: isFlipping
                                ? 'transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
                                : 'none',
                            boxShadow: 'var(--shadow-md)',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--coin-heads-start), var(--coin-heads-end))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#1e293b',
                                backfaceVisibility: 'hidden',
                                border: '2px solid rgba(0,0,0,0.1)',
                            }}
                        >
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--coin-tails-start), var(--coin-tails-end))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#1e293b',
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                border: '2px solid rgba(0,0,0,0.1)',
                            }}
                        >
                        </div>
                    </div>
                </div>
            </VisualFocusContainer>
            <div style={{ marginBottom: '3rem' }}>
                <Button
                    onClick={flipCoin}
                    disabled={isFlipping}
                    variant="primary"
                >
                    {isFlipping ? 'Подбрасываю...' : 'Подбросить монетку'}
                </Button>
            </div>
            <Card style={{
                marginBottom: '3rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.25rem',
                width: '100%',
                maxWidth: '400px',
            }}>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    margin: '0 0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}>
                    Командное состязание
                </h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: '1rem',
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Команда Орёл</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--coin-heads-start)' }}>
                            {stats.heads}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>побед</div>
                    </div>
                    <div style={{
                        alignSelf: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--text-secondary)',
                    }}>
                        vs
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Команда Решка</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--coin-tails-start)' }}>
                            {stats.tails}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>побед</div>
                    </div>
                </div>
            </Card>

            {history.length > 0 && (
                <Card title='Последние броски:'>
                    <Table
                        pageSize={5}
                        rows={history.map((item) => (
                            [item]
                        ))} headers={[]} />
                </Card >
            )
            }

            {
                result && (
                    <div
                        style={{
                            marginTop: '1rem',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: result === 'heads'
                                ? 'var(--coin-heads-start)'
                                : 'var(--coin-tails-start)',
                            textAlign: 'center',
                            animation: 'fadeIn 0.5s ease-in-out',
                        }}
                    >
                        {result === 'heads' ? 'Орёл!' : 'Решка!'}
                    </div>
                )
            }

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </div >
    );
}