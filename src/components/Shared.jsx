import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ============ SHARED DATA (ORIGINAL REAL GAMES) ============
export const GAMES = [
  { id:1, emoji:'🌴', genre:'Open World Action', title:'Grand Theft Auto VI', desc:'Vice City beckons in Rockstar Games’ most revolutionary open-world epic. Dual protagonists Lucia & Jason navigate a living, high-stakes neon underworld.', rating:'9.9', players:'15.4M', tag:'GOTY 2025', tagClass:'tag-gold', bg:'linear-gradient(135deg,#3b0764,#1e1b4b)' },
  { id:2, emoji:'🎯', genre:'Tactical FPS', title:'VALORANT', desc:'5v5 character-based tactical shooter by Riot Games. Combine hyper-precise gunplay with unique agent radiant abilities in high-stakes competitive ranked defusal.', rating:'9.8', players:'6.8M', tag:'ESPORTS', tagClass:'tag-teal', bg:'linear-gradient(135deg,#831843,#1e1b4b)' },
  { id:3, emoji:'⚔️', genre:'Action RPG', title:'Elden Ring: Shadow of the Erdtree', desc:'FromSoftware’s monumental expansion. Journey across the Realm of Shadow, battle ruthless demi-gods, and uncover the tragic secrets of Miquella.', rating:'9.8', players:'4.9M', tag:'MASTERPIECE', tagClass:'tag-gold', bg:'linear-gradient(135deg,#451a03,#18181b)' },
  { id:4, emoji:'⚡', genre:'Sci-Fi RPG', title:'Cyberpunk 2077: Phantom Liberty', desc:'Return to Night City as cyber-enhanced mercenary V. A high-stakes spy thriller in the dangerous district of Dogtown featuring Keanu Reeves & Idris Elba.', rating:'9.7', players:'3.8M', tag:'RTX 4K', tagClass:'tag-violet', bg:'linear-gradient(135deg,#701a75,#111827)' },
  { id:5, emoji:'🪖', genre:'Battle Royale', title:'Call of Duty: Warzone', desc:'Massive free-to-play battleground across Urzikstan. Modern loadouts, intense Gulag 1v1 showdowns, squad contracts, and relentless cinematic gunfights.', rating:'9.5', players:'8.2M', tag:'POPULAR', tagClass:'tag-orange', bg:'linear-gradient(135deg,#14532d,#0f172a)' },
  { id:6, emoji:'💣', genre:'Tactical FPS', title:'Counter-Strike 2', desc:'Valve’s legendary competitive shooter built on Source 2. Responsive volumetric smokes, sub-tick precision netcode, and Premier global leaderboards.', rating:'9.7', players:'5.4M', tag:'PRO CIRCUIT', tagClass:'tag-teal', bg:'linear-gradient(135deg,#0c4a6e,#1e293b)' },
  { id:7, emoji:'🧙', genre:'MOBA', title:'League of Legends', desc:'The world’s undisputed esports powerhouse. Command over 160 champions in fast-paced 5v5 Summoner’s Rift battles on the road to the World Championship.', rating:'9.6', players:'12.5M', tag:'#1 MOBA', tagClass:'tag-orange', bg:'linear-gradient(135deg,#1e3a5f,#0f172a)' },
  { id:8, emoji:'🥋', genre:'Fighting', title:'Tekken 8', desc:'Fist Meets Fate in Bandai Namco’s premier fighter powered by Unreal Engine 5. Experience the revolutionary aggressive Heat System and 32 destructive fighters.', rating:'9.4', players:'2.3M', tag:'NEW', tagClass:'tag-green', bg:'linear-gradient(135deg,#7f1d1d,#18181b)' },
  { id:9, emoji:'🏎️', genre:'Racing', title:'Forza Horizon 5', desc:'Experience stunning, ever-evolving open landscapes of Mexico. Drive hundreds of the world’s greatest supercars with photorealistic ray-traced visuals.', rating:'9.6', players:'3.5M', tag:'4K 120FPS', tagClass:'tag-teal', bg:'linear-gradient(135deg,#134e4a,#0f172a)' },
  { id:10, emoji:'🛡️', genre:'Hero Shooter', title:'Apex Legends', desc:'Squad up in Respawn’s high-octane battle royale. Master an expanding roster of unique Legends with game-changing tactical abilities on dynamic alien maps.', rating:'9.4', players:'4.1M', tag:'LIVE', tagClass:'tag-orange', bg:'linear-gradient(135deg,#312e81,#18181b)' },
  { id:11, emoji:'⛏️', genre:'Battle Royale', title:'Fortnite Chapter 6', desc:'Drop into Epic Games’ cultural titan powered by Unreal Engine 5.5 Nanite. Build, battle, explore user-created islands, and enjoy massive global crossover events.', rating:'9.5', players:'18.2M', tag:'HOT', tagClass:'tag-green', bg:'linear-gradient(135deg,#065f46,#1e1b4b)' },
  { id:12, emoji:'🔮', genre:'MOBA', title:'Dota 2', desc:'Endless strategic depth and legendary history. 124 fully unlocked heroes, complex courier and terrain mechanics, competing for the Aegis of Champions.', rating:'9.3', players:'3.1M', tag:'TI LEGEND', tagClass:'tag-violet', bg:'linear-gradient(135deg,#581c87,#0f172a)' },
]

export const GENRES = [
  { icon:'🌴', name:'Open World Action', count:118 },
  { icon:'🎯', name:'Tactical FPS', count:94 },
  { icon:'⚔️', name:'Action RPG', count:142 },
  { icon:'⚡', name:'Sci-Fi RPG', count:65 },
  { icon:'🪖', name:'Battle Royale', count:53 },
  { icon:'🧙', name:'MOBA', count:28 },
  { icon:'🥋', name:'Fighting', count:47 },
  { icon:'🏎️', name:'Racing', count:38 },
  { icon:'🛡️', name:'Hero Shooter', count:41 },
  { icon:'🚀', name:'Space Sim', count:31 },
]

import { useGameverse } from '../context/GameverseContext'

// ============ GAME CARD ============
export function GameCard({ game, delay=0 }) {
  const { openModal } = useGameverse()
  return (
    <motion.div
      className="card game-card"
      id={`game-${game.id}`}
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.5, delay }}
      onClick={() => openModal('game', game)}
      style={{ cursor: 'pointer' }}
    >
      <div className="game-thumb">
        <div className="game-thumb-img" style={{ background: game.bg }}>{game.emoji}</div>
        <div className="game-thumb-overlay" />
        <div className="game-thumb-tags">
          <span className={`tag ${game.tagClass}`}>{game.tag}</span>
        </div>
        <div className="game-rating-badge">★ {game.rating}</div>
      </div>
      <div className="game-body">
        <p className="game-genre-label">{game.genre}</p>
        <h3 className="game-title">{game.title}</h3>
        <p className="game-desc">{game.desc}</p>
        <div className="game-footer">
          <span className="game-players">👥 {game.players} Players</span>
          <button
            className="game-play-btn"
            onClick={(e) => {
              e.stopPropagation()
              openModal('game', game)
            }}
          >
            Play Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ============ FOOTER ============
export function Footer() {
  const { addToast } = useGameverse()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">
              <div className="nav-logo-text">
                <span className="footer-brand-name">GAME<span className="text-gradient">VERSE</span></span>
                <span className="nav-logo-sub">// MULTIVERSE ARENA</span>
              </div>
            </div>
            <p className="footer-bio">The premier futuristic gaming multiverse. Transcending physical boundaries to connect next-gen games, cosmic tournaments, and legendary players across dimensions.</p>
            <div className="footer-socials">
              {[
                { i:'🎮', name:'Discord' },
                { i:'💬', name:'Community Chat' },
                { i:'📺', name:'Twitch Stream' },
                { i:'🐦', name:'X / Twitter' },
                { i:'📸', name:'Instagram' },
              ].map((s,k) => (
                <button
                  key={k}
                  className="footer-social-btn"
                  onClick={() => addToast(`${s.name} Linked`, `Opening official Gameverse ${s.name} community hub`, '🔗')}
                  title={s.name}
                >
                  {s.i}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-col-title">Multiverse</p>
            <ul className="footer-links">
              {['Browse Games','Interdimensional Shards','Cloud Quantum Streaming','Neural Sync','VR Holo-Worlds'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Compete</p>
            <ul className="footer-links">
              {['Cosmic Tournaments','Multiverse Leaderboard','Grandmaster Ranks','Challenger Brackets','Replay Matrix'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Ecosystem</p>
            <ul className="footer-links">
              {['About Gameverse','Creator Universe','Press & Media','Roadmap 2026','Support Core','Privacy Protocol'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 GAMEVERSE Inc. All rights reserved. Across all connected dimensions.</span>
          <span>Engineered with WebGL & Quantum React · <a href="#">Security Protocol</a> · <a href="#">Terms of Verse</a></span>
        </div>
      </div>
    </footer>
  )
}
