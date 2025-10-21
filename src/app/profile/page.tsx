'use client';

// import { formatEther } from 'viem';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Chart from '@/components/ui/Chart';
import Table from '@/components/ui/Table';
import Skeleton from '@/components/ui/Skeleton';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function P1() {
  const { address, isConnected, chain } = { address: '0x18b9529865D47cc2A20Ba61095609D10Dd637722', isConnected: true, chain: { name: 'ETH' } } // useAccount();
  const { data: balanceData, isLoading: isBalanceLoading } = { data: { value: BigInt(999999999999999) }, isLoading: false } // useBalance({});

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Mikhail Landau',
    email: 'mi_landau@outlook.com',
    bio: 'Web3 builder & digital sovereignty advocate.',
  });

  const [mockRows, setMockRows] = useState<(string | number | React.ReactNode)[][]>([]);

  useEffect(() => {
    const generateMockRows = () => {
      return Array.from({ length: 25 }, (_, i) => [
        `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        `${(Math.random() * 10).toFixed(2)} ETH`,
        i % 3 === 0 ? <Badge variant="success">Confirmed</Badge> :
          i % 3 === 1 ? <Badge variant="warning">Pending</Badge> :
            <Badge variant="danger">Failed</Badge>,
        `${Math.floor(Math.random() * 60)} min ago`,
      ]);
    };

    setMockRows(generateMockRows());
  }, []);

  const handleSave = () => {
    console.log('Saved:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: 'Mikhail Landau',
      email: 'mi_landau@outlook.com',
      bio: 'Web3 builder & digital sovereignty advocate.',
    });
    setIsEditing(false);
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          {isConnected ? 'My Profile' : 'Connect Your Wallet'}
        </h1>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <Card>
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {isConnected ? address?.slice(0, 2).toUpperCase() : '?'}
            </div>

            {!isConnected ? (
              <p style={{ color: 'var(--text-secondary)' }}>
                Connect your wallet to view your profile.
              </p>
            ) : (
              <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                    Address
                  </p>
                  <p
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      wordBreak: 'break-all',
                      fontSize: '0.95rem',
                    }}
                  >
                    {address}
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                    Network
                  </p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>
                    {chain?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                    ETH Balance
                  </p>
                  {isBalanceLoading ? (
                    <Skeleton width="80px" height="1.2rem" />
                  ) : (
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>
                      {balanceData ? `${BigInt(999999999999999)} ETH` : '—'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Profile Settings">
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    minHeight: '80px',
                    resize: 'vertical',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                  Full Name
                </p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{formData.name}</p>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                  Email
                </p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{formData.email}</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                  Bio
                </p>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{formData.bio}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant={'secondary'} onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card title="Activity Overview" style={{ marginBottom: '2rem' }}>
        <Chart title="Last 6 Months" height={300} />
      </Card>

      <Card title="Recent Transactions">
        <Table
          headers={['Transaction', 'Amount', 'Status', 'Time']}
          rows={mockRows}
          sortable
          filterable
          filterColumnIndex={2}
          pageSize={5}
        />
      </Card>
    </div>
  );
}