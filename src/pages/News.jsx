import { useState } from 'react'
import { motion } from 'framer-motion'
import { Footer } from '../components/Shared'

const ARTICLES = [
  { id:1, emoji:'🌴', cat:'Games', catColor:'#A78BFA', title:'Grand Theft Auto VI: Vice City Map Scale, Dynamic Weather & AI Pedestrian Engine Revealed', excerpt:'Rockstar Games provides an unprecedented look at Leonida. Groundbreaking euphoria physics, 200+ explorable interiors, and full dual-protagonist mechanics redefine the open-world genre.', date:'Oct 28, 2025', author:'Gameverse Bureau', bg:'linear-gradient(135deg,#3b0764,#1e1b4b)', featured:true },
  { id:2, emoji:'🎯', cat:'Esports', catColor:'#FCD34D', title:'VALORANT Champions Tour 2025: $2.25M World Finals Group Stage Schedule Confirmed', excerpt:'Sentinels, Fnatic, Gen.G, and Paper Rex headline the 16 qualified teams heading to Paris.', date:'Oct 27, 2025', bg:'linear-gradient(135deg,#831843,#1e1b4b)', featured:false },
  { id:3, emoji:'💣', cat:'Tech', catColor:'#38BDF8', title:'Counter-Strike 2 Releases Sub-Tick Overhaul & VacNet 3.0 Real-Time Server Anti-Cheat', excerpt:'Valve’s massive competitive update tackles tickrate discrepancy and eliminates high-ping advantages.', date:'Oct 26, 2025', bg:'linear-gradient(135deg,#0c4a6e,#1e293b)', featured:false },
  { id:4, emoji:'⚔️', cat:'Games', catColor:'#F59E0B', title:'Elden Ring: Shadow of the Erdtree Surpasses 10 Million Copies Sold Worldwide', excerpt:'FromSoftware and Hidetaka Miyazaki celebrate historic critical acclaim and record-breaking concurrent Steam player peaks.', date:'Oct 25, 2025', bg:'linear-gradient(135deg,#451a03,#18181b)', featured:false },
  { id:5, emoji:'⚡', cat:'Business', catColor:'#10B981', title:'NVIDIA Announces RTX 5090 Powered by Blackwell Architecture for 4K 240Hz Gaming', excerpt:'Up to 2.4x performance leap in Cyberpunk 2077 and Alan Wake 2 with next-gen DLSS 4 neural frame generation.', date:'Oct 24, 2025', bg:'linear-gradient(135deg,#064e3b,#0f172a)', featured:false },
  { id:6, emoji:'🚀', cat:'Platform', catColor:'#A78BFA', title:'GAMEVERSE 4.0 Cloud Sync: Sub-1ms Latency Across PC, PS5, Xbox & Steam Deck', excerpt:'New cloud infrastructure allows instant drop-in tournaments and seamless cross-save across all gaming devices.', date:'Oct 23, 2025', bg:'linear-gradient(135deg,#1e1b4b,#0f172a)', featured:false },
]

const TRENDING = [
  { n:1, title:'GTA VI Vice City Leaks: All Confirmed Vehicles, Weapons & Districts', views:'492K' },
  { n:2, title:'VALORANT Episode 9 Agent Tier List: Best Duelists & Initiators for Radiant', views:'388K' },
  { n:3, title:'Elden Ring DLC: How to Beat Promised Consort Radahn (Solo Melee Guide)', views:'341K' },
  { n:4, title:'Faker & T1 Advance to League of Legends World Championship Grand Finals', views:'310K' },
  { n:5, title:'CS2 Smoke Lineups: Essential Mirage, Inferno & Anubis Utility for Premier', views:'225K' },
]

import { useGameverse } from '../context/GameverseContext'

const CATS = ['All','Platform','Esports','Games','Tech','Business']

export default function NewsPage() {
  const [cat, setCat] = useState('All')
  const { openModal, addToast } = useGameverse()
  const featured = ARTICLES[0]
  const rest = ARTICLES.slice(1).filter(a => cat==='All' || a.cat===cat)

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <p className="sec-eyebrow">Gaming News</p>
            <h1 className="page-hero-title">Latest <span>Updates</span></h1>
            <p className="page-hero-desc">Stay ahead with the latest game releases, esports news, and platform updates.</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Cat filter */}
        <div style={{display:'flex',gap:'0.5rem',marginBottom:'2rem',flexWrap:'wrap'}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`filter-btn${cat===c?' active':''}`}>{c}</button>
          ))}
        </div>

        <div className="news-layout">
          {/* Main */}
          <div className="news-main-area">
            <motion.div
              className="news-featured-card"
              style={{ cursor: 'pointer' }}
              onClick={() => openModal('article', featured)}
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:0.1}}
            >
              <div className="news-featured-thumb" style={{background:featured.bg}}>
                <span style={{fontSize:'7rem'}}>{featured.emoji}</span>
                <div className="overlay"/>
              </div>
              <div className="news-feat-body">
                <div className="news-feat-cat">
                  <span className="tag tag-violet">{featured.cat}</span>
                </div>
                <h2 className="news-feat-title">{featured.title}</h2>
                <p className="news-feat-excerpt">{featured.excerpt}</p>
                <div className="news-feat-meta">
                  <span style={{color:'var(--text-muted)'}}>{featured.date}</span>
                  <span style={{color:'var(--cyan)',fontWeight:600}}>Read Full Story →</span>
                </div>
              </div>
            </motion.div>

            {/* Small articles grid */}
            <div className="news-grid-sm">
              {rest.map((a,i)=>(
                <motion.div
                  key={a.id}
                  className="news-card-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal('article', a)}
                  initial={{opacity:0,y:16}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true}}
                  transition={{delay:i*0.08}}
                >
                  <div className="news-sm-thumb" style={{background:a.bg}}>
                    <span style={{fontSize:'2.5rem'}}>{a.emoji}</span>
                  </div>
                  <div className="news-sm-body">
                    <div style={{marginBottom:'0.4rem'}}><span className="tag" style={{background:`${a.catColor}18`,border:`1px solid ${a.catColor}44`,color:a.catColor}}>{a.cat}</span></div>
                    <p className="news-sm-title">{a.title}</p>
                    <p className="news-sm-date">{a.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              className="btn btn-ghost"
              style={{width:'100%',marginTop:'1rem'}}
              id="load-more-news"
              onClick={() => addToast('News Feed Refreshed', 'Showing 15 latest verified stories from game studios and pro leagues.', '📰')}
            >
              Load More Articles ↓
            </button>
          </div>

          {/* Sidebar */}
          <div className="news-sidebar">
            <div className="sidebar-widget">
              <p className="widget-title">Trending Now</p>
              {TRENDING.map(t=>(
                <div
                  key={t.n}
                  className="trending-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal('article', { title: t.title, cat: 'Trending', excerpt: 'Deep-dive investigative breakdown and verified pro guides from the Gameverse editorial network.', emoji: '🔥', date: 'Trending Today', bg: 'linear-gradient(135deg,#3b0764,#1e1b4b)' })}
                >
                  <span className="trending-num">{t.n}</span>
                  <div>
                    <p className="trending-title">{t.title}</p>
                    <p className="trending-meta">👁 {t.views} views</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-widget">
              <p className="widget-title">Categories</p>
              {CATS.filter(c=>c!=='All').map(c=>(
                <div key={c} style={{display:'flex',justifyContent:'space-between',padding:'0.6rem 0',borderBottom:'1px solid var(--border-card)',cursor:'pointer'}}
                  onClick={()=>setCat(c)}>
                  <span style={{fontSize:'0.88rem',color: cat===c?'var(--violet-light)':'var(--text-secondary)',fontWeight:cat===c?600:400}}>{c}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--text-muted)'}}>{ARTICLES.filter(a=>a.cat===c).length}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-widget" style={{background:'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(245,158,11,0.06))',borderColor:'var(--border-active)'}}>
              <p className="widget-title">Newsletter</p>
              <p style={{fontSize:'0.82rem',color:'var(--text-secondary)',marginBottom:'1rem',lineHeight:1.6}}>Get the biggest gaming news delivered weekly.</p>
              <input type="email" placeholder="your@email.com" style={{
                width:'100%',padding:'0.65rem 1rem',borderRadius:'var(--radius-sm)',
                background:'var(--bg-base)',border:'1px solid var(--border-subtle)',
                color:'var(--text-primary)',fontFamily:'var(--font-body)',fontSize:'0.85rem',
                marginBottom:'0.75rem',outline:'none'
              }}/>
              <button className="btn btn-primary" style={{width:'100%'}} id="sidebar-newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
