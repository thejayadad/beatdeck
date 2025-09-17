
import React from 'react'
import SideBar from '@/_components/sidebar/side-bar';
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=' h-full flex'>
        <SideBar />
        {children}
    </div>
  )
}

export default layout