'use client';

import { formatEther } from 'viem';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Chart from '@/components/ui/Chart';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';

export default function ProfilePage() {
  const { address, isConnected, chain } = { address: '0xTest', isConnected: true, chain: { name: 'Test' } } // useAccount();
  const { data: balanceData, isLoading: isBalanceLoading } = { data: { value: BigInt(1000000000000000) }, isLoading: false } // useBalance({});

  const [transactions, setTransactions] = useState([[]]);

  useEffect(() => {
    if (isConnected && address) {
      setTransactions([[]
        // ,
        // ['0x8a3...f2c', '1.25 ETH', <Badge variant="success">Confirmed</Badge>, '2 min ago'],
        // ['0x1b4...a9e', '0.8 ETH', <Badge variant="warning">Pending</Badge>, '15 min ago'],
        // ['0x3c7...d1f', '3.1 ETH', <Badge variant="danger">Failed</Badge>, '1 hour ago'],
        // ['0x9e2...b8a', '0.45 ETH', <Badge variant="success">Confirmed</Badge>, '2 hours ago'],
        // ['0x4f1...c3d', '1.0 ETH', <Badge variant="success">Confirmed</Badge>, '1 day ago'],
      ])
    } else {
      setTransactions([]);
    }
  }, [isConnected, address]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
        {isConnected ? 'My Profile' : 'Connect Your Wallet'}
      </h1>

      <Card title="Wallet Information">
        {!isConnected ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Connect your wallet to view your profile and activity.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Address</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, wordBreak: 'break-all' }}>
                {address}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Network</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {chain?.name || 'Unknown'}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>ETH Balance</p>
              {isBalanceLoading ? (
                <Skeleton width="80px" height="1.2rem" />
              ) : (
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {balanceData ? `${parseFloat(formatEther(balanceData.value)).toFixed(4)} ETH` : '—'}
                </p>
              )}
            </div>
          </div>
        )}
      </Card>

      <Card title="Activity Overview" style={{ marginTop: '2rem' }}>
        <Chart title="Last 6 Months" height={300} />
      </Card>

      <Card title="Recent Transactions" style={{ marginTop: '2rem' }}>
        <Table
          headers={['Transaction', 'Amount', 'Status', 'Time']}
          rows={transactions}
          sortable
          filterable
          filterColumnIndex={2}
          pageSize={5}
        />
      </Card>
    </div>
  );
}