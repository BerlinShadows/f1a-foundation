'use client';

import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';

interface ImageCarouselProps {
    items: {
        src: string;
        alt: string;
        title: string;
        description: string;
    }[];
    autoPlay?: boolean;
    interval?: number;
}

export default function ImageCarousel({
    items,
    autoPlay = false,
    interval = 5000,
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, items.length]);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            {/* Карточка */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
                <div
                    style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${items.length * 100}%`,
                    }}
                >
                    {items.map((item, i) => (
                        <div key={i} style={{ flex: '0 0 100%', padding: '0 8px' }}>
                            <ImageCard {...item} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={goToPrev}
                    style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                >
                    ‹
                </button>
                <button
                    onClick={goToNext}
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                >
                    ›
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: i === currentIndex ? 'var(--accent)' : 'var(--border)',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}