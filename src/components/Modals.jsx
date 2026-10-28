import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameverse } from '../context/GameverseContext'

export function GlobalModals() {
  const { modal, closeModal, addToast, toasts, removeToast, loginUser, registerTournament, toggleWishlist, wishlist } = useGameverse()

  if (!modal && toasts.length === 0) return null

  return (
    <>
      {/* Toast Notification Container */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              className="hud-toast"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={() => removeToast(t.id)}
            >
              <div className="toast-icon">{t.icon}</div>
              <div className="toast-content">
                <div className="toast-title">{t.title}</div>
                <div className="toast-msg">{t.message}</div>
              </div>
              <button className="toast-close">✕</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal Backdrop & Content */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close">✕</button>

              {/* 1. AUTH MODAL */}
              {modal.type === 'auth' && <AuthModalContent onLogin={loginUser} />}

              {/* 2. GAME LAUNCHER MODAL */}
              {modal.type === 'game' && <GameModalContent game={modal.data} wishlist={wishlist} onToggleWishlist={toggleWishlist} addToast={addToast} />}

              {/* 3. TOURNAMENT REGISTRATION MODAL */}
              {modal.type === 'tournament' && <TournamentModalContent tournament={modal.data} onRegister={registerTournament} />}

              {/* 4. BRACKETS VIEWER MODAL */}
              {modal.type === 'brackets' && <BracketsModalContent />}

              {/* 5. PLAYER PROFILE MODAL */}
              {modal.type === 'player' && <PlayerModalContent player={modal.data} addToast={addToast} />}

              {/* 6. ARTICLE READER MODAL */}
              {modal.type === 'article' && <ArticleModalContent article={modal.data} addToast={addToast} />}

              {/* 7. CREATOR PROGRAM MODAL */}
              {modal.type === 'creator' && <CreatorModalContent addToast={addToast} onClose={closeModal} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── 1. AUTH MODAL CONTENT ──
function AuthModalContent({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleAuth = (e) => {
    e.preventDefault()
    const name = username.trim() || (isRegister ? 'Nova_Specter' : 'Cyber_Phantom')
    onLogin({
      name,
      tag: `#${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: '🎮',
      rank: 'Grandmaster',
      level: 42,
    })
  }

  const handleOAuth = (provider) => {
    onLogin({
      name: `${provider}_Player`,
      tag: '#2026',
      avatar: provider === 'Discord' ? '💬' : provider === 'Steam' ? '💨' : '🎯',
      rank: 'Radiant',
      level: 68,
    })
  }

  return (
    <div className="modal-auth">
      <div className="auth-header">
        <div className="auth-badge">GAMEVERSE ID</div>
        <h2 className="modal-title">{isRegister ? 'Join the Multiverse' : 'Sign in to Gameverse'}</h2>
        <p className="modal-sub">Access cloud cross-saves, tournament brackets, and pro stats across all realms.</p>
      </div>

      <div className="auth-oauth-grid">
        <button className="oauth-btn discord" onClick={() => handleOAuth('Discord')}>
          <span>💬</span> Discord
        </button>
        <button className="oauth-btn steam" onClick={() => handleOAuth('Steam')}>
          <span>💨</span> Steam
        </button>
        <button className="oauth-btn riot" onClick={() => handleOAuth('Riot')}>
          <span>🎯</span> Riot Games
        </button>
      </div>

      <div className="auth-divider"><span>OR VIA CREDENTIALS</span></div>

      <form onSubmit={handleAuth} className="modal-form">
        {isRegister && (
          <div className="form-group">
            <label>In-Game Alias / GamerTag</label>
            <input
              type="text"
              placeholder="e.g. ApexPredator_99"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required={isRegister}
            />
          </div>
        )}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="player@gameverse.gg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••••••" required />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem', padding: '0.9rem' }}>
          {isRegister ? 'Create Free Account →' : 'Enter Gameverse →'}
        </button>
      </form>

      <div className="auth-footer-toggle">
        {isRegister ? (
          <span>Already have a Gameverse ID? <button type="button" onClick={() => setIsRegister(false)}>Sign In</button></span>
        ) : (
          <span>New to Gameverse? <button type="button" onClick={() => setIsRegister(true)}>Create Account</button></span>
        )}
      </div>
    </div>
  )
}

// ── 2. GAME LAUNCHER MODAL CONTENT ──
function GameModalContent({ game, wishlist, onToggleWishlist, addToast }) {
  const [region, setRegion] = useState('US-East')
  const [launching, setLaunching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')

  const isFav = wishlist.includes(game.id)

  const handleLaunch = () => {
    if (launching) return
    setLaunching(true)
    setProgress(15)
    setStatusText('Allocating Quantum Cloud Blade...')

    setTimeout(() => {
      setProgress(55)
      setStatusText('Validating Neural DRM & Anti-Cheat...')
    }, 800)

    setTimeout(() => {
      setProgress(90)
      setStatusText('Syncing 4K 120FPS Stream to Device...')
    }, 1600)

    setTimeout(() => {
      setProgress(100)
      setStatusText('CONNECTED! Game Session Running.')
      addToast('Game Session Live', `Now playing ${game.title} via Gameverse Cloud (14ms)`, '🎮')
      setTimeout(() => setLaunching(false), 2000)
    }, 2400)
  }

  return (
    <div className="modal-game">
      <div className="game-modal-banner" style={{ background: game.bg }}>
        <span className="game-modal-emoji">{game.emoji}</span>
        <div className="game-modal-badge-row">
          <span className={`tag ${game.tagClass}`}>{game.tag}</span>
          <span className="tag tag-gold">★ {game.rating}</span>
        </div>
      </div>

      <div className="game-modal-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
          <div>
            <p className="game-genre-label">{game.genre}</p>
            <h2 className="modal-title" style={{ fontSize: '1.6rem' }}>{game.title}</h2>
          </div>
          <button
            className={`btn-wishlist-toggle ${isFav ? 'active' : ''}`}
            onClick={() => onToggleWishlist(game.id, game.title)}
            title={isFav ? 'In Wishlist' : 'Add to Wishlist'}
          >
            {isFav ? '❤️ Saved' : '🤍 Wishlist'}
          </button>
        </div>

        <p className="game-desc" style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{game.desc}</p>

        {/* Server Specs & Region */}
        <div className="game-modal-specs">
          <div className="spec-card">
            <span className="spec-label">ACTIVE PLAYERS</span>
            <span className="spec-val">👥 {game.players}</span>
          </div>
          <div className="spec-card">
            <span className="spec-label">STREAM PROTOCOL</span>
            <span className="spec-val">⚡ 4K · 120 FPS</span>
          </div>
          <div className="spec-card">
            <span className="spec-label">SHARD REGION</span>
            <select value={region} onChange={e => setRegion(e.target.value)} className="region-select">
              <option value="US-East">US-East (12ms)</option>
              <option value="EU-Central">EU-Central (16ms)</option>
              <option value="Asia-Tokyo">Asia-Tokyo (24ms)</option>
            </select>
          </div>
        </div>

        {/* Launcher simulator */}
        {launching ? (
          <div className="launcher-progress-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem', color: 'var(--cyan)' }}>
              <span>{statusText}</span>
              <span>{progress}%</span>
            </div>
            <div className="launcher-bar-track">
              <div className="launcher-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleLaunch}>
              ▶ Launch Game Session
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => addToast('Official Replay Loaded', 'Streaming highlight reel from pro circuit', '📺')}>
              ◎ Watch Clip
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── 3. TOURNAMENT REGISTRATION MODAL ──
function TournamentModalContent({ tournament, onRegister }) {
  const [teamName, setTeamName] = useState('')
  const [captainDiscord, setCaptainDiscord] = useState('')
  const [platform, setPlatform] = useState('PC')

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(tournament.id, tournament.name, teamName)
  }

  return (
    <div className="modal-tourn">
      <div className="auth-header">
        <div className="auth-badge">ESPORTS REGISTRATION</div>
        <h2 className="modal-title">{tournament.name}</h2>
        <p className="modal-sub">Compete for <strong>{tournament.prize}</strong> prize pool. Region: {tournament.region}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '1.25rem 0', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PRIZE POOL</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)' }}>{tournament.prize}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>GAME</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tournament.game}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DATES</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--violet-light)' }}>{tournament.date}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label>Team / Squad Name</label>
          <input
            type="text"
            placeholder="e.g. Sentinels Quantum"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Captain Discord Handle (for Check-in)</label>
          <input
            type="text"
            placeholder="username#0000"
            value={captainDiscord}
            onChange={e => setCaptainDiscord(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Playing Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="region-select">
            <option value="PC">PC (Direct Input / 240Hz)</option>
            <option value="PS5">PlayStation 5</option>
            <option value="Xbox">Xbox Series X</option>
          </select>
        </div>

        <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
          ✓ Confirm Tournament Entry
        </button>
      </form>
    </div>
  )
}

// ── 4. BRACKETS VIEWER MODAL ──
function BracketsModalContent() {
  const matches = [
    { round: 'Quarterfinals', m1: 'Sentinels (2)', m2: 'Paper Rex (1)', winner: 'Sentinels' },
    { round: 'Quarterfinals', m1: 'Fnatic (2)', m2: 'Team Liquid (0)', winner: 'Fnatic' },
    { round: 'Quarterfinals', m1: 'Gen.G (2)', m2: 'T1 (1)', winner: 'Gen.G' },
    { round: 'Quarterfinals', m1: 'NAVI (2)', m2: 'G2 Esports (0)', winner: 'NAVI' },
    { round: 'Semifinals', m1: 'Sentinels (2)', m2: 'Fnatic (1)', winner: 'Sentinels' },
    { round: 'Semifinals', m1: 'Gen.G (2)', m2: 'NAVI (0)', winner: 'Gen.G' },
    { round: 'Grand Finals', m1: 'Sentinels (3)', m2: 'Gen.G (2)', winner: 'Sentinels 🏆' },
  ]

  return (
    <div className="modal-brackets">
      <div className="auth-header">
        <div className="auth-badge">LIVE PLAYOFF BRACKET</div>
        <h2 className="modal-title">VCT Champions World Finals 2025</h2>
        <p className="modal-sub">Double Elimination Championship Bracket · $2,250,000 Main Event</p>
      </div>

      <div className="brackets-tree">
        {matches.map((m, idx) => (
          <div key={idx} className="bracket-match-card">
            <div className="bm-round">{m.round}</div>
            <div className="bm-teams">
              <div className={`bm-team ${m.winner.includes(m.m1.split(' ')[0]) ? 'win' : ''}`}>{m.m1}</div>
              <div className="bm-vs">VS</div>
              <div className={`bm-team ${m.winner.includes(m.m2.split(' ')[0]) ? 'win' : ''}`}>{m.m2}</div>
            </div>
            <div className="bm-winner">Winner: <span>{m.winner}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 5. PLAYER PROFILE MODAL ──
function PlayerModalContent({ player, addToast }) {
  const [following, setFollowing] = useState(false)

  const handleFollow = () => {
    setFollowing(!following)
    addToast(
      following ? 'Unfollowed Player' : 'Followed Player!',
      `${player.name} added to your live match tracking list`,
      following ? 'ℹ️' : '🌟'
    )
  }

  return (
    <div className="modal-player">
      <div className="player-hero-strip">
        <div className="player-avatar-large">{player.avatar}</div>
        <div>
          <div className="tag tag-gold" style={{ display: 'inline-block', marginBottom: '0.4rem' }}>RANK #{player.rank} WORLDWIDE</div>
          <h2 className="modal-title" style={{ fontSize: '1.7rem' }}>{player.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{player.country} · Pro Player for {player.game}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', margin: '1.5rem 0' }}>
        <div className="stat-box" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="stat-box-val" style={{ fontSize: '1.4rem' }}>{player.score}</div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>RATING</div>
        </div>
        <div className="stat-box" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="stat-box-val" style={{ fontSize: '1.4rem', color: '#10B981' }}>{player.wins}</div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>VICTORIES</div>
        </div>
        <div className="stat-box" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="stat-box-val" style={{ fontSize: '1.4rem', color: 'var(--cyan)' }}>{player.kd}</div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>K/D RATIO</div>
        </div>
        <div className="stat-box" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="stat-box-val" style={{ fontSize: '1.4rem', color: 'var(--violet-light)' }}>Tier 1</div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DIVISION</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button className={`btn ${following ? 'btn-ghost' : 'btn-primary'}`} style={{ flex: 1 }} onClick={handleFollow}>
          {following ? '✓ Tracking Matches' : '+ Follow Player'}
        </button>
        <button className="btn btn-ghost" onClick={() => addToast('VOD Loaded', `Opening match replay for ${player.name}`, '📺')}>
          ▶ Watch Replay
        </button>
      </div>
    </div>
  )
}

// ── 6. ARTICLE READER MODAL ──
function ArticleModalContent({ article, addToast }) {
  const [likes, setLikes] = useState(148)
  const [hasLiked, setHasLiked] = useState(false)
  const [comments, setComments] = useState([
    { user: 'RadiantSniper', text: 'Insane update! Can’t wait to test the sub-tick netcode on high refresh monitors.' },
    { user: 'Valkyrie99', text: 'The visual improvements look photorealistic. Best platform implementation so far.' },
  ])
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(l => l + 1)
      setHasLiked(true)
      addToast('Story Upvoted!', 'Thank you for your feedback.', '👍')
    }
  }

  const handlePostComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setComments(prev => [...prev, { user: 'You (Gameverse User)', text: newComment.trim() }])
    setNewComment('')
    addToast('Comment Posted', 'Your reply is visible to the community', '💬')
  }

  return (
    <div className="modal-article">
      <div className="article-modal-header" style={{ background: article.bg }}>
        <span style={{ fontSize: '4.5rem' }}>{article.emoji}</span>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span className="tag tag-violet">{article.cat}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{article.date} · By {article.author || 'Gameverse Editorial'}</span>
        </div>

        <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{article.title}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem' }}>{article.excerpt}</p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Engineering benchmarks conducted on the unified Gameverse mesh show latency reductions of up to 45% over legacy UDP protocols. Independent tests confirm frame stability across RTX 40 and 50 series systems with zero packet dropouts in tournament conditions.
        </p>

        {/* Like & Share */}
        <div style={{ display: 'flex', gap: '0.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
          <button className={`btn btn-sm ${hasLiked ? 'btn-primary' : 'btn-ghost'}`} onClick={handleLike}>
            👍 {likes} Upvotes
          </button>
          <button className="btn btn-sm btn-ghost" onClick={() => addToast('Link Copied', 'Article link copied to your clipboard!', '🔗')}>
            🔗 Share Link
          </button>
        </div>

        {/* Comments section */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '1rem' }}>Community Discussion ({comments.length})</h3>
        <div className="article-comments-list">
          {comments.map((c, i) => (
            <div key={i} className="comment-bubble">
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--cyan)', marginBottom: '0.2rem' }}>{c.user}</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{c.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handlePostComment} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '0.85rem' }}
          />
          <button type="submit" className="btn btn-primary btn-sm">Post Reply</button>
        </form>
      </div>
    </div>
  )
}

// ── 7. CREATOR PROGRAM MODAL ──
function CreatorModalContent({ addToast, onClose }) {
  const [handle, setHandle] = useState('')
  const [platform, setPlatform] = useState('Twitch')

  const handleSubmit = (e) => {
    e.preventDefault()
    addToast('Application Received!', 'Our Creator Partnership team will review your channel within 48h.', '🌟')
    onClose()
  }

  return (
    <div className="modal-creator" style={{ padding: '1.5rem' }}>
      <div className="auth-header">
        <div className="auth-badge">PARTNERSHIP PROGRAM</div>
        <h2 className="modal-title">Join Gameverse Creator Universe</h2>
        <p className="modal-sub">Earn revenue shares, receive early access drops, and host verified community tournaments.</p>
      </div>

      <form onSubmit={handleSubmit} className="modal-form" style={{ marginTop: '1.5rem' }}>
        <div className="form-group">
          <label>Primary Content Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="region-select">
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube Gaming</option>
            <option value="Kick">Kick</option>
            <option value="TikTok">TikTok Gaming</option>
          </select>
        </div>
        <div className="form-group">
          <label>Channel URL or Handle</label>
          <input
            type="text"
            placeholder="https://twitch.tv/yourchannel"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Average Live Concurrent Viewers or Subscribers</label>
          <input type="text" placeholder="e.g. 5,000+ Subs / 250+ CCV" required />
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
          Submit Partnership Application →
        </button>
      </form>
    </div>
  )
}
