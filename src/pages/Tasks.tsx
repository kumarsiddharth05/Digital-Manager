import { useState } from 'react'
import { Card, Badge, Avatar, Icon, Button, ActionArrowButton } from '../components/ui'
import { tasks as initialTasks, employees, projects } from '../data/mockData'
import type { Task, TaskStatus, TaskPriority, Employee, Project } from '../data/mockData'

const emp = Object.fromEntries(employees.map(e => [e.id, e])) as Record<string, Employee>
const proj = Object.fromEntries(projects.map(p => [p.id, p])) as Record<string, Project>

const priorityVariant = {
  low:    'muted',
  medium: 'sky',
  high:   'warning',
  urgent: 'danger',
} as const

const statusCols: { id: TaskStatus; label: string; icon: string; color: string }[] = [
  { id: 'todo',        label: 'To Do',       icon: 'pending_actions', color: 'var(--gray-400)' },
  { id: 'in-progress', label: 'In Progress', icon: 'autorenew',       color: 'var(--brand-500)' },
  { id: 'review',      label: 'In Review',   icon: 'rate_review',     color: 'var(--amber-500)' },
  { id: 'done',        label: 'Completed',   icon: 'task_alt',        color: 'var(--green-500)' },
]

export default function Tasks() {
  const [tasksList, setTasksList] = useState<Task[]>(initialTasks)
  const [view, setView] = useState<'board' | 'list'>('board')
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all')
  const [query, setQuery] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)

  // New task form
  const [newTitle, setNewTitle] = useState('')
  const [newProj, setNewProj] = useState(projects[0]?.id ?? '')
  const [newEmp, setNewEmp] = useState(employees[0]?.id ?? '')
  const [newPriority, setNewPriority] = useState<TaskPriority>('high')

  const filtered = tasksList.filter(t => {
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    const matchPrio   = filterPriority === 'all' || t.priority === filterPriority
    const matchQuery  = t.title.toLowerCase().includes(query.toLowerCase()) ||
      (proj[t.projectId]?.name ?? '').toLowerCase().includes(query.toLowerCase())
    return matchStatus && matchPrio && matchQuery
  })

  const inProgressCount = tasksList.filter(t => t.status === 'in-progress').length
  const inReviewCount   = tasksList.filter(t => t.status === 'review').length
  const completedCount  = tasksList.filter(t => t.status === 'done').length
  const urgentCount     = tasksList.filter(t => t.priority === 'urgent' && t.status !== 'done').length

  const handleAdvanceStatus = (taskId: string, current: TaskStatus) => {
    const sequence: TaskStatus[] = ['todo', 'in-progress', 'review', 'done']
    const nextIdx = (sequence.indexOf(current) + 1) % sequence.length
    const nextStatus = sequence[nextIdx]
    setTasksList(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t))
  }

  const handleCreateTask = () => {
    if (!newTitle.trim()) return
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: 'Deliverable sprint milestone.',
      projectId: newProj,
      assigneeId: newEmp,
      priority: newPriority,
      status: 'todo',
      dueDate: '2026-10-25',
      tags: ['feature', 'design'],
    }
    setTasksList(prev => [newTask, ...prev])
    setNewTitle('')
    setShowNewModal(false)
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
            Task Backlog & Sprints
          </h1>

          {/* Pill Metric Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Work</span>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.25)',
              }}>
                {tasksList.length} Tasks
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Active</span>
              <div style={{
                background: 'var(--brand-100)',
                color: 'var(--brand-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                {inProgressCount} In Progress
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>In Review</span>
              <div style={{
                background: 'var(--amber-50)',
                color: '#b45309',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                {inReviewCount} In Review
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Sprint Progress</span>
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
                  width: `${Math.round((completedCount / tasksList.length) * 100)}%`,
                  background: 'var(--green-50)', opacity: 0.8,
                  borderRadius: 'var(--radius-pill)',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>{completedCount}/{tasksList.length} Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3 Figma Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {/* Card 1: Velocity */}
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
                <Icon name="trending_up" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Velocity</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              88%
            </div>
          </div>

          {/* Card 2: Urgent Priority */}
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
                <Icon name="priority_high" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Urgent</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {urgentCount} Tasks
            </div>
          </div>

          {/* Card 3: Days Left */}
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
                <Icon name="timer" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Sprint</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              6 Days
            </div>
          </div>
        </div>
      </div>

      {/* ─── Controls: Search, Status Pills, Priority Pills, View Switcher ─── */}
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
            placeholder="Search tasks or initiatives..."
            value={query}
            onChange={e => setQuery(e.target.value)}
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
          gap: 6,
          background: '#ffffff',
          padding: '4px 6px',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-light)',
        }}>
          {(['all', 'todo', 'in-progress', 'review', 'done'] as const).map(s => {
            const active = filterStatus === s
            const labels = { all: 'All', todo: 'To Do', 'in-progress': 'In Progress', review: 'Review', done: 'Done' }
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: 12,
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

        {/* Priority Filter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#ffffff',
          padding: '4px 6px',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--border-light)',
        }}>
          {(['all', 'urgent', 'high', 'medium', 'low'] as const).map(p => {
            const active = filterPriority === p
            return (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  fontSize: 11.5,
                  fontWeight: active ? 700 : 500,
                  background: active ? 'var(--brand-500)' : 'transparent',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {p}
              </button>
            )
          })}
        </div>

        {/* View Switcher (Kanban / List) & Create Task */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex',
            background: '#ffffff',
            borderRadius: 'var(--radius-pill)',
            padding: '3px',
            border: '1px solid var(--border-light)',
          }}>
            <button
              onClick={() => setView('board')}
              title="Kanban Board"
              style={{
                width: 34, height: 32, borderRadius: 'var(--radius-pill)', border: 'none',
                background: view === 'board' ? 'var(--brand-500)' : 'transparent',
                color: view === 'board' ? '#ffffff' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <Icon name="view_kanban" size={17} />
            </button>
            <button
              onClick={() => setView('list')}
              title="Streamlined List"
              style={{
                width: 34, height: 32, borderRadius: 'var(--radius-pill)', border: 'none',
                background: view === 'list' ? 'var(--brand-500)' : 'transparent',
                color: view === 'list' ? '#ffffff' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <Icon name="format_list_bulleted" size={17} />
            </button>
          </div>

          <Button variant="primary" onClick={() => setShowNewModal(true)}>
            <Icon name="add" size={16} />
            New Task
          </Button>
        </div>
      </div>

      {/* ─── View 1: Kanban Board View ─── */}
      {view === 'board' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          alignItems: 'start',
        }}>
          {statusCols.map(col => {
            const colTasks = filtered.filter(t => t.status === col.id)
            return (
              <div
                key={col.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '16px',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 480,
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: col.id === 'in-progress' ? 'var(--brand-500)' : col.id === 'done' ? 'var(--green-500)' : 'var(--gray-200)',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={col.icon} size={15} />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{col.label}</span>
                  </div>

                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    background: '#ffffff', color: 'var(--text-secondary)',
                    padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                    boxShadow: 'var(--shadow-xs)',
                  }}>
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {colTasks.map(task => {
                    const assignee = emp[task.assigneeId]
                    const project = proj[task.projectId]
                    return (
                      <Card
                        key={task.id}
                        style={{
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleAdvanceStatus(task.id, task.status)}
                      >
                        {/* Project + Priority */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
                          }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: project?.color ?? 'var(--brand-500)' }} />
                            {project?.name ?? 'Initiative'}
                          </span>
                          <Badge label={task.priority} variant={priorityVariant[task.priority]} />
                        </div>

                        {/* Title */}
                        <div style={{
                          fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4,
                          textDecoration: task.status === 'done' ? 'line-through' : 'none',
                          opacity: task.status === 'done' ? 0.7 : 1,
                        }}>
                          {task.title}
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {task.tags.map(t => (
                            <span key={t} style={{
                              fontSize: 10.5, fontWeight: 600,
                              background: 'var(--bg-canvas)', color: 'var(--text-secondary)',
                              padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                            }}>
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Footer: Assignee + Due Date + Status Advancement prompt */}
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          paddingTop: 8, borderTop: '1px solid var(--border-light)',
                        }}>
                          {assignee ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Avatar initials={assignee.avatar} color={assignee.avatarColor} size={24} />
                              <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
                                {assignee.name.split(' ')[0]}
                              </span>
                            </div>
                          ) : <div />}

                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                            <Icon name="event" size={14} />
                            <span>{task.dueDate.slice(5)}</span>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                  {colTasks.length === 0 && (
                    <div style={{
                      padding: '30px 10px', textAlign: 'center',
                      color: 'var(--text-muted)', fontSize: 12,
                      border: '1.5px dashed var(--border-light)', borderRadius: 'var(--radius-lg)',
                    }}>
                      No tasks in {col.label}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ─── View 2: Streamlined List View ─── */}
      {view === 'list' && (
        <Card style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(task => {
            const assignee = emp[task.assigneeId]
            const project = proj[task.projectId]
            return (
              <div
                key={task.id}
                onClick={() => handleAdvanceStatus(task.id, task.status)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-canvas)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Status Toggle Button */}
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: `2px solid ${task.status === 'done' ? 'var(--green-500)' : 'var(--brand-400)'}`,
                  background: task.status === 'done' ? 'var(--green-500)' : 'transparent',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {task.status === 'done' && <Icon name="check" size={14} />}
                </div>

                {/* Title */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)',
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    opacity: task.status === 'done' ? 0.7 : 1,
                  }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    {task.tags.map(t => (
                      <span key={t} style={{ fontSize: 10, color: 'var(--text-muted)' }}>#{t}</span>
                    ))}
                  </div>
                </div>

                {/* Project Badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
                  minWidth: 120,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: project?.color ?? 'var(--brand-500)' }} />
                  {project?.name ?? 'Initiative'}
                </span>

                {/* Priority */}
                <Badge label={task.priority} variant={priorityVariant[task.priority]} />

                {/* Status */}
                <Badge
                  label={task.status.replace('-', ' ')}
                  variant={task.status === 'done' ? 'success' : task.status === 'in-progress' ? 'brand' : 'muted'}
                />

                {/* Assignee */}
                {assignee && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 100 }}>
                    <Avatar initials={assignee.avatar} color={assignee.avatarColor} size={26} />
                    <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>
                      {assignee.name.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Advance action */}
                <ActionArrowButton onClick={() => handleAdvanceStatus(task.id, task.status)} />
              </div>
            )
          })}
        </Card>
      )}

      {/* ─── New Task Modal ─── */}
      {showNewModal && (
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
            maxWidth: 480,
            padding: '28px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                Create New Task
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Task Title
              </label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Design responsive checkout modal"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  border: '1px solid var(--border-light)',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Project
                </label>
                <select
                  value={newProj}
                  onChange={e => setNewProj(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-canvas)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '10px 12px',
                    border: '1px solid var(--border-light)',
                    fontSize: 12.5,
                  }}
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Assignee
                </label>
                <select
                  value={newEmp}
                  onChange={e => setNewEmp(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-canvas)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '10px 12px',
                    border: '1px solid var(--border-light)',
                    fontSize: 12.5,
                  }}
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Priority
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['urgent', 'high', 'medium', 'low'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNewPriority(p)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-pill)',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      background: newPriority === p ? 'var(--brand-500)' : 'var(--bg-canvas)',
                      color: newPriority === p ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
              <Button variant="ghost" onClick={() => setShowNewModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateTask}>
                <Icon name="check" size={16} />
                Save Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
