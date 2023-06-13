import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineDashboard } from "react-icons/ai"

export default function Home() {
  return (
    <div className='flex flex-col items-center p-10 text-4xl gap-4'>
      <Link href="/dashboard">
        <AiOutlineDashboard />
      </Link>
    </div>
  )
}
