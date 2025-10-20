// app/components/ui/PlayerNameSetup.tsx
'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function PlayerNameSetup({ onReady }: { onReady: (name: string) => void }) {
    const [name, setName] = useState('Player');

    useEffect(() => {
        const saved = localStorage.getItem('player-name');
        if (saved) {
            setName(saved);
            onReady(saved);
        }
    }, [onReady]);

    const handleSave = () => {
        const finalName = name.trim() || 'Player';
        localStorage.setItem('player-name', finalName);
        onReady(finalName);
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Как тебя зовут?</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваш никнейм"
                style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    width: '200px',
                    textAlign: 'center',
                    marginBottom: '1rem',
                }}
            />
            <br />
            <Button onClick={handleSave} variant="primary">Сохранить</Button>
        </div>
    );
}