'use client';

import "./../styles/globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            const disableContextMenu = (e: MouseEvent) => e.preventDefault();
            const disableSelectStart = (e: Event) => e.preventDefault();

            document.addEventListener('contextmenu', disableContextMenu);
            document.addEventListener('selectstart', disableSelectStart);
            document.addEventListener('dragstart', disableSelectStart);

            return () => {
                document.removeEventListener('contextmenu', disableContextMenu);
                document.removeEventListener('selectstart', disableSelectStart);
                document.removeEventListener('dragstart', disableSelectStart);
            };
        }
    }, []);
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#6366f1" />
                <meta name="msapplication-TileColor" content="#6366f1" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
            </head>
            <body>
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
            </body>
        </html>
    );
}