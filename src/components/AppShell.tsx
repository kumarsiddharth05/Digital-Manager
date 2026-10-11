import type { ReactNode } from 'react'
import TopBar from './TopBar'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      background: 'var(--bg-canvas)',
    }}>
      <TopBar />
      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: 1480,
        margin: '0 auto',
        padding: '0 32px 40px',
      }}>
        {children}
      </main>
    </div>
  )
}
