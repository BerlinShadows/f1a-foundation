'use client';

import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultActive?: string;
}

export default function Tabs({ tabs, defaultActive = tabs[0]?.id }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultActive);

    return (
        <div style={{ width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    borderBottom: '1px solid var(--border)',
                    marginBottom: '1.5rem',
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: 'transparent',
                            border: 'none',
                            color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab.id ? 600 : 400,
                            cursor: 'pointer',
                            position: 'relative',
                            fontSize: '0.95rem',
                        }}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: '-1px',
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'var(--accent)',
                                    borderRadius: '2px',
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>
            <div>
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}