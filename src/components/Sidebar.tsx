import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  MessageSquare,
  Settings,
  Zap,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks',     icon: CheckSquare,     label: 'Tasks' },
  { to: '/projects',  icon: FolderKanban,    label: 'Projects' },
  { to: '/employees', icon: Users,           label: 'Employees' },
  { to: '/chat',      icon: MessageSquare,   label: 'Team Chat' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside
      style={{
        width: 'var(--sidebar-w)',
        minWidth: 'var(--sidebar-w)',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(69,96,247,0.35)',
        }}>
          <Zap size={18} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>DigitalMgr</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>Workspace</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0 8px 8px' }}>
          Main Menu
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname.startsWith(to)
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: active ? 600 : 400,
                    fontSize: 13.5,
                    color: active ? 'var(--brand-600)' : 'var(--text-secondary)',
                    background: active ? 'var(--brand-50)' : 'transparent',
                    transition: 'all 0.15s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--gray-100)'
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  <Icon
                    size={17}
                    strokeWidth={active ? 2.2 : 1.8}
                    style={{ color: active ? 'var(--brand-500)' : 'var(--gray-400)', flexShrink: 0 }}
                  />
                  {label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <div style={{ height: 1, background: 'var(--border-light)', margin: '16px 8px 12px' }} />
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0 8px 8px' }}>
          Settings
        </div>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <NavLink
              to="/settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                fontWeight: location.pathname === '/settings' ? 600 : 400,
                fontSize: 13.5,
                color: location.pathname === '/settings' ? 'var(--brand-600)' : 'var(--text-secondary)',
                background: location.pathname === '/settings' ? 'var(--brand-50)' : 'transparent',
                transition: 'all 0.15s',
                textDecoration: 'none',
              }}
            >
              <Settings
                size={17}
                strokeWidth={location.pathname === '/settings' ? 2.2 : 1.8}
                style={{ color: location.pathname === '/settings' ? 'var(--brand-500)' : 'var(--gray-400)' }}
              />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* User footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
        }}>
          AP
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Aisha Patel
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>CEO</div>
        </div>
      </div>
    </aside>
  )
}
