import { useState, useEffect } from 'react'
import { Icon, ActionArrowButton } from '../components/ui'

export default function Dashboard() {
  // State for interactive features
  const [isPlaying, setIsPlaying] = useState(false)
  const [seconds, setSeconds] = useState(155) // 02:35
  const [activeDay, setActiveDay] = useState(3) // 0=S, 1=M, ... 4=T, 5=F
  const [expandedSection, setExpandedSection] = useState<string>('devices')

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [isPlaying])

  // Onboarding Tasks state
  const [onboardingTasks, setOnboardingTasks] = useState([
    { id: 1, title: 'Interview', date: 'Sep 13, 08:30', done: true, icon: '🪪' },
    { id: 2, title: 'Team Meeting', date: 'Sep 13, 08:30', done: true, icon: '👥' },
    { id: 3, title: 'Project Update', date: 'Sep 13, 08:30', done: false, icon: '🏠' },
    { id: 4, title: 'Discuss Q3 Goals', date: 'Sep 13, 08:30', done: false, icon: '💬' },
    { id: 5, title: 'HR Policy Review', date: 'Sep 13, 08:30', done: false, icon: '🏆' },
  ])

  const completedCount = onboardingTasks.filter(t => t.done).length

  const toggleTask = (id: number) => {
    setOnboardingTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  // Bar chart days
  const weekData = [
    { day: 'S', hours: '1.2h', h: 22 },
    { day: 'M', hours: '4.8h', h: 64 },
    { day: 'T', hours: '3.5h', h: 48 },
    { day: 'W', hours: '4.2h', h: 58 },
    { day: 'T', hours: '5h 25m', h: 92, highlight: true },
    { day: 'F', hours: '4.6h', h: 62 },
    { day: 'S', hours: '0.8h', h: 16 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ─── Hero Section: Greeting + Metrics + Top 3 Stat Cards ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.2fr)',
        gap: 20,
        alignItems: 'center',
      }}>
        {/* Left: Greeting & Pill Metrics */}
        <div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            marginBottom: 16,
          }}>
            Welcome Back, Jhon
          </h1>

          {/* Pill Metric Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}>
            {/* Interviews: 15% solid pill */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Interviews</span>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.25)',
              }}>
                15%
              </div>
            </div>

            {/* Hired: 15% */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Hired</span>
              <div style={{
                background: '#ffffff',
                color: 'var(--text-primary)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                15%
              </div>
            </div>

            {/* Project Time: 60% */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              flex: 1,
              minWidth: 160,
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Project Time</span>
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
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '60%',
                  background: 'var(--brand-100)',
                  opacity: 0.5,
                  borderRadius: 'var(--radius-pill)',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>60%</span>
              </div>
            </div>

            {/* Output: 10% */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Output</span>
              <div style={{
                background: 'linear-gradient(135deg, var(--brand-100), #ffffff)',
                color: 'var(--brand-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                10%
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3 Figma Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}>
          {/* Card 1: Employe */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34,
                borderRadius: '50%',
                background: 'var(--brand-500)',
                color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="group" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Employe</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              68
            </div>
          </div>

          {/* Card 2: Hirings */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34,
                borderRadius: '50%',
                background: 'var(--brand-500)',
                color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="work" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Hirings</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              53
            </div>
          </div>

          {/* Card 3: Projects */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34,
                borderRadius: '50%',
                background: 'var(--brand-500)',
                color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="layers" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Projects</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              68
            </div>
          </div>
        </div>
      </div>

      {/* ─── Row 2: Featured Profile, Progress, Time Tracker, Onboarding ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1.15fr 1.15fr 310px',
        gap: 20,
      }}>
        {/* Card 1: Lara Pearson Featured Portrait */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          minHeight: 280,
          boxShadow: 'var(--shadow-sm)',
          background: '#231e33',
        }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
            alt="Lara Pearson"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
          />
          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20, 16, 36, 0.9) 0%, rgba(20, 16, 36, 0.2) 50%, transparent 100%)',
          }} />

          {/* Bottom Card Content */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            zIndex: 2,
          }}>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: 17, letterSpacing: '-0.2px' }}>
                Lara Pearson
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                UI/UX Designer
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 12px',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 700,
            }}>
              $1,500
            </div>
          </div>
        </div>

        {/* Card 2: Progress Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Progress</span>
              <ActionArrowButton />
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                5.1 h
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                Work Time This Week
              </span>
            </div>
          </div>

          {/* Bar Chart with S M T W T F S and floating tooltip */}
          <div style={{ position: 'relative', marginTop: 10 }}>
            {/* Floating Tooltip above Thursday bar */}
            <div style={{
              position: 'absolute',
              top: -28,
              left: '60%',
              transform: 'translateX(-50%)',
              background: 'var(--brand-500)',
              color: '#ffffff',
              fontSize: 10.5,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 2px 6px rgba(77, 50, 191, 0.3)',
              whiteSpace: 'nowrap',
            }}>
              5h 25m
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: 100,
              paddingBottom: 8,
            }}>
              {weekData.map((item, idx) => (
                <div
                  key={item.day + idx}
                  onClick={() => setActiveDay(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 12,
                    height: item.h,
                    borderRadius: 'var(--radius-pill)',
                    background: item.highlight || activeDay === idx ? 'var(--brand-500)' : 'var(--brand-100)',
                    transition: 'all 0.2s ease',
                  }} />
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: item.highlight || activeDay === idx ? 'var(--brand-500)' : 'var(--text-muted)',
                  }}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Time Tracker Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Time tracker</span>
              <ActionArrowButton />
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                Work Time
              </span>
            </div>
          </div>

          {/* Donut progress ring */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px 0' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--brand-100)"
                strokeWidth="12"
              />
              {/* Active arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--brand-500)"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="80"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>

          {/* Controls: Play, Pause, Stopwatch */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => setIsPlaying(true)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: isPlaying ? 'var(--brand-500)' : 'var(--brand-100)',
                  color: isPlaying ? '#ffffff' : 'var(--brand-500)',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Icon name="play_arrow" size={16} />
              </button>
              <button
                onClick={() => setIsPlaying(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: !isPlaying ? 'var(--brand-500)' : 'var(--brand-100)',
                  color: !isPlaying ? '#ffffff' : 'var(--brand-500)',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Icon name="pause" size={16} />
              </button>
            </div>

            <button style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              color: 'var(--brand-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="timer" size={18} />
            </button>
          </div>
        </div>

        {/* Card 4: Onboarding with Layered Deep Purple Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* Top progress overview container */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
            marginBottom: -24,
            paddingBottom: 38,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Onboarding</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>18%</span>
            </div>

            {/* Sub progress tracks */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 11,
                fontWeight: 600,
              }}>
                30% Task
              </div>
              <div style={{
                background: 'var(--brand-100)',
                color: 'var(--brand-600)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 11,
                fontWeight: 600,
              }}>
                25%
              </div>
              <div style={{
                background: 'var(--gray-100)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 11,
                fontWeight: 600,
              }}>
                0%
              </div>
            </div>
          </div>

          {/* Deep Royal Purple Floating Card: "Onboarding Task" */}
          <div style={{
            background: 'var(--brand-500)',
            color: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '22px 20px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Onboarding Task</span>
              <span style={{ fontSize: 15, fontWeight: 700, opacity: 0.9 }}>
                {completedCount}/5
              </span>
            </div>

            {/* Checklist Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {onboardingTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {/* Icon Circle */}
                  <div style={{
                    width: 34, height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.16)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15,
                    flexShrink: 0,
                  }}>
                    {task.icon}
                  </div>

                  {/* Title and date */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#ffffff',
                      textDecoration: task.done ? 'line-through' : 'none',
                      opacity: task.done ? 0.8 : 1,
                    }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255, 255, 255, 0.65)' }}>
                      {task.date}
                    </div>
                  </div>

                  {/* Checkmark bubble */}
                  <div style={{
                    width: 18, height: 18,
                    borderRadius: '50%',
                    background: task.done ? '#ffffff' : 'transparent',
                    border: task.done ? 'none' : '1.5px solid rgba(255, 255, 255, 0.4)',
                    color: 'var(--brand-500)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {task.done && <Icon name="check" size={13} color="var(--brand-500)" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Row 3: Accordion Menu (Devices/Pension) & Interactive Calendar ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 20,
      }}>
        {/* Left: Accordion Menu Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Pension contributions item */}
          <div
            onClick={() => setExpandedSection(s => s === 'pension' ? '' : 'pension')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', paddingBottom: 10,
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
              Pension contributions
            </span>
            <Icon name={expandedSection === 'pension' ? 'expand_less' : 'expand_more'} size={20} color="var(--text-muted)" />
          </div>

          {/* Devices item (Expanded) */}
          <div>
            <div
              onClick={() => setExpandedSection(s => s === 'devices' ? '' : 'devices')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', marginBottom: expandedSection === 'devices' ? 12 : 0,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                Devices
              </span>
              <Icon name={expandedSection === 'devices' ? 'expand_less' : 'expand_more'} size={20} color="var(--text-muted)" />
            </div>

            {expandedSection === 'devices' && (
              <div style={{
                background: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                border: '1px solid var(--border-light)',
              }}>
                <div style={{
                  width: 50,
                  height: 38,
                  borderRadius: 'var(--radius-sm)',
                  background: '#1a162b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}>
                  <Icon name="laptop_mac" size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                    MacBook Air
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Version M1
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compensation Summary item */}
          <div
            onClick={() => setExpandedSection(s => s === 'compensation' ? '' : 'compensation')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', paddingTop: 6, paddingBottom: 6,
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
              Compensation Summary
            </span>
            <Icon name={expandedSection === 'compensation' ? 'expand_less' : 'expand_more'} size={20} color="var(--text-muted)" />
          </div>

          {/* Employee Benefits item */}
          <div
            onClick={() => setExpandedSection(s => s === 'benefits' ? '' : 'benefits')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', paddingTop: 6,
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
              Employee Benefits
            </span>
            <Icon name={expandedSection === 'benefits' ? 'expand_less' : 'expand_more'} size={20} color="var(--text-muted)" />
          </div>
        </div>

        {/* Right: Calendar & Schedule Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          {/* Calendar Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{
              background: 'var(--brand-100)',
              color: 'var(--brand-600)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
            }}>
              &lt; August
            </button>

            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              September 2025
            </span>

            <button style={{
              background: 'var(--brand-500)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
              boxShadow: '0 2px 6px rgba(77, 50, 191, 0.25)',
            }}>
              October &gt;
            </button>
          </div>

          {/* Days Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '70px repeat(6, 1fr)',
            gap: 10,
            textAlign: 'center',
            paddingBottom: 10,
            borderBottom: '1px solid var(--border-light)',
          }}>
            <div />
            {[
              { d: 'Mon', num: 23 },
              { d: 'Tue', num: 23 },
              { d: 'Wed', num: 24, active: true },
              { d: 'Thu', num: 25 },
              { d: 'Fri', num: 26 },
              { d: 'Sat', num: 27 },
            ].map(col => (
              <div key={col.d + col.num} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{col.d}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: col.active ? 800 : 600,
                  color: col.active ? 'var(--brand-500)' : 'var(--text-primary)',
                }}>
                  {col.num}
                </span>
              </div>
            ))}
          </div>

          {/* Time Rows and Schedule Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
            {/* 8:00 am */}
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>8:00 am</span>
              <div style={{ borderTop: '1px dashed var(--gray-200)', height: 1 }} />
            </div>

            {/* 9:00 am with Vendor Risk Assessment Chip */}
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', position: 'relative' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>9:00 am</span>
              <div style={{ borderTop: '1px dashed var(--gray-200)', height: 1 }} />

              {/* Event 1: Vendor Risk Assessment */}
              <div style={{
                position: 'absolute',
                left: 140,
                top: -12,
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(77, 50, 191, 0.3)',
                zIndex: 2,
              }}>
                {/* Micro avatar group */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt="user"
                    style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid #ffffff' }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                    alt="user"
                    style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid #ffffff', marginLeft: -5 }}
                  />
                  <span style={{
                    marginLeft: -4,
                    fontSize: 9.5,
                    fontWeight: 700,
                    background: 'rgba(255,255,255,0.25)',
                    padding: '1px 4px',
                    borderRadius: 99,
                  }}>
                    2+
                  </span>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 600 }}>Vendor Risk Assessment</span>
              </div>
            </div>

            {/* 10:00 am with Discuss Q3 Goals Chip */}
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', position: 'relative' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>10:00 am</span>
              <div style={{ borderTop: '1px dashed var(--gray-200)', height: 1 }} />

              {/* Event 2: Discuss Q3 Goals */}
              <div style={{
                position: 'absolute',
                left: 320,
                top: -12,
                background: 'var(--brand-100)',
                color: 'var(--brand-600)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid var(--brand-200)',
                zIndex: 2,
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt="user"
                    style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid #ffffff' }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt="user"
                    style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid #ffffff', marginLeft: -5 }}
                  />
                  <span style={{
                    marginLeft: -4,
                    fontSize: 9.5,
                    fontWeight: 700,
                    background: 'var(--brand-500)',
                    color: '#ffffff',
                    padding: '1px 4px',
                    borderRadius: 99,
                  }}>
                    2+
                  </span>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 600 }}>Discuss Q3 Goals</span>
              </div>
            </div>

            {/* 11:00 am */}
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>11:00 am</span>
              <div style={{ borderTop: '1px dashed var(--gray-200)', height: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
