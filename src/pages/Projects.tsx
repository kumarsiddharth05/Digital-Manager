import { useState } from 'react'
import { Card, Badge, AvatarGroup, ProgressBar, Icon, Button, ActionArrowButton } from '../components/ui'
import { projects as initialProjects, employees } from '../data/mockData'
import type { Project, ProjectStatus, Employee } from '../data/mockData'

const emp = Object.fromEntries(employees.map(e => [e.id, e])) as Record<string, Employee>

const statusConfig: Record<ProjectStatus, { label: string; variant: 'success' | 'brand' | 'warning' | 'muted' | 'sky' }> = {
  active:    { label: 'Active',    variant: 'brand' },
  planning:  { label: 'Planning',  variant: 'sky' },
  'on-hold': { label: 'On Hold',   variant: 'warning' },
  completed: { label: 'Completed', variant: 'success' },
}

export default function Projects() {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects)
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all')
  const [searchVal, setSearchVal] = useState('')
  const [showModal, setShowModal] = useState(false)

  // New project state
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newBudget, setNewBudget] = useState('$35,000')

  const filtered = projectsList.filter(p => {
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    const matchSearch = p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      p.description.toLowerCase().includes(searchVal.toLowerCase())
    return matchStatus && matchSearch
  })

  const flagship = projectsList[0] // e.g. Brand Refresh

  const handleCreateProject = () => {
    if (!newName.trim()) return
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim() || 'Internal initiatives sprint for growth and scaling.',
      status: 'active',
      progress: 10,
      tasksDone: 2,
      tasksTotal: 15,
      deadline: '2026-12-15',
      teamIds: ['emp-1', 'emp-2'],
      color: '#4d32bf',
    }
    setProjectsList(prev => [newProj, ...prev])
    setNewName('')
    setNewDesc('')
    setShowModal(false)
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
            Active Initiatives & Roadmaps
          </h1>

          {/* Pill Metric Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Projects</span>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.25)',
              }}>
                {projectsList.length} Initiatives
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>In Delivery</span>
              <div style={{
                background: 'var(--brand-100)',
                color: 'var(--brand-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                3 Active
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Target Launch</span>
              <div style={{
                background: 'var(--amber-50)',
                color: '#b45309',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                Q4 Release
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Average Completion</span>
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
                  width: '52%', background: 'var(--brand-100)', opacity: 0.5,
                  borderRadius: 'var(--radius-pill)',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>52% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3 Figma Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {/* Card 1: Total Budget */}
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
                <Icon name="attach_money" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Budget</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              $185k
            </div>
          </div>

          {/* Card 2: Team Utilization */}
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
                <Icon name="pie_chart" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Utilization</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              92%
            </div>
          </div>

          {/* Card 3: Milestone Delivery */}
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
                <Icon name="rocket_launch" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Delivery</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              4 in Q4
            </div>
          </div>
        </div>
      </div>

      {/* ─── Controls: Search & Status Pills & New Project ─── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        {/* Search */}
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
            placeholder="Search projects..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 13,
              color: 'var(--text-primary)',
              width: '100%',
            }}
          />
        </div>

        {/* Status Pills */}
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
          {(['all', 'active', 'planning', 'on-hold', 'completed'] as const).map(s => {
            const active = filterStatus === s
            const labels = { all: 'All Projects', active: 'Active', planning: 'Planning', 'on-hold': 'On Hold', completed: 'Completed' }
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
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
                {labels[s]}
              </button>
            )
          })}
        </div>

        {/* Action Button */}
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <Icon name="add" size={16} />
          New Project
        </Button>
      </div>

      {/* ─── Flagship Project Showcase (Figma Hand-Designed Hero Card) ─── */}
      {flagship && (
        <div style={{
          background: 'linear-gradient(135deg, #4329b3 0%, #4d32bf 60%, #5d3fe0 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 24,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background Ambient Glow */}
          <div style={{
            position: 'absolute',
            right: -60,
            top: -60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                Flagship Initiative
              </span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                Led by Sofia Rivera & Aisha Patel
              </span>
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.4px', marginBottom: 8 }}>
              {flagship.name}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', maxWidth: 540, lineHeight: 1.5, marginBottom: 20 }}>
              {flagship.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AvatarGroup items={flagship.teamIds.map(id => ({ initials: emp[id]?.avatar, color: emp[id]?.avatarColor }))} size={30} />
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{flagship.teamIds.length} Core Members</span>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <Icon name="calendar_today" size={14} />
                <span>Deadline: {flagship.deadline}</span>
              </div>
            </div>
          </div>

          {/* Progress Card Overlay */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Sprint Velocity</span>
              <span style={{ fontSize: 22, fontWeight: 800 }}>{flagship.progress}%</span>
            </div>

            <ProgressBar value={flagship.progress} color="#ffffff" height={8} style={{ background: 'rgba(255,255,255,0.2)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              <span>{flagship.tasksDone} tasks completed</span>
              <span>{flagship.tasksTotal - flagship.tasksDone} remaining</span>
            </div>

            <button
              onClick={() => alert(`Opening roadmap for ${flagship.name}`)}
              style={{
                marginTop: 6,
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                background: '#ffffff',
                color: 'var(--brand-500)',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <span>Explore Initiative</span>
              <Icon name="arrow_outward" size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ─── Projects Grid ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20,
      }}>
        {filtered.map(proj => {
          const members = proj.teamIds.map(id => emp[id]).filter(Boolean)
          const config = statusConfig[proj.status]
          return (
            <Card
              key={proj.id}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 18,
                cursor: 'pointer',
              }}
            >
              <div>
                {/* Header: Color Badge + Title + Status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 14, height: 14,
                      borderRadius: 4,
                      background: proj.color,
                      flexShrink: 0,
                    }} />
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                      {proj.name}
                    </h3>
                  </div>
                  <Badge label={config.label} variant={config.variant} />
                </div>

                <p style={{
                  fontSize: 12.5,
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {proj.description}
                </p>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{proj.progress}%</span>
                  </div>
                  <ProgressBar value={proj.progress} color={proj.color} height={6} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>{proj.tasksDone} done</span>
                    <span>{proj.tasksTotal} total</span>
                  </div>
                </div>
              </div>

              {/* Footer: Team Avatars + Deadline + Arrow Action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 12,
                borderTop: '1px solid var(--border-light)',
              }}>
                <AvatarGroup items={members.map(m => ({ initials: m.avatar, color: m.avatarColor }))} size={26} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="event" size={14} />
                    {proj.deadline.slice(5)}
                  </span>
                  <ActionArrowButton onClick={() => alert(`Viewing details for ${proj.name}`)} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* ─── New Project Modal ─── */}
      {showModal && (
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
            maxWidth: 460,
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                Create New Initiative
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Project Name
              </label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. AI Workflow Automation"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  border: '1px solid var(--border-light)',
                  fontSize: 13,
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe the goals and deliverables..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  border: '1px solid var(--border-light)',
                  fontSize: 13,
                  resize: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Budget Allocation
              </label>
              <input
                type="text"
                value={newBudget}
                onChange={e => setNewBudget(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  border: '1px solid var(--border-light)',
                  fontSize: 13,
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateProject}>
                <Icon name="check" size={16} />
                Launch Initiative
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
