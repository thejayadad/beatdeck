
import React from 'react'
import SideBar from '@/_components/sidebar/side-bar';
import TopHeader from '@/_components/header/top-header';
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=' h-full flex'>
        <SideBar />
      <div className="flex-1 min-w-0 flex flex-col">
          <TopHeader />
        <main className="overflow-y-auto p-6 space-y-8 pb-24 lg:pb-6">
            {children}
         </main>
        </div>
    </div>
  )
}

export default layout