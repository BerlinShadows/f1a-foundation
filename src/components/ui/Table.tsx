import React, { useState, useMemo, useCallback } from 'react';

interface TableProps {
    headers: string[];
    rows: (string | number | React.ReactNode)[][];
    pageSize?: number;
    sortable?: boolean;
    filterable?: boolean;
    filterColumnIndex?: number;
}

export default function Table2({
    headers,
    rows: originalRows,
    pageSize = 10,
    sortable = false,
    filterable = false,
    filterColumnIndex = 2,
}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: number; direction: 'asc' | 'desc' } | null>(null);
    const [filterValue, setFilterValue] = useState<string>('all');

    const getTextFromCell = useCallback((cell: string | number | React.ReactNode): string => {
        if (typeof cell === 'string' || typeof cell === 'number') {
            return String(cell);
        }
        if (React.isValidElement(cell)) {
            const element = cell as React.ReactElement<{ children?: React.ReactNode }>;
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
    }, []);

    const filteredRows = useMemo(() => {
        if (!filterable || filterValue === 'all') return originalRows;
        return originalRows.filter(row => {
            const cell = row[filterColumnIndex];
            const text = getTextFromCell(cell);
            return text.toLowerCase().includes(filterValue.toLowerCase());
        });
    }, [originalRows, filterable, filterValue, filterColumnIndex, getTextFromCell]);

    const sortedRows = useMemo(() => {
        if (!sortable || !sortConfig) return filteredRows;
        const { key, direction } = sortConfig;
        return [...filteredRows].sort((a, b) => {
            const aVal = getTextFromCell(a[key]);
            const bVal = getTextFromCell(b[key]);
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return 0;
        });
    }, [filteredRows, sortable, sortConfig, getTextFromCell]);

    const totalPages = Math.ceil(sortedRows.length / pageSize);
    const paginatedRows = sortedRows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const filterOptions = useMemo(() => {
        if (!filterable) return [];
        const values = new Set<string>();
        originalRows.forEach(row => {
            const cell = row[filterColumnIndex];
            const text = getTextFromCell(cell);
            if (text) values.add(text);
        });
        return ['all', ...Array.from(values)];
    }, [originalRows, filterable, filterColumnIndex, getTextFromCell]);

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

    return (
        <div
            style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                overflow: 'hidden',
            }}
        >
            {filterable && (
                <div
                    style={{
                        padding: '1rem 1.25rem',
                        borderBottom: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
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

            <div style={{
                overflowX: 'auto',
                maxHeight: '60vh',
                borderRadius: '0 0 12px 12px',
                border: '1px solid var(--border)',
                borderTop: 'none',
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr>
                            {headers.map((header, i) => (
                                <th
                                    key={`header-${i}`}
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
            </div>

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