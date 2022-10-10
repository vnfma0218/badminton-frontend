import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div data-theme='pastel' className='h-screen mb-40'>
      {children}
    </div>
  )
}

export default Layout
