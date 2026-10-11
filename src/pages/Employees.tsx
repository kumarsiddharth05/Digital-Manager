import { useState } from 'react'
import { Card, Badge, Avatar, Icon, Button, ActionArrowButton, ProgressBar } from '../components/ui'
import { employees, tasks } from '../data/mockData'
import type { Employee, EmployeeStatus } from '../data/mockData'

const getTasksCount = (empId: string) => tasks.filter(t => t.assigneeId === empId).length

const employeePhotos: Record<string, string> = {
  'emp-1': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80', // Aisha Patel
  'emp-2': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', // Sofia Rivera
  'emp-3': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80', // Marcus Chen
  'emp-4': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80', // James Okafor
  'emp-5': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80', // Priya Nair
}

const employeeComp: Record<string, string> = {
  'emp-1': '$165,000',
  'emp-2': '$135,000',
  'emp-3': '$155,000',
  'emp-4': '$125,000',
  'emp-5': '$110,000',
}

const employeeSkills: Record<string, string[]> = {
  'emp-1': ['Strategy', 'Founding', 'Venture', 'Product Ops'],
  'emp-2': ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'],
  'emp-3': ['Architecture', 'Node.js', 'Go', 'PostgreSQL', 'AWS'],
  'emp-4': ['React', 'TypeScript', 'Tailwind', 'Performance'],
  'emp-5': ['Growth', 'Lifecycle', 'Analytics', 'Content Strategy'],
}

const statusVariant: Record<EmployeeStatus, 'success' | 'danger' | 'warning' | 'muted'> = {
  online:  'success',
  busy:    'danger',
  away:    'warning',
  offline: 'muted',
}

export default function Employees() {
  const [selectedDept, setSelectedDept] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeEmp, setActiveEmp] = useState<Employee>(employees[0])
  const [messageRecipient, setMessageRecipient] = useState<Employee | null>(null)
  const [messageText, setMessageText] = useState('')
  const [sentSuccess, setSentSuccess] = useState(false)

  const filtered = employees.filter(e => {
    const matchesDept = selectedDept === 'all' || e.department.toLowerCase() === selectedDept.toLowerCase()
    const matchesQuery = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesQuery
  })

  const onlineCount = employees.filter(e => e.status === 'online').length
  const busyCount   = employees.filter(e => e.status === 'busy').length
  const awayCount   = employees.filter(e => e.status === 'away').length

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    setSentSuccess(true)
    setTimeout(() => {
      setSentSuccess(false)
      setMessageRecipient(null)
      setMessageText('')
    }, 1200)
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
            Team & Talent
          </h1>

          {/* Pill Metric Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Members</span>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.25)',
              }}>
                5 Active
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Online Now</span>
              <div style={{
                background: 'var(--green-50)',
                color: 'var(--green-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                {onlineCount} Online
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Focus Status</span>
              <div style={{
                background: 'var(--red-50)',
                color: 'var(--red-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                {busyCount} Busy • {awayCount} Away
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Capacity</span>
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
                  width: '84%', background: 'var(--brand-100)', opacity: 0.5,
                  borderRadius: 'var(--radius-pill)',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>84% Allocated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3 Figma Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {/* Card 1: Team Capacity */}
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
                <Icon name="speed" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Capacity</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              84%
            </div>
          </div>

          {/* Card 2: Monthly Payroll */}
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
                <Icon name="payments" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Payroll</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              $57.5k
            </div>
          </div>

          {/* Card 3: Open Roles */}
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
                <Icon name="person_add" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Hiring</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              2 Roles
            </div>
          </div>
        </div>
      </div>

      {/* ─── Controls: Search & Department Capsule Filters ─── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        {/* Search Input pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#ffffff',
          borderRadius: 'var(--radius-pill)',
          padding: '8px 18px',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-light)',
          minWidth: 260,
        }}>
          <Icon name="search" size={18} color="var(--brand-500)" />
          <input
            type="text"
            placeholder="Search by name, role, skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 13,
              color: 'var(--text-primary)',
              width: '100%',
            }}
          />
        </div>

        {/* Department Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#ffffff',
          padding: '4px 6px',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-light)',
        }}>
          {['all', 'Leadership', 'Engineering', 'Design', 'Marketing'].map(dept => {
            const active = selectedDept === dept
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: 12.5,
                  fontWeight: active ? 700 : 500,
                  background: active ? 'var(--brand-500)' : 'transparent',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: active ? '0 2px 6px rgba(77, 50, 191, 0.25)' : 'none',
                }}
              >
                {dept === 'all' ? 'All Members' : dept}
              </button>
            )
          })}
        </div>

        {/* Invite Member Action */}
        <Button
          variant="primary"
          onClick={() => alert('Invite link copied: https://craftivelabs.internal/invite/token-9812')}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Icon name="add" size={16} />
          Invite Member
        </Button>
      </div>

      {/* ─── Main Content: Featured Spotlight + Talent Cards Grid ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 20,
      }}>
        {/* Left: Featured Talent Spotlight Card (matching Lara Pearson's Figma style) */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          minHeight: 460,
          boxShadow: 'var(--shadow-md)',
          background: '#1d1730',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <img
            src={employeePhotos[activeEmp.id] ?? employeePhotos['emp-1']}
            alt={activeEmp.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(19, 14, 38, 0.95) 0%, rgba(19, 14, 38, 0.35) 60%, transparent 100%)',
          }} />

          {/* Spotlight Details */}
          <div style={{ position: 'relative', zIndex: 2, padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge label={activeEmp.department} variant="brand" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff' }} />
              <div style={{
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 14px',
                color: '#ffffff',
                fontSize: 12,
                fontWeight: 700,
              }}>
                {employeeComp[activeEmp.id] ?? '$140,000'}/yr
              </div>
            </div>

            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
                {activeEmp.name}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
                {activeEmp.role}
              </div>
            </div>

            {/* Skills capsule tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(employeeSkills[activeEmp.id] ?? []).map(skill => (
                <span key={skill} style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  background: 'rgba(255,255,255,0.12)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                }}>
                  {skill}
                </span>
              ))}
            </div>

            {/* Bandwidth meter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>
                <span>Workload Bandwidth</span>
                <span>{getTasksCount(activeEmp.id) * 28}%</span>
              </div>
              <ProgressBar value={getTasksCount(activeEmp.id) * 28} color="#ffffff" height={6} style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>

            {/* Direct Message trigger */}
            <Button
              variant="primary"
              onClick={() => setMessageRecipient(activeEmp)}
              style={{
                background: '#ffffff',
                color: 'var(--brand-500)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                fontWeight: 700,
                width: '100%',
              }}
            >
              <Icon name="chat" size={16} />
              Message {activeEmp.name.split(' ')[0]}
            </Button>
          </div>
        </div>

        {/* Right: Team Directory Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 18,
        }}>
          {filtered.map(emp => {
            const isSelected = activeEmp.id === emp.id
            return (
              <Card
                key={emp.id}
                onClick={() => setActiveEmp(emp)}
                style={{
                  padding: '22px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--brand-400)' : 'var(--border-light)',
                  boxShadow: isSelected ? '0 8px 24px rgba(77, 50, 191, 0.12)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                  position: 'relative',
                }}
              >
                {/* Header row: Photo + Name + Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={employeePhotos[emp.id] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
                      alt={emp.name}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ffffff',
                        boxShadow: 'var(--shadow-xs)',
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: emp.status === 'online' ? 'var(--green-500)' : emp.status === 'busy' ? 'var(--red-500)' : 'var(--amber-500)',
                      border: '2px solid #ffffff',
                    }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
                      {emp.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {emp.role}
                    </div>
                  </div>

                  <Badge label={emp.status} variant={statusVariant[emp.status]} />
                </div>

                {/* Details Section */}
                <div style={{
                  background: 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Department</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emp.department}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Active Tasks</span>
                    <span style={{ fontWeight: 600, color: 'var(--brand-600)' }}>{getTasksCount(emp.id)} Assigned</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Workload</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{getTasksCount(emp.id) * 28}%</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={() => setMessageRecipient(emp)}
                    style={{ fontSize: 12 }}
                  >
                    <Icon name="chat" size={14} />
                    Message
                  </Button>

                  <ActionArrowButton onClick={() => setActiveEmp(emp)} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* ─── Quick Message Modal ─── */}
      {messageRecipient && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(24, 21, 40, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            width: '90%',
            maxWidth: 440,
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar src={employeePhotos[messageRecipient.id]} initials={messageRecipient.avatar} size={42} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                    Message {messageRecipient.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {messageRecipient.role} • {messageRecipient.status}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMessageRecipient(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <textarea
              autoFocus
              rows={4}
              placeholder={`Write a quick message to ${messageRecipient.name.split(' ')[0]}...`}
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px',
                border: '1px solid var(--border-light)',
                fontSize: 13,
                color: 'var(--text-primary)',
                resize: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Button variant="ghost" onClick={() => setMessageRecipient(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSendMessage}>
                {sentSuccess ? (
                  <>
                    <Icon name="check" size={16} />
                    Sent!
                  </>
                ) : (
                  <>
                    <Icon name="send" size={16} />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
