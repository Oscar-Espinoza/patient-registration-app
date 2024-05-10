import { Card } from '@mui/material'
import React from 'react'

function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className='container'>
      <Card sx={{ maxWidth: 700}} className='card'>
        {children}
      </Card>
    </div>
  )
}

export default Layout