import { useState } from 'react'
import { Card, Badge, Icon, Button } from '../components/ui'

const sections = [
  { id: 'profile',       icon: 'person',        label: 'My Profile' },
  { id: 'workspace',     icon: 'domain',        label: 'Workspace' },
  { id: 'billing',       icon: 'credit_card',   label: 'Billing & Plan' },
  { id: 'notifications', icon: 'notifications', label: 'Notifications' },
  { id: 'security',      icon: 'security',      label: 'Security' },
]

export default function Settings() {
  const [active, setActive] = useState('profile')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ─── Hero Section: Title + Metrics + 3 Figma Stat Cards ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.2fr)',
        gap: 20,
        alignItems: 'center',
      }}>
        {/* Left: Heading & Pill Metrics */}
        <div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            marginBottom: 16,
          }}>
            Settings & Preferences
          </h1>

          {/* Pill Metric Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Organization</span>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.25)',
              }}>
                Craftive Labs
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Current Tier</span>
              <div style={{
                background: 'var(--brand-100)',
                color: 'var(--brand-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                Growth Studio Plan
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Seats Allocated</span>
              <div style={{
                background: 'var(--green-50)',
                color: 'var(--green-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                5 of 10 Seats Used
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Security Score</span>
              <div style={{
                background: '#ffffff',
                padding: '6px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-xs)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: '96%', background: 'var(--brand-100)', opacity: 0.5,
                  borderRadius: 'var(--radius-pill)',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>96% Hardened</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3 Figma Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {/* Card 1: Plan Status */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--brand-500)', color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="verified" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Status</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              Pro Studio
            </div>
          </div>

          {/* Card 2: Renewal */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--brand-500)', color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="event_repeat" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Renewal</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              Nov 2026
            </div>
          </div>

          {/* Card 3: Storage */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--brand-500)', color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="cloud_done" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Storage</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              42 GB
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Grid: Settings Nav + Settings Panes ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'flex-start' }}>
        {/* Settings Navigation Sidebar */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '16px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {sections.map(s => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: isActive ? 'var(--brand-500)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(77, 50, 191, 0.25)' : 'none',
                }}
              >
                <Icon name={s.icon} size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {active === 'profile' && (
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  Personal Information
                </h2>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  Update your executive details, display name, and avatar.
                </p>
              </div>

              {/* Avatar Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 20, borderBottom: '1px solid var(--border-light)' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Profile"
                  style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #ffffff', boxShadow: 'var(--shadow-sm)' }}
                />
                <div>
                  <Button variant="soft" size="sm">
                    <Icon name="photo_camera" size={15} />
                    Upload Photo
                  </Button>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6 }}>
                    JPG, PNG or GIF · Recommended 400x400 px
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Full Name
                  </label>
                  <input
                    defaultValue="Jhon Harrison"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-light)', background: 'var(--bg-canvas)',
                      fontSize: 13, color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Job Role
                  </label>
                  <input
                    defaultValue="Founding Managing Partner"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-light)', background: 'var(--bg-canvas)',
                      fontSize: 13, color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Work Email
                  </label>
                  <input
                    defaultValue="jhon@craftivelabs.io"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-light)', background: 'var(--bg-canvas)',
                      fontSize: 13, color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Location & Timezone
                  </label>
                  <input
                    defaultValue="San Francisco, CA (PST UTC-7)"
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-light)', background: 'var(--bg-canvas)',
                      fontSize: 13, color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Executive Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Leading digital innovation and team workspace operations at Craftive Labs."
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)', background: 'var(--bg-canvas)',
                    fontSize: 13, color: 'var(--text-primary)', resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 10 }}>
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary" onClick={handleSave}>
                  {saved ? <><Icon name="check" size={16} /> Saved Changes</> : 'Save Changes'}
                </Button>
              </div>
            </Card>
          )}

          {active === 'billing' && (
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  Billing & Payment Methods
                </h2>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  Manage payment cards, invoice receipts, and workspace subscription.
                </p>
              </div>

              {/* Hand-Designed Figma Credit Card Preview */}
              <div style={{
                background: 'linear-gradient(135deg, #1f144d 0%, #3f28a3 50%, #4d32bf 100%)',
                borderRadius: 'var(--radius-xl)',
                padding: '28px',
                color: '#ffffff',
                width: 380,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 220,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.04em' }}>Craftive Corporate Card</span>
                  <Icon name="contactless" size={24} color="rgba(255,255,255,0.7)" />
                </div>

                <div style={{ fontSize: 20, letterSpacing: '0.18em', fontFamily: 'monospace', fontWeight: 600 }}>
                  •••• •••• •••• 8492
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Cardholder</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Jhon Harrison</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Expires</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>09 / 28</div>
                  </div>
                </div>
              </div>

              {/* Invoices */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
                  Recent Billing Invoices
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { id: 'INV-2026-009', date: 'Sep 1, 2026', amount: '$499.00', status: 'Paid' },
                    { id: 'INV-2026-008', date: 'Aug 1, 2026', amount: '$499.00', status: 'Paid' },
                    { id: 'INV-2026-007', date: 'Jul 1, 2026', amount: '$499.00', status: 'Paid' },
                  ].map(inv => (
                    <div key={inv.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-canvas)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Icon name="receipt_long" size={18} color="var(--brand-500)" />
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{inv.id}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{inv.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{inv.amount}</span>
                        <Badge label={inv.status} variant="success" />
                        <button style={{ background: 'none', border: 'none', color: 'var(--brand-500)', cursor: 'pointer' }}>
                          <Icon name="download" size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {active === 'notifications' && (
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  Notification Controls
                </h2>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  Manage instant alerts, team mentions, and digest frequencies.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Task Assigned', desc: 'Notify immediately when a sprint task is assigned to me', defaultOn: true },
                  { label: 'Project Status Shift', desc: 'Alert when a milestone moves from Planning to Active', defaultOn: true },
                  { label: 'Team Mentions', desc: 'Direct push alerts when someone @mentions your profile', defaultOn: true },
                  { label: 'Voice Huddle Rings', desc: 'Sound alert when a team voice huddle begins', defaultOn: false },
                  { label: 'Weekly Executive Summary', desc: 'Curated PDF report of startup progress sent on Mondays', defaultOn: true },
                ].map((item, idx) => (
                  <div key={item.label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 0', borderBottom: idx < 4 ? '1px solid var(--border-light)' : 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <ToggleSwitch defaultOn={item.defaultOn} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {(active === 'workspace' || active === 'security') && (
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  {active === 'workspace' ? 'Workspace Domain & Identity' : 'Security & Two-Factor Authentication'}
                </h2>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  {active === 'workspace' ? 'Configure custom domain, brand slug, and security policies.' : 'Manage hardware keys, sessions, and multi-factor login.'}
                </p>
              </div>

              <div style={{
                background: 'var(--bg-canvas)', borderRadius: 'var(--radius-lg)', padding: '20px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <Icon name="verified_user" size={24} color="var(--brand-500)" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                    Enterprise Security Active
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    All logins require hardware biometric token or authenticator code verification.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={handleSave}>
                  Save Settings
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(v => !v)}
      style={{
        width: 44,
        height: 26,
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--brand-500)' : 'var(--gray-300)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s ease',
        flexShrink: 0,
        boxShadow: on ? '0 2px 6px rgba(77, 50, 191, 0.3)' : 'none',
      }}
    >
      <span style={{
        position: 'absolute',
        top: 3,
        left: on ? 21 : 3,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#ffffff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s ease',
      }} />
    </button>
  )
}
