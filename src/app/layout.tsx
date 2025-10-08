import type { Metadata } from "next";
import "./../styles/globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
    title: "Web3 Template",
    description: "Minimal Web3 frontend starter",
};

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