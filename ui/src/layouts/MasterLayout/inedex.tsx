import { ReactNode } from 'react'

export default function MasterLayout({ children }: { children: ReactNode }) {
  return (
    <div className=' container md bg-black mx-auto h-full'>
      {children}
    </div>
  )
}
