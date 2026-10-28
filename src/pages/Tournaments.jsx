import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Footer } from '../components/Shared'
import { useGameverse } from '../context/GameverseContext'

const TOURNAMENTS = [
  { id:1, emoji:'🎯', prize:'$2,250,000', name:'VALORANT Champions Tour 2025 (VCT)', game:'VALORANT', teams:'16 Elite Teams', date:'Dec 12–22', region:'Global', status:'Registering', statusClass:'tag-green', time:{d:44,h:10,m:20} },
  { id:2, emoji:'💣', prize:'$1,250,000', name:'CS2 PGL Major Shanghai 2025', game:'Counter-Strike 2', teams:'24 Tier-1 Teams', date:'Nov 28–Dec 10', region:'APAC / Global', status:'Open', statusClass:'tag-teal', time:{d:30,h:6,m:45} },
  { id:3, emoji:'🧙', prize:'$2,500,000', name:'League of Legends World Championship', game:'League of Legends', teams:'22 Regional Champions', date:'Nov 18–25', region:'Global', status:'Live', statusClass:'tag-orange', time:{d:0,h:4,m:12} },
  { id:4, emoji:'🛡️', prize:'$1,000,000', name:'ALGS Year 5 Global Championship', game:'Apex Legends', teams:'40 Pro Squads', date:'Dec 18–21', region:'Americas / EMEA', status:'Registering', statusClass:'tag-green', time:{d:50,h:14,m:30} },
  { id:5, emoji:'🥋', prize:'$300,000', name:'EVO World Tekken 8 Championship', game:'Tekken 8', teams:'1,024 Fighters', date:'Nov 14–16', region:'Las Vegas', status:'Upcoming', statusClass:'tag-gold', time:{d:16,h:2,m:0} },
  { id:6, emoji:'⛏️', prize:'$1,500,000', name:'Fortnite Champion Series (FNCS) Global', game:'Fortnite', teams:'50 Duo Finalists', date:'Dec 5–7', region:'Global', status:'Upcoming', statusClass:'tag-gold', time:{d:37,h:0,m:0} },
]

function Countdown({ time }) {
  const [t, setT] = useState(time)
  useEffect(() => {
    const iv = setInterval(() => setT(p => {
      let {d,h,m} = p
      m--; if(m<0){m=59;h--} if(h<0){h=23;d--} if(d<0){d=h=m=0}
      return {d,h,m}
    }), 60000)
    return () => clearInterval(iv)
  },[])
  const fmt = v => String(v).padStart(2,'0')
  return (
    <div className="countdown-row">
      {[{v:t.d,l:'Days'},{v:t.h,l:'Hrs'},{v:t.m,l:'Min'},{v:'00',l:'Sec'}].map(u=>(
        <div className="cd-unit" key={u.l}>
          <div className="cd-num">{fmt(u.v)}</div>
          <div className="cd-lbl">{u.l}</div>
        </div>
      ))}
    </div>
  )
}

export default function TournamentsPage() {
  const [selectedTab, setSelectedTab] = useState('All')
  const { openModal } = useGameverse()
  const TABS = ['All','Registering','Live','Upcoming']

  const filtered = selectedTab === 'All' ? TOURNAMENTS : TOURNAMENTS.filter(t => t.status === selectedTab || (selectedTab==='Registering' && t.status==='Open'))

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <motion.div className="tourn-hero-inner" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}}>
            <div>
              <p className="sec-eyebrow">Competitive Gaming</p>
              <h1 className="page-hero-title">Live <span>Tournaments</span></h1>
              <p className="page-hero-desc">Compete for over $1M+ in total prize money across global tournaments.</p>
              <div style={{display:'flex',gap:'2rem',marginTop:'1.5rem',flexWrap:'wrap'}}>
                {[{v:'$1M+',l:'Total Prizes'},{v:'24',l:'Active Events'},{v:'80K+',l:'Competitors'}].map(s=>(
                  <div key={s.l}>
                    <div style={{fontFamily:'var(--font-display)',fontWeight:900,fontSize:'1.4rem',background:'var(--grad-gold)',...{WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}}>{s.v}</div>
                    <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured tournament */}
            <motion.div className="featured-tournament" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.2}}>
              <div className="ft-banner">🎯</div>
              <div className="ft-body">
                <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.75rem'}}>
                  <span className="tag tag-orange">FEATURED MAJOR</span>
                  <span className="tag tag-green">Registering</span>
                </div>
                <div className="ft-prize"><span>$2,250,000</span></div>
                <div className="ft-name">VALORANT Champions Tour 2025</div>
                <div className="ft-meta-row">
                  <div className="ft-meta-item">🎯 <strong>VALORANT</strong></div>
                  <div className="ft-meta-item">👥 <strong>16 Elite Teams</strong></div>
                  <div className="ft-meta-item">📅 <strong>Dec 12–22</strong></div>
                </div>
                <Countdown time={{d:44,h:10,m:20}}/>
                <button
                  className="btn btn-gold"
                  style={{width:'100%'}}
                  id="register-featured-btn"
                  onClick={() => openModal('tournament', TOURNAMENTS[0])}
                >
                  Register for Open Qualifiers →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Tabs */}
        <div style={{display:'flex',gap:'0.5rem',marginBottom:'2rem',borderBottom:'1px solid var(--border-subtle)',paddingBottom:'1rem'}}>
          {TABS.map(t => (
            <button key={t} onClick={()=>setSelectedTab(t)}
              style={{
                padding:'0.5rem 1.25rem',border:'none',
                background: 'transparent',
                fontFamily:'var(--font-display)',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.05em',
                cursor:'pointer',transition:'all var(--duration-fast)',
                color: t===selectedTab ? 'var(--violet-light)' : 'var(--text-secondary)',
                borderBottom: t===selectedTab ? '2px solid var(--violet-light)' : '2px solid transparent',
                borderRadius:0,paddingBottom:'1rem',marginBottom:'-1rem',
              }}
            >{t}</button>
          ))}
        </div>

        {/* Tournament list */}
        <div className="tournaments-list">
          {filtered.map((t,i) => (
            <motion.div key={t.id} className="tourn-row"
              initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}}>
              <div className="tourn-row-icon">{t.emoji}</div>
              <div>
                <div className="tourn-row-name">{t.name}</div>
                <div className="tourn-row-game">{t.game} · {t.region}</div>
              </div>
              <div className="tourn-row-prize">{t.prize}</div>
              <div className="tourn-row-players">👥 {t.teams}</div>
              <span className={`tag ${t.statusClass}`}>{t.status}</span>
              <button
                className="btn btn-ghost btn-sm"
                id={`reg-btn-${t.id}`}
                onClick={() => openModal('tournament', t)}
              >
                Register
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bracket preview */}
        <div style={{marginTop:'3rem',padding:'3rem',borderRadius:'var(--radius-xl)',background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',textAlign:'center'}}>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--gold)',letterSpacing:'0.25em',marginBottom:'0.75rem'}}>TOURNAMENT BRACKETS</p>
          <h2 className="sec-title" style={{marginBottom:'1rem'}}>View Live <span>Brackets</span></h2>
          <p style={{color:'var(--text-secondary)',maxWidth:'480px',margin:'0 auto 2rem'}}>Track live scores, match replays, and team stats for all ongoing tournaments.</p>
          <button
            className="btn btn-primary btn-lg"
            id="brackets-btn"
            onClick={() => openModal('brackets')}
          >
            View All Brackets →
          </button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
