import { useState } from 'react'
import { Badge, Icon } from '../components/ui'
import { chatChannels, chatMessages, employees } from '../data/mockData'
import type { Employee } from '../data/mockData'

const emp = Object.fromEntries(employees.map(e => [e.id, e])) as Record<string, Employee>

const employeePhotos: Record<string, string> = {
  'emp-1': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
  'emp-2': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'emp-3': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  'emp-4': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  'emp-5': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
}

export default function Chat() {
  const [activeChannel, setActiveChannel] = useState('ch-1')
  const [inputText, setInputText] = useState('')
  const [localMessages, setLocalMessages] = useState(chatMessages)
  const [channelSearch, setChannelSearch] = useState('')

  const channel = chatChannels.find(c => c.id === activeChannel) ?? chatChannels[0]
  const messages = localMessages.filter(m => m.channelId === activeChannel)

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: `msg-${Date.now()}`,
      channelId: activeChannel,
      senderId: 'emp-1', // current user Aisha
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setLocalMessages(prev => [...prev, newMsg])
    setInputText('')
  }

  const grouped = chatChannels.reduce<Record<string, typeof chatChannels>>((acc, ch) => {
    const group = ch.type === 'direct' ? 'Direct Messages' : ch.type === 'project' ? 'Project Channels' : 'General'
    acc[group] = [...(acc[group] ?? []), ch]
    return acc
  }, {})

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
            Team Apps & Communications
          </h1>

          {/* Pill Metric Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Channels</span>
              <div style={{
                background: 'var(--brand-500)',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.25)',
              }}>
                {chatChannels.length} Channels
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Team Available</span>
              <div style={{
                background: 'var(--green-50)',
                color: 'var(--green-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                5 Online
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Voice Huddle</span>
              <div style={{
                background: 'var(--brand-100)',
                color: 'var(--brand-600)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 12.5,
                fontWeight: 700,
                boxShadow: 'var(--shadow-xs)',
              }}>
                Live Now
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 140 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Response Time</span>
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
                  width: '92%', background: 'var(--brand-100)', opacity: 0.5,
                  borderRadius: 'var(--radius-pill)',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>~4m Avg Reply</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3 Figma Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {/* Card 1: Unread */}
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
                <Icon name="chat_bubble" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Unread</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              3 Messages
            </div>
          </div>

          {/* Card 2: Shared Files */}
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
                <Icon name="folder_open" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Files</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              42 Assets
            </div>
          </div>

          {/* Card 3: Team Huddle */}
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
                <Icon name="mic" size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Huddle</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              2 In Call
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Chat Suite (Hand-Designed Figma Studio Layout) ─── */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        minHeight: 620,
      }}>
        {/* Left: Channels & DMs Sidebar */}
        <div style={{
          background: 'var(--bg-canvas)',
          borderRight: '1px solid var(--border-light)',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          {/* Channel search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#ffffff',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 14px',
            border: '1px solid var(--border-light)',
          }}>
            <Icon name="search" size={16} color="var(--brand-500)" />
            <input
              type="text"
              placeholder="Find channel..."
              value={channelSearch}
              onChange={e => setChannelSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: 12,
                color: 'var(--text-primary)',
                width: '100%',
              }}
            />
          </div>

          {/* Channels list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
            {Object.entries(grouped).map(([groupTitle, chList]) => {
              const visible = chList.filter(c => c.name.toLowerCase().includes(channelSearch.toLowerCase()))
              if (visible.length === 0) return null
              return (
                <div key={groupTitle}>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                    paddingLeft: 8,
                  }}>
                    {groupTitle}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {visible.map(ch => {
                      const active = ch.id === activeChannel
                      return (
                        <div
                          key={ch.id}
                          onClick={() => setActiveChannel(ch.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-pill)',
                            background: active ? 'var(--brand-500)' : 'transparent',
                            color: active ? '#ffffff' : 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: active ? 700 : 500,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Icon
                              name={ch.type === 'direct' ? 'person' : ch.type === 'project' ? 'folder' : 'tag'}
                              size={16}
                              color={active ? '#ffffff' : 'var(--text-muted)'}
                            />
                            <span>{ch.name}</span>
                          </div>

                          {ch.unread > 0 && !active && (
                            <span style={{
                              background: 'var(--brand-500)',
                              color: '#ffffff',
                              fontSize: 10.5,
                              fontWeight: 700,
                              padding: '1px 6px',
                              borderRadius: 99,
                            }}>
                              {ch.unread}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active Huddle Banner */}
          <div style={{
            marginTop: 'auto',
            background: 'linear-gradient(135deg, var(--brand-500), #5d3fe0)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700 }}>
              <Icon name="graphic_eq" size={16} color="#ffffff" />
              <span>Voice Room Active</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
              Sofia & Marcus discussing Q3 deliverable milestones.
            </div>
            <button
              onClick={() => alert('Connected to Team Huddle audio!')}
              style={{
                marginTop: 4,
                padding: '6px 12px',
                borderRadius: 'var(--radius-pill)',
                background: '#ffffff',
                color: 'var(--brand-500)',
                border: 'none',
                fontWeight: 700,
                fontSize: 11.5,
                cursor: 'pointer',
              }}
            >
              Join Huddle
            </button>
          </div>
        </div>

        {/* Right: Main Chat Feed */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="tag" size={20} color="var(--brand-500)" />
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  {channel.name}
                </h2>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                Topic: Core announcements, team sprints, and company updates.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {employees.slice(0, 4).map((e, idx) => (
                  <img
                    key={e.id}
                    src={employeePhotos[e.id]}
                    alt={e.name}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      marginLeft: idx === 0 ? 0 : -8,
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => alert('Starting video sync')}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--brand-100)', color: 'var(--brand-600)',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Icon name="videocam" size={18} />
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div style={{
            flex: 1,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            overflowY: 'auto',
          }}>
            {messages.map(msg => {
              const sender = emp[msg.senderId]
              const isCurrentUser = msg.senderId === 'emp-1'
              return (
                <div key={msg.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <img
                    src={employeePhotos[msg.senderId] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
                    alt={sender?.name ?? 'User'}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ffffff',
                      boxShadow: 'var(--shadow-xs)',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {sender?.name ?? 'Aisha Patel'}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {msg.time}
                      </span>
                      {isCurrentUser && (
                        <Badge label="You" variant="brand" style={{ fontSize: 10, padding: '1px 6px' }} />
                      )}
                    </div>

                    <div style={{
                      fontSize: 13.5,
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      background: 'var(--bg-canvas)',
                      padding: '10px 16px',
                      borderRadius: '16px',
                      display: 'inline-block',
                      maxWidth: '85%',
                    }}>
                      {msg.text}
                    </div>

                    {/* Reaction capsule */}
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, background: '#ffffff', border: '1px solid var(--border-light)',
                        padding: '2px 8px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
                      }}>
                        👍 3
                      </span>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, background: '#ffffff', border: '1px solid var(--border-light)',
                        padding: '2px 8px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
                      }}>
                        🚀 2
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Rich Shared File Card Preview (Figma hand-crafted feel) */}
            <div style={{
              marginLeft: 52,
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: 420,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-md)',
                  background: 'var(--brand-500)', color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="description" size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                    Brand_Refresh_v2.fig
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Figma Document • 14.2 MB
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Downloading file')}
                style={{
                  background: '#ffffff', border: '1px solid var(--border-light)',
                  borderRadius: '50%', width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--brand-500)',
                }}
              >
                <Icon name="download" size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Message Input Capsule Bar */}
          <div style={{
            padding: '18px 24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-canvas)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 18px',
              border: '1px solid var(--border-light)',
            }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', marginRight: 8, cursor: 'pointer' }}>
                <Icon name="add_circle" size={20} />
              </button>

              <input
                type="text"
                placeholder={`Message #${channel.name}...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                }}
              />

              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', marginLeft: 8, cursor: 'pointer' }}>
                <Icon name="sentiment_satisfied" size={20} />
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', marginLeft: 8, cursor: 'pointer' }}>
                <Icon name="attach_file" size={20} />
              </button>
            </div>

            <button
              onClick={handleSend}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'var(--brand-500)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(77, 50, 191, 0.3)',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon name="send" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
