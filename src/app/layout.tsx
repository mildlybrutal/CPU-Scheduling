import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { SchedulingProvider } from '@/context/SchedulingContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CPU Scheduling Simulator',
  description: 'A visual simulator for CPU scheduling algorithms including FCFS, SJF, Round Robin, and Priority Scheduling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SchedulingProvider>
          {children}
          <ToastContainer />
        </SchedulingProvider>
      </body>
    </html>
  )
}
