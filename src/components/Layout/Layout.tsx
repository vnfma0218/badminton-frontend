import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <div className='container md:mx-auto pt-11'>{children}</div>
}

export default Layout
