import { useState, useEffect } from 'react';

export function usePlayerName() {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        const saved = localStorage.getItem('player-name');
        if (saved) {
            setName(saved);
        } else {
            setName('Player');
        }
    }, []);

    const setPlayerName = (newName: string) => {
        const finalName = newName.trim() || 'Player';
        setName(finalName);
        localStorage.setItem('player-name', finalName);
    };

    return { name, setPlayerName };
}