"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
// Provider goes to the layout
const Provider = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider