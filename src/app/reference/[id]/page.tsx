'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import { useParams } from 'next/navigation';

interface ReferenceArticle {
    id: string;
    title: string;
    content: string;
    category: string;
}

const mockArticles: Record<string, ReferenceArticle> = {
    'getting-started': {
        id: 'getting-started',
        title: 'Getting Started',
        content: `## Connect Your Wallet

To begin, connect your wallet using the button in the top-right corner. We support MetaMask, WalletConnect, and Rainbow Wallet.

## Navigate the Interface

- **Dashboard**: Overview of your assets and activity
- **Profile**: Manage your identity and settings
- **Audit Logs**: Track all your transactions
- **Reference**: Access documentation and guides

## Next Steps

Explore the interface and try performing a test transaction on a testnet.`,
        category: 'Basics',
    },
    'wallet-security': {
        id: 'wallet-security',
        title: 'Wallet Security',
        content: `## Private Keys

Never share your private key or seed phrase with anyone. Store them securely offline.

## Phishing Attacks

Always verify the URL of the website you're interacting with. Bookmark official links.

## Transaction Review

Always review transaction details before confirming. Check:
- Recipient address
- Amount
- Gas fees

## Recovery Plan

Ensure you have a backup of your seed phrase in multiple secure locations.`,
        category: 'Security',
    },
    'transaction-types': {
        id: 'transaction-types',
        title: 'Transaction Types',
        content: `## Transfers

Sending assets from one address to another. Requires gas fee.

## Swaps

Exchanging one token for another via decentralized exchanges (DEXs).

## Staking

Locking assets to support network operations and earn rewards.

## Governance

Voting on protocol proposals using governance tokens.

## NFT Interactions

Minting, buying, selling, and transferring NFTs.`,
        category: 'Basics',
    },
};

export default function R2() {
    const params = useParams();
    const id = params.id as string;
    const [article, setArticle] = useState<ReferenceArticle | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const found = mockArticles[id];
        if (found) {
            setArticle(found);
        } else {
            setNotFound(true);
        }
    }, [id]);

    if (notFound) {
        return (
            <div style={{ margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Article Not Found</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {`The article you're looking for doesn't exist.`}
                </p>
                <Link
                    href="/reference"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        marginTop: '1rem',
                    }}
                >
                    <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
                    Back to Reference
                </Link>
            </div>
        );
    }

    if (!article) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ color: 'var(--text-secondary)' }}>Loading...</div>
            </div>
        );
    }

    const renderMarkdown = (text: string) => {
        return text
            .split('\n')
            .map(line => {
                if (line.startsWith('## ')) {
                    return `<h2 style="margin: 1.5rem 0 1rem; font-size: 1.5rem; color: var(--text-primary);">${line.slice(3)}</h2>`;
                }
                if (line.startsWith('# ')) {
                    return `<h1 style="margin: 2rem 0 1.5rem; font-size: 2rem; color: var(--text-primary);">${line.slice(2)}</h1>`;
                }
                if (line.trim() === '') {
                    return '<p>&nbsp;</p>';
                }
                return `<p style="margin: 1rem 0; color: var(--text-secondary); line-height: 1.6;">${line}</p>`;
            })
            .join('');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link
                href="/reference"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                    fontSize: '0.95rem',
                }}
            >
                <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
                Back to Reference
            </Link>

            <Card>
                <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                    {article.title}
                </h1>
                <div
                    style={{ color: 'var(--text-primary)' }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
                />
            </Card>
        </div>
    );
}