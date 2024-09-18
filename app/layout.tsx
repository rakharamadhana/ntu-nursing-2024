import './globals.css';
import { Inter } from 'next/font/google';
import AppBar from "@/components/AppBar";
import Providers from "@/components/Providers";
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'NTU Nurse',
    description: 'Ying-Kai Liao Provided | Modified by Rakha Ramadhana',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <link rel="manifest" href="/manifest.json" />
        </Head>
        <body className={inter.className + " bg-slate-200"}>
        <Providers>
            <AppBar />
            <div className={"min-h-screen"}>{children}</div>
        </Providers>
        </body>
        </html>
    );
}
