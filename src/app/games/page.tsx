'use client';

// import { useLoading } from '@/components/presentation/useLoading';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function useAnimatedNumber(target: number, duration: number = 800) {
    const [displayValue, setDisplayValue] = useState(target);
    const startValueRef = useRef(target);
    const startTimeRef = useRef(0);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (target === startValueRef.current) {
            setDisplayValue(target);
            return;
        }

        startValueRef.current = displayValue;
        startTimeRef.current = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = startValueRef.current + (target - startValueRef.current) * easeOutQuad(progress);
            setDisplayValue(Math.round(currentValue));

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [target, duration, displayValue]);

    return displayValue;
}

function easeOutQuad(t: number): number {
    return 1 - Math.pow(1 - t, 2);
}

export default function GamesPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const games = [
        {
            id: 'flip',
            title: 'Flip Coin',
            description: 'Toss a coin and see what fate decides!',
            href: '/games/flipcoin',
        },
        {
            id: 'dice',
            title: 'Roll Dice',
            description: 'Roll two dice and see the sum!',
            href: '/games/dice',
        },
        {
            id: 'guess',
            title: 'Guess the Target',
            description: 'Угадайте число, ближе всего к цели!',
            href: '/games/guess',
        }
    ];

    const [stats, setStats] = useState({
        totalGames: games.length,
        totalSessions: 1247,
        currentOnline: 86,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => {
                const onlineChange = Math.floor(Math.random() * 5) - 2;
                let newOnline = prev.currentOnline + onlineChange;
                if (newOnline < 50) newOnline = 50;
                if (newOnline > 120) newOnline = 120;

                let newSessions = prev.totalSessions;
                if (Math.random() < 0.3) {
                    newSessions += 1;
                }

                return {
                    totalGames: prev.totalGames,
                    totalSessions: newSessions,
                    currentOnline: newOnline,
                };
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => {
                const onlineChange = Math.floor(Math.random() * 5) - 2;
                let newOnline = prev.currentOnline + onlineChange;
                if (newOnline < 50) newOnline = 50;
                if (newOnline > 120) newOnline = 120;

                let newSessions = prev.totalSessions;
                if (Math.random() < 0.3) {
                    newSessions += 1;
                }

                return {
                    totalGames: prev.totalGames,
                    totalSessions: newSessions,
                    currentOnline: newOnline,
                };
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const animatedSessions = useAnimatedNumber(stats.totalSessions);
    const animatedOnline = useAnimatedNumber(stats.currentOnline);

    // const { show } = useLoading();
    const handlePlay = (href: string) => {
        setIsLoading(true);
        // show('spinner');


        setTimeout(() => {
            router.push(href);
        }, 1300);
    };

    return (
        <div style={{
            margin: '0 auto',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}></div>

            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                textAlign: 'center',
                textShadow: 'var(--text-shadow)',
            }}>
                Mini Games
            </h1>
            <div />

            <div style={{
                display: 'flex',
                gap: '1.25rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '800px',
                }}>
                    {games.map((game) => (
                        <div
                            key={game.id}
                            style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '180px',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                boxShadow: 'var(--shadow-sm)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <div>
                                <h2 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-primary)',
                                }}>
                                    {game.title}
                                </h2>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5,
                                }}>
                                    {game.description}
                                </p>
                            </div>

                            <button
                                onClick={() => handlePlay(game.href)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    marginTop: '1rem',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, var(--accent-hover), var(--accent-hover))';
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
                                }}
                            >
                                <span style={{
                                    fontSize: 'clamp(0.9rem, 4vw, 1.2rem)',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    textAlign: 'center',
                                }}>
                                    Play
                                </span>
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: '2.5rem',
                }}>
                    {[
                        { label: 'Total Games', value: stats.totalGames, color: 'var(--text-primary)' },
                        { label: 'Sessions Played', value: animatedSessions, color: 'var(--accent)' },
                        { label: 'Online Now', value: `${animatedOnline} players`, color: '#6366f1' },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '1rem 1.5rem',
                            minWidth: '140px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                        }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                {item.label}
                            </div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: item.color }}>
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    width: '100%',
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                    <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}>
                        Coming Soon
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        New games are on the way:
                        Stay tuned!
                    </p>
                </div>

            </div>
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'var(--bg)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                    transition: 'opacity 0.3s ease',
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }} />
                </div>
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

        </div>
    );
}