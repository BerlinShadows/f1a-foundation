import Card from '@/components/ui/Card';
import Link from 'next/link';

const referenceItems = [
  {
    title: 'Getting Started',
    description: 'Learn how to connect your wallet and navigate the interface.',
    href: '#',
  },
  {
    title: 'Transaction Types',
    description: 'Understand different actions: transfers, swaps, staking, and more.',
    href: '#',
  },
  {
    title: 'Security Best Practices',
    description: 'How to keep your assets safe in Web3 environments.',
    href: '#',
  },
  {
    title: 'Supported Networks',
    description: 'List of blockchains and their configuration details.',
    href: '#',
  },
  {
    title: 'API Documentation',
    description: 'For developers: endpoints, rate limits, and examples.',
    href: '#',
  },
  {
    title: 'Glossary',
    description: 'Key terms: TVL, APR, gas fee, nonce, and more.',
    href: '#',
  },
];

export default function ReferencePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', height: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Reference</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {referenceItems.map((item, i) => (
          <Card key={i} title={item.title}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {item.description}
            </p>
            <Link
              href={item.href}
              style={{
                color: 'var(--accent)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              Read more →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}