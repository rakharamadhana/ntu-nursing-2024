import './globals.css';
import { Inter } from 'next/font/google';
import AppBar from "@/components/AppBar";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'NTU Nurse',
    description: 'Ying-Kai Liao Provided | Modified by Rakha Ramadhana',
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["ntu-nurse"],
    viewport:
        "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

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
