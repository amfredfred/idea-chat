import { ReactNode } from 'react'
import NavigationBar from '../partials/NavigationBar'
// import FooterBar from '../partials/FooterBar'

export default function MasterLayout({ children }: { children: ReactNode }) {
  return (
    <div className='container  gap-5 mx-auto h-full flex-col flex overflow-hidden'>
      <NavigationBar />
      <div className="w-full h-full rounded-2xl overflow-hidden">
        {children}
      </div>
      {/* <FooterBar /> */}
    </div>
  )
}