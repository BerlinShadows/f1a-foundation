'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export default function StatCard({ title, value, icon, trend, trendValue }: StatCardProps) {
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.25rem',
        boxShadow: '0 4px 12px var(--shadow)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{title}</p>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0' }}>
            {value}
          </h3>
          {trendValue && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
              <span
                style={{
                  color: trend === 'up' ? '#48bb78' : '#ef4444',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}