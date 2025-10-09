'use client';

import { useState, useMemo } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface ReferenceArticle {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'security' | 'development' | 'ecosystem';
  href: string;
}

const referenceArticles: ReferenceArticle[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to connect your wallet and navigate the interface.',
    category: 'basics',
    href: '#',
  },
  {
    id: 'wallet-security',
    title: 'Wallet Security',
    description: 'Best practices for securing your private keys and assets.',
    category: 'security',
    href: '#',
  },
  {
    id: 'transaction-types',
    title: 'Transaction Types',
    description: 'Understand different actions: transfers, swaps, staking, and more.',
    category: 'basics',
    href: '#',
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contracts',
    description: 'How to interact with and deploy smart contracts securely.',
    category: 'development',
    href: '#',
  },
  {
    id: 'supported-networks',
    title: 'Supported Networks',
    description: 'List of blockchains and their configuration details.',
    category: 'ecosystem',
    href: '#',
  },
  {
    id: 'api-documentation',
    title: 'API Documentation',
    description: 'For developers: endpoints, rate limits, and examples.',
    category: 'development',
    href: '#',
  },
  {
    id: 'glossary',
    title: 'Glossary',
    description: 'Key terms: TVL, APR, gas fee, nonce, and more.',
    category: 'basics',
    href: '#',
  },
  {
    id: 'community-guides',
    title: 'Community Guides',
    description: 'Tutorials and walkthroughs from the community.',
    category: 'ecosystem',
    href: '#',
  },
];

const categories = {
  basics: { name: 'Basics', icon: BookOpenIcon, color: '#6366f1' },
  security: { name: 'Security', icon: ShieldCheckIcon, color: '#10b981' },
  development: { name: 'Development', icon: CodeBracketIcon, color: '#8b5cf6' },
  ecosystem: { name: 'Ecosystem', icon: GlobeAltIcon, color: '#ec4899' },
};

export default function ReferencePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return referenceArticles;
    return referenceArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedArticles = useMemo(() => {
    const groups: Record<string, ReferenceArticle[]> = {};
    filteredArticles.forEach(article => {
      if (!groups[article.category]) {
        groups[article.category] = [];
      }
      groups[article.category].push(article);
    });
    return groups;
  }, [filteredArticles]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Reference</h1>
        <div style={{ width: '300px' }}>
          <Input
            placeholder="Search articles..."
            icon={<MagnifyingGlassIcon style={{ width: '18px', height: '18px' }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {Object.entries(groupedArticles).map(([categoryKey, articles]) => {
        const category = categories[categoryKey as keyof typeof categories];
        const Icon = category.icon;

        return (
          <div key={categoryKey} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${category.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: category.color,
                }}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                {category.name}
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {articles.map(article => (
                <Card key={article.id} title={article.title}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {article.description}
                  </p>
                  <Link
                    href={article.href}
                    style={{
                      color: 'var(--accent)',
                      fontWeight: 500,
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    Read more →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}