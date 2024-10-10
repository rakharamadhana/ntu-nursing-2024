import './globals.css';
import { Inter } from 'next/font/google';
import AppBar from "@/components/AppBar";
import Providers from "@/components/Providers";
import type { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'NTU Nurse',
    description: 'Ying-Kai Liao Provided | Modified by Rakha Ramadhana',
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["ntu-nurse"],
}
export const viewport: Viewport = {
    width: 'device-width',
    minimumScale: 1,
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className + " bg-slate-200"}>
        <Providers>
            <AppBar />
            <div className={"min-h-screen"}>{children}</div>
        </Providers>
        </body>
        </html>
    );
}
