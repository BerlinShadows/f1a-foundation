'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Input from '@/components/ui/Input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const mockLogs = [
  {
    txHash: '0x8a3f...f2c1',
    action: 'Transfer',
    details: '0.5 ETH',
    status: 'Success',
    timestamp: '2024-06-10 14:22:01',
  },
  {
    txHash: '0x1b4a...a9e3',
    action: 'Approve',
    details: 'USDC',
    status: 'Pending',
    timestamp: '2024-06-10 13:45:18',
  },
  {
    txHash: '0x3c7d...d1f5',
    action: 'Swap',
    details: '1.2 ETH → 2400 USDC',
    status: 'Failed',
    timestamp: '2024-06-10 12:30:05',
  },
  {
    txHash: '0x9e2b...b8a7',
    action: 'Mint NFT',
    details: 'Collection #42',
    status: 'Success',
    timestamp: '2024-06-09 22:15:33',
  },
  {
    txHash: '0x4f1c...c3d9',
    action: 'Stake',
    details: '5.0 ETH',
    status: 'Success',
    timestamp: '2024-06-09 18:02:47',
  },
  {
    txHash: '0x2a8e...e7b2',
    action: 'Claim',
    details: 'Rewards',
    status: 'Success',
    timestamp: '2024-06-08 10:11:22',
  },
];

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');

  const actions = ['all', ...new Set(mockLogs.map(log => log.action))];

  const filteredLogs = useMemo(() => {
    return mockLogs.filter(log => {
      const matchesSearch =
        log.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAction = selectedAction === 'all' || log.action === selectedAction;
      return matchesSearch && matchesAction;
    });
  }, [searchQuery, selectedAction]);

  const stats = {
    total: mockLogs.length,
    success: mockLogs.filter(log => log.status === 'Success').length,
    failed: mockLogs.filter(log => log.status === 'Failed').length,
    pending: mockLogs.filter(log => log.status === 'Pending').length,
  };

  const tableRows = filteredLogs.map(log => [
    log.txHash,
    log.action,
    log.details,
    <Badge
      key={log.txHash}
      variant={
        log.status === 'Success' ? 'success' :
          log.status === 'Failed' ? 'danger' : 'warning'
      }
    >
      {log.status}
    </Badge>,
    log.timestamp,
  ]);

  return (
    <div style={{ margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Audit Logs</h1>
      </div>

      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.total}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Total Logs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#48bb78' }}>{stats.success}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Success</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f56565' }}>{stats.failed}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Failed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ecc94b' }}>{stats.pending}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Pending</div>
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <Input
              placeholder="Search by hash or details..."
              icon={<MagnifyingGlassIcon style={{ width: '18px', height: '18px' }} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ minWidth: '200px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
              }}
            >
              Action Type
            </label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
              }}
            >
              {actions.map(action => (
                <option key={action} value={action}>
                  {action === 'all' ? 'All Actions' : action}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedAction('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <Table
          headers={['Transaction Hash', 'Action', 'Details', 'Status', 'Timestamp']}
          rows={tableRows}
          sortable
          filterable={false}
          pageSize={10}
        />
      </Card>
    </div>
  );
}