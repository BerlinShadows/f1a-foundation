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
import React from 'react';
// import { useThemeColors } from '@/hooks/useThemeColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartProps {
    title?: string;
    height?: number;
}

export default function Chart({ title, height = 300 }: ChartProps) {
    // const colors = useThemeColors();

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'TVL',
                data: [12000, 19000, 15000, 22000, 28000, 32000],
                // borderColor: colors.line,
                // backgroundColor: colors.area,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    // color: colors.text, 
                    font: { size: 12 }
                },
            },
        },
        scales: {
            x: {
                // ticks: { color: colors.text },
                // grid: { color: colors.grid },
            },
            y: {
                // ticks: { color: colors.text },
                // grid: { color: colors.grid },
            },
        },
    };

    return (
        <div style={{ height: `${height}px`, position: 'relative' }}>
            {title && <h3 style={{
                marginBottom: '1rem',
                // color: colors.text,
                fontSize: '1.1rem'
            }}>{title}</h3>}
            <div style={{ height: '100%' }}>
                <Line data={data} options={options as any} />
            </div>
        </div>
    );
}