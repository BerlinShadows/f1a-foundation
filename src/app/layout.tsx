// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Reimagine Ownership",
        template: "%s | Reimagine Ownership",
    },
    description: "A new paradigm for digital identity, assets, and collaboration — built on transparency, user sovereignty, and open protocols.",
    keywords: "web3, blockchain, decentralization, digital ownership, identity",
    authors: [{ name: "Protocol Labs", url: "https://t.me/mi_landau" }],
    creator: "Protocol Labs",
    publisher: "Protocol Labs",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://f1a-foundation.vercel.app/",
        title: "Reimagine Ownership",
        description: "A new paradigm for digital identity, assets, and collaboration.",
        images: [
        ],
    },
    icons: {
        icon: [
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon.ico",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#6366f1" />
            </head>
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}