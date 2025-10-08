import { FunnelIcon } from '@heroicons/react/24/outline';
import React, { useState, useMemo } from 'react';

interface TableProps {
    headers: string[];
    rows: (string | number | React.ReactNode)[][];
    pageSize?: number;
    sortable?: boolean;
    filterable?: boolean;
    filterColumnIndex?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Table({
    headers,
    rows: originalRows,
    pageSize = 10,
    sortable = false,
    filterable = false,
    filterColumnIndex = 2,
    className = '',
    style,
}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: number; direction: 'asc' | 'desc' } | null>(null);
    const [filterValue, setFilterValue] = useState<string>('all');

    const getTextFromCell = (cell: any): string => {
        if (typeof cell === 'string' || typeof cell === 'number') {
            return String(cell);
        }

        if (React.isValidElement(cell)) {
            const element = cell as React.ReactElement<{ children?: any }>;
            const children = element.props.children;

            if (typeof children === 'string' || typeof children === 'number') {
                return String(children);
            }

            if (Array.isArray(children)) {
                return children.map(getTextFromCell).join(' ');
            }

            if (React.isValidElement(children)) {
                return getTextFromCell(children);
            }
        }

        return '';
    };

    const filteredRows = useMemo(() => {
        if (!filterable || filterValue === 'all') return originalRows;
        return originalRows.filter(row => {
            const cell = row[filterColumnIndex];
            const text = getTextFromCell(cell);
            return text.toLowerCase().includes(filterValue.toLowerCase());
        });
    }, [originalRows, filterable, filterValue, filterColumnIndex]);

    const sortedRows = useMemo(() => {
        if (!sortable || !sortConfig) return filteredRows;

        const { key, direction } = sortConfig;
        return [...filteredRows].sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            aVal = getTextFromCell(aVal);
            bVal = getTextFromCell(bVal);

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return 0;
        });
    }, [filteredRows, sortable, sortConfig]);

    const totalPages = Math.ceil(sortedRows.length / pageSize);
    const paginatedRows = sortedRows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (columnIndex: number) => {
        if (!sortable) return;
        setSortConfig(prev => {
            if (prev?.key === columnIndex) {
                return { key: columnIndex, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key: columnIndex, direction: 'asc' };
        });
    };

    const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    const filterOptions = useMemo(() => {
        if (!filterable) return [];
        const values = new Set<string>();
        originalRows.forEach(row => {
            const cell = row[filterColumnIndex];
            const text = getTextFromCell(cell);
            if (text) values.add(text);
        });
        return ['all', ...Array.from(values)];
    }, [originalRows, filterable, filterColumnIndex]);

    return (
        <div
            style={{
                width: '100%',
                overflowX: 'auto',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                ...style,
            }}
        >
            {filterable && (
                <div style={{
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                }}>
                    <FunnelIcon style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }} />
                    <label style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                    }}>
                        Filter by status:
                    </label>
                    <select
                        value={filterValue}
                        onChange={(e) => {
                            setFilterValue(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            minWidth: '120px',
                            maxWidth: '200px',
                            cursor: 'pointer',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                        }}
                    >
                        {filterOptions.map(option => (
                            <option key={option} value={option}>
                                {option === 'all' ? 'All' : option}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '600px',
                }}
            >
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th
                                key={i}
                                onClick={() => handleSort(i)}
                                style={{
                                    padding: '1rem 1.25rem',
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderBottom: '1px solid var(--border)',
                                    cursor: sortable ? 'pointer' : 'default',
                                    userSelect: 'none',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                }}
                            >
                                {header}
                                {sortable && sortConfig?.key === i && (
                                    <span style={{ fontSize: '0.85rem' }}>
                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedRows.map((row, i) => (
                        <tr
                            key={`row-${i}`}
                            style={{ borderBottom: i === paginatedRows.length - 1 ? 'none' : '1px solid var(--border)' }}
                        >
                            {row.map((cell, j) => (
                                <td
                                    key={j}
                                    style={{
                                        padding: '1rem 1.25rem',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem',
                        borderTop: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-secondary)',
                    }}
                >
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            marginRight: '0.5rem',
                            opacity: currentPage === 1 ? 0.5 : 1,
                        }}
                    >
                        ←
                    </button>
                    <span style={{ color: 'var(--text-primary)', margin: '0 0.5rem' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            marginLeft: '0.5rem',
                            opacity: currentPage === totalPages ? 0.5 : 1,
                        }}
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
}