import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from './ui'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/employees', label: 'People' },
  { to: '/tasks',     label: 'Tasks' },
  { to: '/projects',  label: 'Projects' },
  { to: '/chat',      label: 'Apps' },
  { to: '/settings',  label: 'Settings' },
]

export default function TopBar() {
  const navigate = useNavigate()
  const [showNotif, setShowNotif] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  return (
    <header style={{
      width: '100%',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'transparent',
      zIndex: 50,
      position: 'relative',
    }}>
      {/* Brand Logo */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: 'var(--brand-500)',
          fontFamily: 'var(--font-sans)',
        }}>
          Craftive Labs
        </span>
      </div>

      {/* Center Floating Capsule Navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: '#ffffff',
        padding: '6px 8px',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-light)',
      }}>
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: isActive ? '8px 18px' : '8px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              background: isActive ? 'var(--brand-500)' : 'transparent',
              transition: 'all 0.18s ease',
              textDecoration: 'none',
              boxShadow: isActive ? '0 2px 8px rgba(77, 50, 191, 0.3)' : 'none',
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'inline-block',
                  }} />
                )}
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Right Controls: Search, Settings, Notifications, Profile (Google Material Icons) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Quick Search toggle */}
        <div style={{ position: 'relative' }}>
          {showSearch ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 12px',
              border: '1px solid var(--brand-300)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <Icon name="search" size={18} color="var(--brand-500)" style={{ marginRight: 6 }} />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 12.5,
                  width: 130,
                  color: 'var(--text-primary)',
                }}
              />
              <button
                onClick={() => { setShowSearch(false); setSearchVal('') }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex' }}
              >
                <Icon name="close" size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              title="Search"
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-500)'; e.currentTarget.style.borderColor = 'var(--brand-300)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-light)' }}
            >
              <Icon name="search" size={18} />
            </button>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={() => navigate('/settings')}
          title="Settings"
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-500)'; e.currentTarget.style.borderColor = 'var(--brand-300)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-light)' }}
        >
          <Icon name="settings" size={18} />
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotif(v => !v)}
            title="Notifications"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              boxShadow: 'var(--shadow-xs)',
              position: 'relative',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-500)'; e.currentTarget.style.borderColor = 'var(--brand-300)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-light)' }}
          >
            <Icon name="notifications" size={18} />
            <span style={{
              position: 'absolute',
              top: 8,
              right: 9,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--brand-500)',
            }} />
          </button>

          {showNotif && (
            <div style={{
              position: 'absolute',
              top: 46,
              right: 0,
              width: 280,
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-light)',
              padding: '14px',
              zIndex: 100,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</span>
                <span style={{ fontSize: 11, color: 'var(--brand-500)', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-500)', marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div><strong>Lara</strong> updated onboarding schedule</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>10m ago</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-500)', marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div>MacBook Air M1 assigned to new hire</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>1h ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div
          onClick={() => navigate('/settings')}
          style={{
            cursor: 'pointer',
            border: '2px solid #ffffff',
            borderRadius: '50%',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
            width: 38,
            height: 38,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Jhon"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </header>
  )
}
