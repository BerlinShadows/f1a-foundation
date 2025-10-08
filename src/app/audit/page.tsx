'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
// import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

const mockLogs = [[]
  // ['0x8a3f...f2c1', 'Transfer', '0.5 ETH', <Badge variant="success">Success</Badge>, '2024-06-10 14:22:01'],
  // ['0x1b4a...a9e3', 'Approve', 'USDC', <Badge variant="warning">Pending</Badge>, '2024-06-10 13:45:18'],
  // ['0x3c7d...d1f5', 'Swap', '1.2 ETH → 2400 USDC', <Badge variant="danger">Failed</Badge>, '2024-06-10 12:30:05'],
  // ['0x9e2b...b8a7', 'Mint NFT', 'Collection #42', <Badge variant="success">Success</Badge>, '2024-06-09 22:15:33'],
  // ['0x4f1c...c3d9', 'Stake', '5.0 ETH', <Badge variant="success">Success</Badge>, '2024-06-09 18:02:47'],
];

export default function AuditPage() {
  const [search, setSearch] = useState('');

  const filteredLogs = mockLogs.filter(row =>
    row.some((cell: string | number | React.ReactNode) => {
      if (typeof cell === 'string' || typeof cell === 'number') {
        return String(cell);
      }

      if (React.isValidElement(cell)) {
        const element = cell as React.ReactElement<{ children?: React.ReactNode }>;
        const children = element.props.children;

        if (typeof children === 'string' || typeof children === 'number') {
          return String(children);
        }
      }

      return '';
    })
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Audit Logs</h1>
        <div style={{ width: '300px' }}>
          <Input
            placeholder="Search logs..."
            icon={<MagnifyingGlassIcon style={{ width: '18px', height: '18px' }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <Table
          headers={['Transaction', 'Action', 'Details', 'Status', 'Timestamp']}
          rows={filteredLogs}
          sortable
          filterable
          filterColumnIndex={3}
          pageSize={10}
        />
      </Card>
    </div>
  );
}