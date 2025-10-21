'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Ecosystem', href: '/reference' },
  { name: 'Identity', href: '/profile' },
  { name: 'Activity', href: '/audit' },
  { name: 'Games', href: '/games' }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: 'var(--header-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--header-border)',
        padding: '0.8rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        width: '100%',
        minWidth: '100vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          gap: '0.8rem',
        }}
      >
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--accent), var(--gradient-end))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <Link
            href={'/'}
          >
            Web3<span style={{ opacity: 0.5 }}>Template</span>
          </Link>
        </div>

        <nav>
          <ul
            style={{
              display: 'flex',
              gap: '1.4rem',
              alignItems: 'center',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flexWrap: 'wrap',
              justifyContent: 'center',
              minWidth: 0,
            }}
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="header-nav-link"
                  href={item.href}
                  style={{
                    color: pathname === item.href ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: pathname === item.href ? '600' : '400',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--accent)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>

    </header >
  );
}