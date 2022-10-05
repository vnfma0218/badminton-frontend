import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <div className='pt-11 max-w-5xl m-auto'>{children}</div>
}

export default Layout
