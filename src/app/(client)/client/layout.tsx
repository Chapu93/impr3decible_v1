import { ReactNode } from 'react'
import { ClientSidebar } from '@/components/client/Sidebar'
import { ClientHeader } from '@/components/client/Header'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Efectos de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <ClientSidebar />
      <div className="flex-1 flex flex-col relative">
        <ClientHeader />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
