import './globals.css'
import { Inter } from 'next/font/google'
import AppBar from "@/components/AppBar"
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NTU Nurse',
  description: 'Ying-Kai Liao Provided | Modified by Rakha Ramadhana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Log server-side environment variables
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-200"}>
        <Providers>
          <AppBar />
          <div className={"min-h-screen"}>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
