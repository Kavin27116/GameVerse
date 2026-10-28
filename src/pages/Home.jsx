import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GameCard, GAMES, GENRES, Footer } from '../components/Shared'
import { useGameverse } from '../context/GameverseContext'

export default function HomePage() {
  const [activeGenre, setActiveGenre] = useState('All')
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const { openModal, addToast } = useGameverse()

  const trending = GAMES.slice(0, 4)

  const handleSub = e => {
    e.preventDefault()
    if (email) { setSubDone(true); setEmail('') }
  }

  return (
    <div className="page">
      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="hero-inner">
          <div>
            <motion.div className="hero-eyebrow" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
              <span className="live-dot"/>
              MULTIVERSE PROTOCOL v4.0 · 50M+ PLAYERS INTERCONNECTED
            </motion.div>
            <motion.h1 className="hero-title" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1}}>
              <span className="line1">ENTER THE NEXT-GEN</span>
              <span className="line2 text-gradient">GAMEVERSE</span>
            </motion.h1>
            <motion.p className="hero-sub" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.25}}>
              GAMEVERSE is the world's premier quantum gaming multiverse. <strong>Traverse infinite realms, compete in cosmic tournaments,</strong> and forge your legend across dimensions.
            </motion.p>
            <motion.div className="hero-actions" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.4}}>
              <Link to="/games"><button className="btn btn-primary btn-lg">Explore Realms →</button></Link>
              <Link to="/tournaments"><button className="btn btn-ghost btn-lg">🏆 Cosmic Tournaments</button></Link>
            </motion.div>
            <motion.div className="hero-stats" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7,delay:0.6}}>
              {[{v:'50M+',l:'Players'},{v:'2,400+',l:'Games'},{v:'$10M+',l:'Prizes'},{v:'4K',l:'Resolution'}].map(s=>(
                <div key={s.l}>
                  <div className="hero-stat-val">{s.v}</div>
                  <div className="hero-stat-lbl">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Game showcase panel */}
          <motion.div className="hero-visual" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.3}}>
            <div className="hero-game-showcase" style={{ cursor: 'pointer' }} onClick={() => openModal('game', GAMES[0])} title="Click to launch GTA VI">
              <div className="hero-game-preview" style={{background:'linear-gradient(135deg,#3b0764,#1e1b4b)'}}>
                🌴
                <div className="hero-game-overlay"/>
                <div className="hero-game-info">
                  <div className="hero-game-tag">
                    <span className="tag tag-gold">MOST ANTICIPATED GOTY</span>
                  </div>
                  <div className="hero-game-name">Grand Theft Auto VI</div>
                  <div className="hero-game-meta">★ 9.9 · Open World Action · Click to Preview</div>
                </div>
              </div>
            </div>
            <div
              className="hero-floating-card"
              style={{ cursor: 'pointer' }}
              onClick={() => openModal('tournament', { id: 1, name: 'VALORANT Champions Tour 2025 (VCT)', prize: '$2,250,000', game: 'VALORANT', region: 'Global', date: 'Dec 12–22' })}
              title="Click to register"
            >
              <div className="hfc-icon">🏆</div>
              <div>
                <div className="hfc-label">VCT CHAMPIONS 2025</div>
                <div className="hfc-val">$2,250,000 Prize</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRENDING GAMES ── */}
      <section className="home-trending">
        <div className="container">
          <div className="sec-header-row">
            <div>
              <p className="sec-eyebrow">Top Blockbusters</p>
              <h2 className="sec-title">Most Played <span>This Week</span></h2>
            </div>
            <Link to="/games"><button className="btn btn-ghost">View All Games →</button></Link>
          </div>
          <div className="grid-4">
            {trending.map((g,i) => <GameCard key={g.id} game={g} delay={i*0.07}/>)}
          </div>
        </div>
      </section>

      {/* ── GENRES ── */}
      <section className="home-genres">
        <div className="container">
          <div className="sec-header">
            <p className="sec-eyebrow">Browse By Category</p>
            <h2 className="sec-title">Explore <span>Game Genres</span></h2>
            <p className="sec-desc">From tactical competitive shooters to vast open-world action epics.</p>
          </div>
          <div className="genres-grid">
            {GENRES.map(g => (
              <button key={g.name} className={`genre-pill${activeGenre===g.name?' active':''}`} onClick={() => setActiveGenre(g.name)}>
                <span className="genre-icon">{g.icon}</span>
                <span>{g.name}</span>
                <span className="genre-count">{g.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED GAME SPOTLIGHT ── */}
      <section className="home-featured">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',alignItems:'center'}}>
            <motion.div
              initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}
              style={{
                borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid var(--border-active)',
                background:'linear-gradient(135deg,#701a75,#111827)', position:'relative', aspectRatio:'4/3',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8rem'
              }}
            >
              ⚡
              <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(6,8,20,0.92) 0%,transparent 60%)'}}/>
              <div style={{position:'absolute',bottom:'1.5rem',left:'1.5rem',right:'1.5rem'}}>
                <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.5rem'}}>
                  <span className="tag tag-gold">CRITIC MASTERPIECE</span>
                  <span className="tag tag-teal">RTX Path Tracing</span>
                </div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'1.4rem',fontWeight:800}}>Cyberpunk 2077: Phantom Liberty</div>
              </div>
              <div style={{position:'absolute',top:'1.5rem',right:'1.5rem',background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',borderRadius:'8px',padding:'0.5rem 0.9rem',fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--gold)'}}>
                ★ 9.7 / 10
              </div>
            </motion.div>

            <motion.div
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.15}}
            >
              <p className="sec-eyebrow">Blockbuster Spotlight</p>
              <h2 className="sec-title" style={{marginBottom:'1rem'}}>Cyberpunk 2077 <span>Phantom Liberty</span></h2>
              <p style={{fontSize:'1rem',color:'var(--text-secondary)',lineHeight:1.8,marginBottom:'1.5rem'}}>
                Return to Night City as cyber-enhanced mercenary V in a gripping espionage thriller with Keanu Reeves and Idris Elba. Dive deep into the walled combat zone of Dogtown with complete cyberware overhaul and full real-time ray-traced path tracing.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'2rem'}}>
                {[{l:'Developer',v:'CD Projekt Red'},{l:'Players Online',v:'3.8M Active'},{l:'Critic Score',v:'★ 9.7 / 10'},{l:'Graphics Tech',v:'DLSS 3.5 & Path Tracing'}].map(s=>(
                  <div key={s.l} style={{padding:'0.85rem 1rem',borderRadius:'var(--radius-sm)',background:'var(--bg-glass)',border:'1px solid var(--border-subtle)'}}>
                    <div style={{fontFamily:'var(--font-mono)',fontSize:'0.6rem',color:'var(--text-muted)',letterSpacing:'0.15em',marginBottom:'0.25rem'}}>{s.l}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'0.88rem',fontWeight:700,color:'var(--violet-light)'}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:'1rem'}}>
                <button className="btn btn-primary btn-lg" onClick={() => openModal('game', GAMES[3])}>
                  ▶ Play on Gameverse
                </button>
                <button className="btn btn-ghost" onClick={() => addToast('Streaming Official Trailer', 'Now playing Cyberpunk 2077: Phantom Liberty 4K official trailer', '📺')}>
                  ◎ Official Trailer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STATS ── */}
      <section style={{padding:'5rem 0'}}>
        <div className="container">
          <div className="grid-4">
            {[
              {icon:'🎮',val:'2,400+',lbl:'Games Available',sub:'Updated daily'},
              {icon:'🏆',val:'$10M+',lbl:'Prizes Awarded',sub:'Last 12 months'},
              {icon:'👥',val:'50M+',lbl:'Registered Players',sub:'Worldwide'},
              {icon:'🌍',val:'195',lbl:'Countries Active',sub:'Global coverage'},
            ].map((s,i)=>(
              <motion.div key={s.lbl} className="stat-box" style={{padding:'2rem'}}
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}>
                <div style={{fontSize:'2.5rem',marginBottom:'0.75rem'}}>{s.icon}</div>
                <div className="stat-box-val" style={{fontSize:'2.2rem'}}>{s.val}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'0.78rem',fontWeight:700,color:'var(--text-primary)',marginTop:'0.4rem'}}>{s.lbl}</div>
                <div style={{fontSize:'0.72rem',color:'var(--text-muted)',marginTop:'0.25rem'}}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="home-cta-strip">
        <div className="container">
          <div className="cta-strip">
            <div className="cta-text">
              <h2 className="cta-title">Ready to Dominate?</h2>
              <p className="cta-desc">Join 50 million players worldwide. Create your free account and start competing in minutes.</p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-gold btn-lg" id="cta-create-btn" onClick={() => openModal('auth')}>
                Create Free Account
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => addToast('Multiverse Protocols', 'Opening Gameverse Architecture 2026 whitepaper', '📖')}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{padding:'5rem 0 2rem'}}>
        <div className="container">
          <div style={{maxWidth:'560px',margin:'0 auto',textAlign:'center'}}>
            <p className="sec-eyebrow">Stay Updated</p>
            <h2 className="sec-title" style={{marginBottom:'0.75rem'}}>Get <span>Insider Access</span></h2>
            <p className="sec-desc" style={{margin:'0 auto 2rem'}}>Weekly drops: game releases, tournament invites, exclusive rewards.</p>
            <AnimatePresence mode="wait">
              {subDone ? (
                <motion.div key="ok" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                  style={{padding:'1.25rem',borderRadius:'var(--radius-md)',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.35)',color:'#34D399',fontFamily:'var(--font-display)',fontSize:'0.9rem',letterSpacing:'0.05em'}}>
                  ✓ Quantum sync confirmed! Welcome to GAMEVERSE.
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSub} style={{display:'flex',gap:'0.75rem'}} initial={{opacity:1}} exit={{opacity:0}}>
                  <div className="search-box" style={{flex:1}}>
                    <span className="search-icon">✉</span>
                    <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
                  </div>
                  <button type="submit" className="btn btn-primary" id="newsletter-btn">Subscribe</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
