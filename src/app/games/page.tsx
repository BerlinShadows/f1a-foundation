'use client';

import Link from 'next/link';

export default function GamesPage() {
    const games = [
        {
            id: 'flip',
            title: 'Flip Coin',
            description: 'Toss a coin and see what fate decides!',
            href: '/games/flipcoin',
        },
    ];

    const globalStats = {
        totalGames: games.length,
        totalSessions: 1247,
        currentOnline: 86,
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

                            <Link
                                href={game.href}
                                style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))',
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    marginTop: '1rem',
                                    transition: 'background 0.2s ease, transform 0.1s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, var(--accent-hover), var(--accent-hover))';
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                Play
                            </Link>
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
                        { label: 'Total Games', value: globalStats.totalGames, color: 'var(--text-primary)' },
                        { label: 'Sessions Played', value: globalStats.totalSessions, color: 'var(--accent)' },
                        { label: 'Online Now', value: `${globalStats.currentOnline} players`, color: '#6366f1' },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '1rem 1.5rem',
                            minWidth: '140px',
                            textAlign: 'center',
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
        </div>
    );
}