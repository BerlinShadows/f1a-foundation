'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import VisualFocusContainer from '@/components/animations/VisualFocusContainer';
import Table from '@/components/ui/Table';
import PlayerNameSetup from '@/components/ui/PlayerNameSetup';

export default function GuessGamePage() {
    const [playerName, setPlayerName] = useState<string | null>(null);

    const MIN = 1;
    const MAX = 100;

    const [target, setTarget] = useState<number | null>(null);
    const [guess, setGuess] = useState<string>('');
    const [result, setResult] = useState<{ guess: number; distance: number } | null>(null);
    const [isRevealing, setIsRevealing] = useState(false);
    const [history, setHistory] = useState<{ guess: number; target: number; distance: number }[]>([]);
    const [leaderboard, setLeaderboard] = useState<{ name: string; distance: number }[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('guess-leaderboard');
        if (saved) setLeaderboard(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('guess-leaderboard', JSON.stringify(leaderboard));
    }, [leaderboard]);

    const newRound = () => {
        const newTarget = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        setTarget(newTarget);
        setResult(null);
        setGuess('');
    };

    if (!playerName) {
        return <PlayerNameSetup onReady={setPlayerName} />;
    }

    const handleSubmit = () => {
        const num = parseInt(guess, 10);
        if (isNaN(num) || num < MIN || num > MAX) return;

        if (!target) {
            newRound();
            return;
        }

        const distance = Math.abs(target - num);
        const newResult = { guess: num, distance };

        setResult(newResult);
        setIsRevealing(true);

        setTimeout(() => {
            setIsRevealing(false);
            setHistory(prev => [{ guess: num, target, distance }, ...prev.slice(0, 4)]);

            setLeaderboard(prev => {
                const updated = [...prev, { name: playerName, distance }];
                return updated
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 5);
            });
        }, 1500);
    };

    return (
        <div style={{ margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    textShadow: 'var(--text-shadow)',
                }}>
                    Guess the Target
                </h1>
            </div>

            <p style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                fontSize: '1rem',
            }}>
                Угадайте число от <strong>{MIN}</strong> до <strong>{MAX}</strong>.
                Побеждает тот, чья попытка ближе всего к скрытому числу!
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                <input
                    type="number"
                    min={MIN}
                    max={MAX}
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder={`От ${MIN} до ${MAX}`}
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        width: '120px',
                        textAlign: 'center',
                    }}
                />
                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    disabled={!guess.trim()}
                >
                    Отправить
                </Button>
            </div>

            {target !== null && (
                <VisualFocusContainer isActive={true}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.2rem',
                            fontWeight: 'bold',
                            color: 'white',
                            boxShadow: 'var(--shadow-md)',
                            opacity: isRevealing ? 0 : 1,
                            transform: isRevealing ? 'scale(0.8)' : 'scale(1)',
                            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}>
                            {result ? target : '?'}
                        </div>
                    </div>
                </VisualFocusContainer>
            )}

            {result && (
                <div style={{
                    marginTop: '1rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: result.distance === 0 ? 'var(--accent)' : '#6366f1',
                    textAlign: 'center',
                }}>
                    {result.distance === 0
                        ? '🎯 Точно в цель!'
                        : result.distance <= 5
                            ? '🔥 Очень близко!'
                            : 'Хорошая попытка!'}
                    <br />
                    Расстояние: <strong>{result.distance}</strong>
                </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
                <Button
                    onClick={newRound}
                    variant="outline"
                >
                    Новый раунд
                </Button>
            </div>

            {leaderboard.length > 0 && (
                <Card title='Таблица лидеров:' style={{ marginBottom: '3rem' }}>
                    <Table
                        pageSize={5}
                        headers={['Игрок', 'Расстояние']}
                        rows={leaderboard.map(item => [item.name, item.distance.toString()])}
                    />
                </Card>
            )}

            {history.length > 0 && (
                <Card title='Последние попытки:'>
                    <Table
                        pageSize={5}
                        headers={['Ваше число', 'Цель', 'Расстояние']}
                        rows={history.map(item => [
                            item.guess.toString(),
                            item.target.toString(),
                            item.distance.toString()
                        ])}
                    />
                </Card>
            )}
        </div>
    );
}