import './globals.css'
import { Inter } from 'next/font/google'
import AppBar from "@/app/components/AppBar"
import Providers from "@/app/components/Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NTU nurse',
  description: 'Ying-Kai Liao Provided',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppBar />
          <div className={"min-h-screen"}>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
