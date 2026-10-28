import { motion } from 'framer-motion'
import { Footer } from '../components/Shared'

const FORUMS = [
  { icon:'⚔️', title:'General Discussion', desc:'Talk about anything gaming — news, opinions, memes.', posts:'48,210', members:'124K', hot:true },
  { icon:'🎮', title:'Game Strategies', desc:'Share guides, tips, tier lists and competitive insights.', posts:'32,890', members:'98K', hot:false },
  { icon:'🏆', title:'Tournament Talk', desc:'Discuss upcoming events, results, and bracket predictions.', posts:'18,440', members:'67K', hot:true },
  { icon:'🛠️', title:'Technical Support', desc:'Get help with bugs, settings, and performance optimization.', posts:'11,200', members:'45K', hot:false },
  { icon:'🎨', title:'Creative Corner', desc:'Fan art, clips, highlights, and content creator showcase.', posts:'9,870', members:'38K', hot:false },
  { icon:'🤝', title:'Team Finder', desc:'Find teammates, form squads, and recruit for your roster.', posts:'7,330', members:'29K', hot:false },
]

const EVENTS = [
  { day:30, month:'OCT', title:'VCT Champions Grand Finals Live Watch Party', desc:'Watch live on 4K multi-view streams · Exclusive in-game player card drops', type:'Esports' },
  { day:2, month:'NOV', title:'Developer AMA — Riot Games VALORANT Agent Team', desc:'Live Q&A on new agent kits, map rotations, and anti-cheat updates', type:'AMA' },
  { day:8, month:'NOV', title:'Elden Ring: Shadow of the Erdtree Lore Deep Dive', desc:'Community lore analysis, cut dialogue discussion, and speedrun routes', type:'Community' },
  { day:15, month:'NOV', title:'GTA VI Vice City Fan Concept Art & Mod Showcase', desc:'Top fan designs voted by the community win Gameverse VIP passes', type:'Contest' },
  { day:20, month:'NOV', title:'CS2 5v5 Premier Community Invitational', desc:'Charity tournament featuring top streamers, ex-pros, and open qualifiers', type:'Tournament' },
]

const COMMUNITY_STATS = [
  { icon:'👥', val:'50M+', lbl:'Members' },
  { icon:'💬', val:'12M+', lbl:'Posts' },
  { icon:'🌍', val:'195', lbl:'Countries' },
  { icon:'⭐', val:'4.9', lbl:'Avg Rating' },
]

import { useGameverse } from '../context/GameverseContext'

export default function CommunityPage() {
  const { openModal, addToast, rsvpEvent, savedEvents } = useGameverse()
  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <p className="sec-eyebrow">Community Hub</p>
            <h1 className="page-hero-title">Join the <span>Community</span></h1>
            <p className="page-hero-desc">Connect with 50 million gamers worldwide. Share, compete, and grow together.</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="community-stats">
          {COMMUNITY_STATS.map((s,i)=>(
            <motion.div key={s.lbl} className="stat-box" style={{padding:'1.75rem'}}
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}>
              <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>{s.icon}</div>
              <div className="stat-box-val">{s.val}</div>
              <div className="stat-box-lbl">{s.lbl}</div>
            </motion.div>
          ))}
        </div>

        <div className="community-main">
          {/* Forums */}
          <div>
            <div className="sec-header-row" style={{marginBottom:'1.25rem'}}>
              <div>
                <p className="sec-eyebrow">Discussion</p>
                <h2 className="sec-title">Forums</h2>
              </div>
              <button className="btn btn-ghost btn-sm">New Post +</button>
            </div>
            <div className="forum-list">
              {FORUMS.map((f,i)=>(
                <motion.div
                  key={f.title}
                  className="forum-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal('article', { title: f.title + ' // Discussion Hub', cat: 'Community Forum', excerpt: f.desc + ' Join thousands of active players sharing weapon builds, patch meta, and game guides.', emoji: f.icon, date: 'Live Thread', bg: 'linear-gradient(135deg,#1e1b4b,#0f172a)' })}
                  initial={{opacity:0,x:-16}}
                  whileInView={{opacity:1,x:0}}
                  viewport={{once:true}}
                  transition={{delay:i*0.06}}
                >
                  <div className="forum-icon">{f.icon}</div>
                  <div style={{flex:1}}>
                    <div className="forum-title">
                      {f.title} {f.hot && <span className="tag tag-orange" style={{marginLeft:'0.5rem',fontSize:'0.55rem'}}>HOT</span>}
                    </div>
                    <div className="forum-desc">{f.desc}</div>
                  </div>
                  <div className="forum-meta">
                    <div className="forum-posts">{f.posts}</div>
                    <div style={{fontSize:'0.65rem',color:'var(--text-muted)'}}>posts</div>
                    <div style={{fontSize:'0.65rem',color:'var(--text-muted)',marginTop:'0.25rem'}}>{f.members} members</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="sec-header-row" style={{marginBottom:'1.25rem'}}>
              <div>
                <p className="sec-eyebrow">Upcoming</p>
                <h2 className="sec-title">Events</h2>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => addToast('Google & Discord Sync', 'Exported 12 tournament & community events to your calendar.', '📅')}
              >
                View Calendar
              </button>
            </div>
            <div className="events-list">
              {EVENTS.map((e,i)=>{
                const isSaved = savedEvents.includes(e.title)
                return (
                  <motion.div key={e.title} className="event-card"
                    initial={{opacity:0,x:16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}}>
                    <div className="event-date-block">
                      <div className="event-day">{e.day}</div>
                      <div className="event-month">{e.month}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div className="event-title">{e.title}</div>
                      <div className="event-meta">{e.desc}</div>
                      <div style={{marginTop:'0.4rem'}}>
                        <span className="tag tag-violet" style={{fontSize:'0.55rem'}}>{e.type}</span>
                      </div>
                    </div>
                    <button
                      className="event-join-btn"
                      onClick={() => rsvpEvent(e.title)}
                      style={{ background: isSaved ? 'rgba(16,185,129,0.2)' : undefined, color: isSaved ? '#10B981' : undefined }}
                    >
                      {isSaved ? '✓ Reminder Set' : 'Join →'}
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Creator hub */}
        <div style={{margin:'3rem 0',padding:'3rem',borderRadius:'var(--radius-xl)',background:'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(245,158,11,0.06))',border:'1px solid var(--border-active)'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',alignItems:'center'}}>
            <div>
              <p className="sec-eyebrow">Creator Program</p>
              <h2 className="sec-title" style={{marginBottom:'1rem'}}>Become a <span>Creator</span></h2>
              <p style={{color:'var(--text-secondary)',lineHeight:1.8,marginBottom:'1.75rem'}}>
                Join over 10,000 content creators earning from their passion. Stream, post guides, and earn revenue shares, exclusive gear, and early game access.
              </p>
              <div style={{display:'flex',gap:'1.5rem',marginBottom:'2rem',flexWrap:'wrap'}}>
                {[{v:'10K+',l:'Creators'},{v:'$2M+',l:'Paid Out'},{v:'4.8★',l:'Creator Rating'}].map(s=>(
                  <div key={s.l}>
                    <div style={{fontFamily:'var(--font-display)',fontWeight:900,fontSize:'1.3rem',color:'var(--gold)'}}>{s.v}</div>
                    <div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary btn-lg"
                id="creator-apply-btn"
                onClick={() => openModal('creator')}
              >
                Apply Now →
              </button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              {[
                {icon:'📺',title:'Stream Integration',desc:'Native OBS/Twitch/YouTube support'},
                {icon:'💰',title:'Revenue Share',desc:'Earn 30% of referral subs'},
                {icon:'🎮',title:'Early Access',desc:'Play games before launch day'},
                {icon:'🏷️',title:'Exclusive Merch',desc:'Custom gear and branded drops'},
              ].map(f=>(
                <div key={f.title} style={{padding:'1.25rem',borderRadius:'var(--radius-md)',background:'var(--bg-base)',border:'1px solid var(--border-card)'}}>
                  <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>{f.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'0.82rem',fontWeight:700,marginBottom:'0.25rem'}}>{f.title}</div>
                  <div style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
