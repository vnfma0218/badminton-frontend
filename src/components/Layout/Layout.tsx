import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div data-theme='pastel' className='h-screen container md:mx-auto m-auto'>
      {children}
    </div>
  )
}

export default Layout
