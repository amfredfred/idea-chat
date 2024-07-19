import { ReactNode } from 'react'

export default function MasterLayout({ children }: { children: ReactNode }) {
  return (
    <div className='container  gap-5 mx-auto h-full flex-col flex overflow-hidden'>
      <div className="w-full h-full rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}