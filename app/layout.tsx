import './globals.css'
import { Inter } from 'next/font/google'
import AppBar from "@/components/AppBar"
import Providers from "@/components/Providers"

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
      <body className={inter.className + " bg-slate-200"}>
        <Providers>
          <AppBar />
          <div className={"min-h-screen"}>{children}</div>
          <div className='flex justify-center bg-slate-50 rounded-t-lg p-2 w-auto mx-[30vw]'>承英科技 2023</div>
        </Providers>
      </body>
    </html>
  )
}
