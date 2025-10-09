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
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#6366f1" />
                <meta name="msapplication-TileColor" content="#6366f1" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
            </head>
            <body>
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