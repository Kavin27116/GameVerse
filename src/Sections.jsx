import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

// =============================================
// DATA
// =============================================
const GAMES = [
  {
    id: 1, emoji: '⚡', badge: 'HOT', badgeClass: 'badge-hot',
    genre: 'Battle Royale', title: 'NeonStrike: Apex Wars',
    desc: 'Drop into a cyberpunk megacity where 100 players fight for dominance using hi-tech weaponry and neural hacks.',
    rating: '9.8', players: '2.4M Players',
    bg: 'linear-gradient(135deg, #1a0030, #300060)',
  },
  {
    id: 2, emoji: '🌌', badge: 'NEW', badgeClass: 'badge-new',
    genre: 'Open World RPG', title: 'Void Realm: Infinity',
    desc: 'Explore an infinite procedurally generated universe with branching storylines and AI-driven NPCs.',
    rating: '9.5', players: '1.8M Players',
    bg: 'linear-gradient(135deg, #001a30, #003060)',
  },
  {
    id: 3, emoji: '🤖', badge: 'BETA', badgeClass: 'badge-beta',
    genre: 'Tactical FPS', title: 'CyberOps: Reborn',
    desc: 'Elite operators with cybernetic enhancements face off in hyper-realistic tactical arenas.',
    rating: '9.2', players: '950K Players',
    bg: 'linear-gradient(135deg, #1a1a00, #303000)',
  },
  {
    id: 4, emoji: '🏎️', badge: 'LIVE', badgeClass: 'badge-live',
    genre: 'Racing', title: 'HyperDrive 2077',
    desc: 'Race antigravity vehicles through neon-drenched megacity circuits at speeds exceeding Mach 1.',
    rating: '9.6', players: '1.2M Players',
    bg: 'linear-gradient(135deg, #1a0010, #300030)',
  },
  {
    id: 5, emoji: '🗡️', badge: 'HOT', badgeClass: 'badge-hot',
    genre: 'MOBA', title: 'ChronoClash: Legends',
    desc: 'Assemble a team of time-displaced heroes and battle across fractured timelines.',
    rating: '9.4', players: '3.1M Players',
    bg: 'linear-gradient(135deg, #001a1a, #003030)',
  },
  {
    id: 6, emoji: '🔮', badge: 'NEW', badgeClass: 'badge-new',
    genre: 'Strategy', title: 'Quantum Empire',
    desc: 'Command armies across quantum realms, where every decision splinters into alternate realities.',
    rating: '9.0', players: '680K Players',
    bg: 'linear-gradient(135deg, #1a000a, #30001a)',
  },
]

const TOURNAMENTS = [
  {
    id: 1, prize: '$500,000', name: 'World Cyber Championship 2025',
    game: 'NeonStrike: Apex Wars', players: '1,024 Teams',
    date: 'Dec 15-20, 2025', status: 'Registering',
    time: { days: 47, hours: 12, mins: 33 }
  },
  {
    id: 2, prize: '$250,000', name: 'Void Realm Masters League',
    game: 'Void Realm: Infinity', players: '512 Players',
    date: 'Nov 30, 2025', status: 'Open',
    time: { days: 31, hours: 8, mins: 15 }
  },
  {
    id: 3, prize: '$100,000', name: 'CyberOps Invitational',
    game: 'CyberOps: Reborn', players: '64 Teams',
    date: 'Nov 10-12, 2025', status: 'Qualifying',
    time: { days: 12, hours: 4, mins: 57 }
  },
]

const LEADERBOARD = [
  { rank: 1, avatar: '🎮', name: 'Ph4ntomX', country: '🇰🇷 Korea', score: '98,450', wins: '234W', kd: '8.7 KD' },
  { rank: 2, avatar: '⚡', name: 'NeonBlade', country: '🇯🇵 Japan', score: '95,210', wins: '219W', kd: '7.9 KD' },
  { rank: 3, avatar: '🔥', name: 'Vortex99', country: '🇺🇸 USA', score: '91,780', wins: '207W', kd: '7.2 KD' },
  { rank: 4, avatar: '🌌', name: 'CosmicAce', country: '🇩🇪 Germany', score: '88,320', wins: '196W', kd: '6.8 KD' },
  { rank: 5, avatar: '🤖', name: 'CyberGhost', country: '🇧🇷 Brazil', score: '85,100', wins: '188W', kd: '6.5 KD' },
  { rank: 6, avatar: '💀', name: 'DeathMark', country: '🇷🇺 Russia', score: '82,440', wins: '175W', kd: '6.1 KD' },
  { rank: 7, avatar: '🎯', name: 'Precisio', country: '🇫🇷 France', score: '79,210', wins: '165W', kd: '5.9 KD' },
]

const NEWS = [
  {
    id: 1, featured: true, emoji: '🚀', cat: 'Update', catColor: '#00f5ff',
    title: 'Game Zone 3.0 Launches with Neural Interface Support & Haptic Feedback Integration',
    excerpt: 'The most ambitious gaming platform update ever, bringing brain-computer interface compatibility and full-body haptic suits into the mainstream gaming experience.',
    date: 'Oct 28, 2025', author: 'Admin',
    bg: 'linear-gradient(135deg, #050518, #0a0040)',
  },
]

const NEWS_MINI = [
  { id: 2, emoji: '🏆', cat: 'Esports', catColor: '#ffd700', title: '$2M Prize Pool announced for 2026 World Circuit', date: 'Oct 27, 2025', bg: 'linear-gradient(135deg, #1a1500, #2a2000)' },
  { id: 3, emoji: '🎮', cat: 'Release', catColor: '#39ff14', title: 'HyperDrive 2077 Season 5 drops with Lunar Track', date: 'Oct 26, 2025', bg: 'linear-gradient(135deg, #0a001a, #15003a)' },
  { id: 4, emoji: '🤝', cat: 'Partnership', catColor: '#bf00ff', title: 'Game Zone partners with NVIDIA for ray-traced tournaments', date: 'Oct 25, 2025', bg: 'linear-gradient(135deg, #001515, #003030)' },
  { id: 5, emoji: '⚡', cat: 'Tech', catColor: '#ff006e', title: 'Quantum servers now deliver sub-1ms latency worldwide', date: 'Oct 24, 2025', bg: 'linear-gradient(135deg, #1a0010, #2a0025)' },
]

// =============================================
// NAVBAR
// =============================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-logo" href="#hero">
        <img src="/gameverse-logo.svg" alt="Gameverse Logo" />
        <div className="nav-brand">
          <span className="nav-brand-name">GAME ZONE</span>
          <span className="nav-brand-tagline">// Cybernetic Arena</span>
        </div>
      </a>

      <ul className="nav-links">
        {['Games', 'Tournaments', 'Leaderboard', 'News', 'Community'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>

      <button className="nav-cta" id="nav-join-btn">Join Now</button>
    </nav>
  )
}

// =============================================
// HERO
// =============================================
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 })
      gsap.fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.1 })
      gsap.fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.4 })
      gsap.fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 2 })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ◉ LIVE — Next-Gen Gaming Platform Online
        </motion.div>

        <h1 className="hero-title glitch" data-text="GAME ZONE">
          <span className="hero-title-line1">WELCOME TO</span>
          <span className="hero-title-line2">GAME ZONE</span>
        </h1>

        <p className="hero-subtitle">
          The ultimate <span>cyberpunk gaming arena</span> of the future. Play, compete, and dominate in immersive next-generation experiences.
        </p>

        <div className="hero-actions">
          <motion.button
            className="btn-primary"
            id="hero-play-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            ▶ Start Playing
          </motion.button>
          <motion.button
            className="btn-secondary"
            id="hero-explore-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            ⚡ Explore Games
          </motion.button>
        </div>

        <div className="hero-stats">
          {[
            { value: '50M+', label: 'Players Online' },
            { value: '2,400+', label: 'Games Library' },
            { value: '$10M+', label: 'Prize Money' },
            { value: '150+', label: 'Countries' },
          ].map(stat => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  )
}

// =============================================
// GAMES SECTION
// =============================================
function GamesSection() {
  return (
    <section id="games" className="games-section">
      <div className="section-header">
        <p className="section-tag">// Game Library</p>
        <h2 className="section-title">Featured <span>Games</span></h2>
        <p className="section-desc">Explore our curated collection of next-generation titles designed for the gaming elite.</p>
      </div>

      <div className="games-grid">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            className="game-card"
            id={`game-card-${game.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="game-card-thumb">
              <div className="game-thumb-bg" style={{ background: game.bg }}>
                {game.emoji}
              </div>
              <span className={`game-badge ${game.badgeClass}`}>{game.badge}</span>
            </div>
            <div className="game-card-body">
              <p className="game-genre">{game.genre}</p>
              <h3 className="game-title">{game.title}</h3>
              <p className="game-desc">{game.desc}</p>
              <div className="game-meta">
                <span className="game-rating">★ {game.rating}</span>
                <span className="game-players">{game.players}</span>
              </div>
              <button className="game-play-btn" id={`play-btn-${game.id}`}>
                <span>▶ Play Now</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// =============================================
// FEATURED GAME
// =============================================
function FeaturedSection() {
  return (
    <section className="featured-section">
      <div className="featured-inner">
        <motion.div
          className="featured-visual"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="featured-glow-ring" />
          <div className="featured-game-display">
            ⚡
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(191,0,255,0.08))'
            }} />
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
              fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.2em',
              color: 'rgba(0,245,255,0.6)', borderTop: '1px solid rgba(0,245,255,0.15)',
              paddingTop: '1rem', textTransform: 'uppercase',
            }}>
              🔴 LIVE NOW — 48,231 Watching
            </div>
          </div>
        </motion.div>

        <motion.div
          className="featured-info"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="featured-tag">Game of the Month</span>
          <h2 className="featured-title">
            NeonStrike:<br /><span>Apex Wars</span>
          </h2>
          <p className="featured-desc">
            The most anticipated battle royale of 2025. Drop into Neo-Tokyo, a sprawling cyberpunk megacity where 100 elite operatives clash using advanced weaponry, neural hacks, and antigravity mobility gear.
          </p>

          <div className="featured-specs">
            {[
              { label: 'Players', value: '2.4M Active' },
              { label: 'Mode', value: 'Battle Royale' },
              { label: 'Platform', value: 'All Platforms' },
              { label: 'Rating', value: '★ 9.8/10' },
            ].map(spec => (
              <div className="spec-item" key={spec.label}>
                <p className="spec-label">{spec.label}</p>
                <p className="spec-value">{spec.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.button
              className="btn-primary"
              id="featured-play-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              ▶ Play Now — Free
            </motion.button>
            <motion.button
              className="btn-secondary"
              id="featured-trailer-btn"
              whileHover={{ scale: 1.04 }}
            >
              ◎ Watch Trailer
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================
// TOURNAMENTS
// =============================================
function TournamentsSection() {
  const [counts, setCounts] = useState(
    TOURNAMENTS.map(t => ({ ...t.time }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => prev.map(c => {
        let { days, hours, mins } = c
        mins--
        if (mins < 0) { mins = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        if (days < 0) { days = 0; hours = 0; mins = 0 }
        return { days, hours, mins }
      }))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="tournaments" className="tournaments-section">
      <div className="section-header">
        <p className="section-tag">// Competitive Arena</p>
        <h2 className="section-title">Live <span>Tournaments</span></h2>
        <p className="section-desc">Compete in massive prize pool tournaments and prove you're the best in the world.</p>
      </div>

      <div className="tournaments-grid">
        {TOURNAMENTS.map((t, i) => (
          <motion.div
            key={t.id}
            className="tournament-card"
            id={`tournament-${t.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="tournament-prize">{t.prize}</div>
            <div className="tournament-name">{t.name}</div>

            <div className="tournament-info">
              <div className="tournament-info-item">
                <span className="icon">🎮</span> {t.game}
              </div>
              <div className="tournament-info-item">
                <span className="icon">👥</span> {t.players}
              </div>
              <div className="tournament-info-item">
                <span className="icon">📅</span> {t.date}
              </div>
              <div className="tournament-info-item">
                <span className="icon">◉</span> Status: {t.status}
              </div>
            </div>

            <div className="tournament-countdown">
              {[
                { val: counts[i]?.days ?? t.time.days, label: 'Days' },
                { val: counts[i]?.hours ?? t.time.hours, label: 'Hrs' },
                { val: counts[i]?.mins ?? t.time.mins, label: 'Min' },
                { val: '00', label: 'Sec' },
              ].map(unit => (
                <div className="countdown-unit" key={unit.label}>
                  <div className="countdown-value">
                    {String(unit.val).padStart(2, '0')}
                  </div>
                  <div className="countdown-label">{unit.label}</div>
                </div>
              ))}
            </div>

            <button className="register-btn" id={`register-btn-${t.id}`}>
              Register Now →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// =============================================
// LEADERBOARD
// =============================================
function LeaderboardSection() {
  return (
    <section id="leaderboard" className="leaderboard-section">
      <div className="section-header">
        <p className="section-tag">// Global Rankings</p>
        <h2 className="section-title">Top <span>Players</span></h2>
        <p className="section-desc">The elite warriors who dominate the Game Zone ladder worldwide.</p>
      </div>

      <div className="leaderboard-inner">
        <div className="leaderboard-table">
          {LEADERBOARD.map((player, i) => (
            <motion.div
              key={player.rank}
              className={`leaderboard-row rank-${player.rank}`}
              id={`leaderboard-row-${player.rank}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="rank-number">
                {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
              </div>

              <div className="player-info">
                <div className="player-avatar" style={{
                  background: player.rank === 1
                    ? 'radial-gradient(circle, rgba(255,215,0,0.2), rgba(255,165,0,0.1))'
                    : 'radial-gradient(circle, rgba(0,245,255,0.1), rgba(191,0,255,0.05))'
                }}>
                  {player.avatar}
                </div>
                <div>
                  <div className="player-name">{player.name}</div>
                  <div className="player-country">{player.country}</div>
                </div>
              </div>

              <div className="player-score">{player.score}</div>
              <div className="player-wins">{player.wins}</div>
              <div className="player-kd">{player.kd}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// NEWS
// =============================================
function NewsSection() {
  return (
    <section id="news" className="news-section">
      <div className="section-header">
        <p className="section-tag">// Latest Updates</p>
        <h2 className="section-title">Gaming <span>News</span></h2>
        <p className="section-desc">Stay ahead with the latest from the gaming universe.</p>
      </div>

      <div className="news-grid">
        <motion.div
          className="news-card featured-news"
          id="news-featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="news-thumb" style={{ background: NEWS[0].bg, fontSize: '6rem' }}>
            {NEWS[0].emoji}
          </div>
          <div className="news-body">
            <p className="news-cat" style={{ color: NEWS[0].catColor }}>{NEWS[0].cat}</p>
            <h3 className="news-title">{NEWS[0].title}</h3>
            <p className="news-excerpt">{NEWS[0].excerpt}</p>
            <div className="news-footer">
              <span className="news-date">{NEWS[0].date}</span>
              <span>By {NEWS[0].author}</span>
            </div>
          </div>
        </motion.div>

        <div className="news-sidebar">
          {NEWS_MINI.map((n, i) => (
            <motion.div
              key={n.id}
              className="news-mini"
              id={`news-mini-${n.id}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="news-mini-thumb" style={{ background: n.bg }}>
                {n.emoji}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: n.catColor, letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
                  {n.cat}
                </p>
                <p className="news-mini-title">{n.title}</p>
                <p className="news-mini-date">{n.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// NEWSLETTER
// =============================================
function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSent(true)
      setTimeout(() => setSent(false), 4000)
      setEmail('')
    }
  }

  return (
    <section className="newsletter-section">
      <motion.div
        className="newsletter-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-tag">// Stay Connected</p>
        <h2 className="section-title">Join the <span>Revolution</span></h2>
        <p className="section-desc">
          Get exclusive early access to new game releases, tournament invites, and insider intel — delivered straight to your inbox.
        </p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                marginTop: '2.5rem', padding: '1.5rem', borderRadius: '8px',
                border: '1px solid rgba(57,255,20,0.4)',
                background: 'rgba(57,255,20,0.07)',
                color: '#39ff14',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
              }}
            >
              ✓ You're in! Welcome to the Game Zone Network.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="newsletter-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                type="email"
                className="newsletter-input"
                placeholder="enter@youremail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="newsletter-email-input"
              />
              <button type="submit" className="newsletter-btn" id="newsletter-submit-btn">
                Subscribe →
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// =============================================
// FOOTER
// =============================================
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/gameverse-logo.svg" alt="Gameverse Logo" />
              <span className="footer-logo-name">GAME ZONE</span>
            </div>
            <p className="footer-tagline">
              The ultimate futuristic gaming arena. Where champions are forged and legends are born in the neon-lit digital frontier.
            </p>
            <div className="footer-social">
              {['🎮', '💬', '📺', '🐦', '📸'].map((icon, i) => (
                <a key={i} href="#" className="social-btn" aria-label={`Social ${i}`}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-col-title">Games</p>
            <ul className="footer-links">
              {['All Games', 'Battle Royale', 'RPG & Open World', 'Racing', 'Strategy', 'MOBA'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Compete</p>
            <ul className="footer-links">
              {['Tournaments', 'Leaderboard', 'Team Arena', 'Practice Mode', 'Coaching', 'Replays'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Community</p>
            <ul className="footer-links">
              {['Discord', 'Forums', 'Creator Hub', 'Merch Store', 'About Us', 'Careers'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 <span>GAME ZONE</span> — All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>
            Powered by GAMEZ™ Engine v3.0
          </span>
          <span>Privacy · Terms · DMCA</span>
        </div>
      </div>
    </footer>
  )
}

// =============================================
// MAIN EXPORT
// =============================================
export { Navbar, Hero, GamesSection, FeaturedSection, TournamentsSection, LeaderboardSection, NewsSection, Newsletter, Footer }
