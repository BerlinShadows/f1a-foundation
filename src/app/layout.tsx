'use client';

import "./../styles/globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/wagmi";
import '@rainbow-me/rainbowkit/styles.css';

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <WagmiProvider config={config}>
                    <QueryClientProvider client={new QueryClient()}>
                        <RainbowKitProvider>
                            <Header />
                            <main
                                style={{
                                    flex: 1,
                                    padding: "2rem 1.5rem",
                                    maxWidth: "1200px",
                                    margin: "0 auto",
                                    width: "100%",
                                }}
                            >
                                {children}
                            </main>
                            <Footer />
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}