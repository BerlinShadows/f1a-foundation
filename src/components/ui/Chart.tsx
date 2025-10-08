'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartProps {
    title?: string;
    height?: number;
}

export default function Chart({ title, height = 300 }: ChartProps) {

    const data = useMemo(() => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'TVL',
                data: [12000, 19000, 15000, 22000, 28000, 32000],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
            },
            {
                label: 'Users',
                data: [800, 1200, 1000, 1500, 2100, 2500],
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
            },
            {
                label: 'Transactions',
                data: [4200, 6800, 5400, 8900, 11200, 13500],
                borderColor: '#db2777',
                backgroundColor: 'rgba(219, 39, 119, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
            },
        ],
    }), []);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#000000ff', font: { size: 12 } },
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                bodyColor: '#000000ff',
                titleColor: '#000000ff',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(0,0,0,0.2)',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: { color: '#64748b' },
                grid: { color: 'rgba(0, 0, 0, 0.08)' },
            },
            y: {
                ticks: {
                    color: '#64748b',
                    callback: (value: string | number) => value.toLocaleString(),
                },
                grid: { color: 'rgba(0, 0, 0, 0.08)' },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    }), []);

    return (
        <div style={{ height: `${height}px`, position: 'relative' }}>
            {title && (
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                    {title}
                </h3>
            )}
            <div style={{ height: '100%' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}