import { useState } from 'react'
import { motion } from 'framer-motion'
import { Footer } from '../components/Shared'

const PLAYERS = [
  { rank:1, avatar:'👑', name:'Faker (T1)', country:'🇰🇷 South Korea', game:'League of Legends', score:'99,850', wins:'420', kd:'9.4', change:'—', changeType:'same' },
  { rank:2, avatar:'⚡', name:'s1mple (NAVI)', country:'🇺🇦 Ukraine', game:'Counter-Strike 2', score:'98,210', wins:'388', kd:'8.9', change:'+1', changeType:'up' },
  { rank:3, avatar:'🎯', name:'TenZ (Sentinels)', country:'🇨🇦 Canada', game:'VALORANT', score:'96,440', wins:'365', kd:'8.3', change:'+2', changeType:'up' },
  { rank:4, avatar:'🥋', name:'Arslan Ash', country:'🇵🇰 Pakistan', game:'Tekken 8', score:'94,100', wins:'342', kd:'8.1', change:'—', changeType:'same' },
  { rank:5, avatar:'🛡️', name:'ImperialHal (Falcons)', country:'🇺🇸 USA', game:'Apex Legends', score:'92,350', wins:'310', kd:'7.8', change:'+3', changeType:'up' },
  { rank:6, avatar:'💣', name:'m0NESY (G2 Esports)', country:'🇪🇺 Europe', game:'Counter-Strike 2', score:'90,800', wins:'295', kd:'7.5', change:'-1', changeType:'down' },
  { rank:7, avatar:'🧙', name:'Chovy (Gen.G)', country:'🇰🇷 South Korea', game:'League of Legends', score:'88,400', wins:'284', kd:'7.2', change:'—', changeType:'same' },
  { rank:8, avatar:'⛏️', name:'Mongraal', country:'🇬🇧 United Kingdom', game:'Fortnite', score:'86,200', wins:'271', kd:'6.9', change:'+2', changeType:'up' },
  { rank:9, avatar:'🪖', name:'Scump (OpTic)', country:'🇺🇸 USA', game:'Call of Duty: Warzone', score:'84,700', wins:'259', kd:'6.6', change:'-2', changeType:'down' },
  { rank:10, avatar:'🔮', name:'Topson (Tundra)', country:'🇫🇮 Finland', game:'Dota 2', score:'82,100', wins:'244', kd:'6.3', change:'+1', changeType:'up' },
]

import { useGameverse } from '../context/GameverseContext'

const GAME_TABS = ['Global','VALORANT','Counter-Strike 2','League of Legends','Apex Legends','Tekken 8']

export default function LeaderboardPage() {
  const [gameTab, setGameTab] = useState('Global')
  const { openModal, addToast } = useGameverse()

  const activePlayers = gameTab === 'Global' ? PLAYERS : PLAYERS.filter(p => p.game.toLowerCase().includes(gameTab.toLowerCase()))
  const displayPlayers = activePlayers.length >= 3 ? activePlayers : PLAYERS
  const podium = displayPlayers.slice(0,3)
  const rest = displayPlayers.slice(3)

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <p className="sec-eyebrow">Multiverse Hall of Fame</p>
            <h1 className="page-hero-title">Cosmic <span>Leaderboard</span></h1>
            <p className="page-hero-desc">The elite champions across all interconnected dimensions ranked by cosmic rating, tournament victories, and win consistency.</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Game filter tabs */}
        <div style={{display:'flex',gap:'0.5rem',marginBottom:'2.5rem',flexWrap:'wrap'}}>
          {GAME_TABS.map(t=>(
            <button key={t} onClick={()=>setGameTab(t)}
              className={`filter-btn${gameTab===t?' active':''}`}
            >{t}</button>
          ))}
        </div>

        {/* Podium */}
        <motion.div className="podium-row" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
          {/* 2nd */}
          {podium[1] && (
            <div className="podium-card p2" style={{ cursor: 'pointer' }} onClick={() => openModal('player', podium[1])}>
              <div className="podium-medal">🥈</div>
              <div className="podium-avatar">{podium[1].avatar}</div>
              <div className="podium-name">{podium[1].name}</div>
              <div className="podium-score">{podium[1].score} pts</div>
              <div className="podium-country">{podium[1].country}</div>
            </div>
          )}
          {/* 1st */}
          {podium[0] && (
            <div className="podium-card p1" style={{ cursor: 'pointer' }} onClick={() => openModal('player', podium[0])}>
              <div className="podium-medal" style={{fontSize:'2.5rem'}}>🥇</div>
              <div className="podium-avatar" style={{fontSize:'3rem'}}>{podium[0].avatar}</div>
              <div className="podium-name" style={{fontSize:'1.05rem',color:'var(--gold)'}}>{podium[0].name}</div>
              <div className="podium-score" style={{fontSize:'0.9rem'}}>{podium[0].score} pts</div>
              <div className="podium-country">{podium[0].country}</div>
              <div style={{marginTop:'0.75rem'}}><span className="tag tag-gold">Champion</span></div>
            </div>
          )}
          {/* 3rd */}
          {podium[2] && (
            <div className="podium-card p3" style={{ cursor: 'pointer' }} onClick={() => openModal('player', podium[2])}>
              <div className="podium-medal">🥉</div>
              <div className="podium-avatar">{podium[2].avatar}</div>
              <div className="podium-name">{podium[2].name}</div>
              <div className="podium-score">{podium[2].score} pts</div>
              <div className="podium-country">{podium[2].country}</div>
            </div>
          )}
        </motion.div>

        {/* Full table */}
        <div className="lb-table">
          <div className="lb-header">
            <span style={{textAlign:'center'}}>Rank</span>
            <span>Player</span>
            <span>Score</span>
            <span>Wins</span>
            <span>K/D</span>
            <span style={{textAlign:'center'}}>±</span>
          </div>
          {rest.map((p,i)=>(
            <motion.div
              key={p.rank}
              className={`lb-row${p.rank===1?' gold':''}`}
              id={`lb-row-${p.rank}`}
              style={{ cursor: 'pointer' }}
              onClick={() => openModal('player', p)}
              initial={{opacity:0,x:-20}}
              whileInView={{opacity:1,x:0}}
              viewport={{once:true}}
              transition={{delay:i*0.05}}
            >
              <div className={`lb-rank r${p.rank<=3?p.rank:'n'}`}>#{p.rank}</div>
              <div className="lb-player">
                <div className="lb-avatar">{p.avatar}</div>
                <div>
                  <div className="lb-name">{p.name}</div>
                  <div className="lb-country">{p.country} · {p.game}</div>
                </div>
              </div>
              <div className="lb-score">{p.score}</div>
              <div className="lb-wins">{p.wins}W</div>
              <div className="lb-kd">{p.kd}</div>
              <div className={`lb-change ${p.changeType}`}>{p.changeType==='up'?'▲':p.changeType==='down'?'▼':'—'} {p.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <div style={{textAlign:'center',margin:'2.5rem 0 4rem'}}>
          <button
            className="btn btn-ghost"
            id="load-more-lb"
            onClick={() => addToast('Ladder Updated', 'Synced top 100 Grandmaster ranked players worldwide.', '📊')}
          >
            Load More Players ↓
          </button>
        </div>

        {/* Your rank CTA */}
        <div style={{padding:'3rem',borderRadius:'var(--radius-xl)',background:'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(6,182,212,0.06))',border:'1px solid var(--border-active)',textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🎯</div>
          <h2 className="sec-title" style={{marginBottom:'0.75rem'}}>Where Do <span>You Rank?</span></h2>
          <p style={{color:'var(--text-secondary)',maxWidth:'480px',margin:'0 auto 2rem'}}>Create your free account to track your stats, climb the ladder, and compete in ranked seasons.</p>
          <button className="btn btn-primary btn-lg" id="rank-join-btn" onClick={() => openModal('auth')}>
            Start Climbing →
          </button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
