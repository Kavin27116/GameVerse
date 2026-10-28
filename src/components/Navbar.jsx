import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path:'/', label:'Home', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
  { path:'/games', label:'Games', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M8 12h.01M16 12h.01M12 8v.01M12 16v.01"/></svg> },
  { path:'/tournaments', label:'Tournaments', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 21h8M12 17v4M6 3h12l-3 7H9L6 3zM9 10a3 3 0 006 0"/></svg> },
  { path:'/leaderboard', label:'Leaderboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> },
  { path:'/news', label:'News', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg> },
  { path:'/community', label:'Community', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
]

import { useGameverse } from '../context/GameverseContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, openModal, logoutUser, addToast } = useGameverse()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav className={`navbar${solid?' solid':''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo-link" title="GAMEVERSE // Multiverse Arena">
            <div className="nav-logo-text">
              <span className="nav-logo-name">GAME<span className="text-gradient">VERSE</span></span>
              <span className="nav-logo-sub">// MULTIVERSE ARENA</span>
            </div>
          </Link>

          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link${pathname===item.path?' active':''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            <div
              className="nav-status-badge"
              style={{ cursor: 'pointer' }}
              onClick={() => addToast('Quantum Shard Active', 'Latency: 12ms · Node US-East · 0.00% Packet Loss', '⚡')}
              title="Click to run network diagnostic"
            >
              <span className="nav-status-dot" />
              <span className="nav-status-text">SHARD // 12ms</span>
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-glass)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{user.avatar}</span>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{user.name}</div>
                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{user.rank}</div>
                  </div>
                </div>
                <button className="nav-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={logoutUser}>
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button className="nav-btn-outline" id="nav-signin" onClick={() => openModal('auth')}>
                  Sign In
                </button>
                <button className="nav-btn-primary" id="nav-signup" onClick={() => openModal('auth')}>
                  Enter Verse
                </button>
              </>
            )}
          </div>

          <button className="nav-ham" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:'fixed', top:'var(--nav-h)', left:0, right:0, zIndex:999,
          background:'rgba(7,7,26,0.98)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid var(--border-subtle)',
          padding:'1rem 1.5rem', display:'flex', flexDirection:'column', gap:'0.25rem'
        }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.path} to={item.path}
              style={{
                display:'flex', alignItems:'center', gap:'0.75rem',
                padding:'0.85rem 1rem', borderRadius:'var(--radius-sm)',
                fontSize:'0.95rem', fontWeight:'600',
                color: pathname===item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: pathname===item.path ? 'rgba(124,58,237,0.12)' : 'transparent',
              }}
            >
              {item.icon}{item.label}
            </Link>
          ))}
          <div style={{display:'flex',gap:'0.75rem',padding:'1rem 0 0.5rem'}}>
            <button className="nav-btn-outline" style={{flex:1}}>Sign In</button>
            <button className="nav-btn-primary" style={{flex:1}}>Join Free</button>
          </div>
        </div>
      )}
    </>
  )
}
