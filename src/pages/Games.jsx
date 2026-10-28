import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameCard, GAMES, GENRES, Footer } from '../components/Shared'
import { useGameverse } from '../context/GameverseContext'

const ALL_GENRES = ['All', ...GENRES.map(g=>g.name)]
const SORTS = ['Popular','Rating','Newest','A–Z']

export default function GamesPage() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [sort, setSort] = useState('Popular')
  const [viewMode, setViewMode] = useState('grid')
  const { addToast } = useGameverse()

  const filtered = GAMES.filter(g => {
    const matchQ = g.title.toLowerCase().includes(query.toLowerCase()) || g.genre.toLowerCase().includes(query.toLowerCase())
    const matchG = genre === 'All' || g.genre === genre
    return matchQ && matchG
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Rating') return parseFloat(b.rating) - parseFloat(a.rating)
    if (sort === 'A–Z') return a.title.localeCompare(b.title)
    if (sort === 'Newest') return b.id - a.id
    const parseP = (p) => parseFloat(p.players.replace('M', '')) || 0
    return parseP(b) - parseP(a)
  })

  return (
    <div className="page">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
            <p className="sec-eyebrow">Multiverse Game Catalog</p>
            <h1 className="page-hero-title">Traverse <span>The Realms</span></h1>
            <p className="page-hero-desc">Discover 2,400+ next-generation games across all interconnected dimensions. Play instantly with zero cloud lag.</p>
          </motion.div>

          {/* Quick stats */}
          <div style={{display:'flex',gap:'2rem',marginTop:'2rem',flexWrap:'wrap'}}>
            {[{v:'2,400+',l:'Total Games'},{v:'42',l:'Genres'},{v:'180',l:'Free to Play'},{v:'32',l:'New This Month'}].map(s=>(
              <div key={s.l} style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.1rem',color:'var(--violet-light)'}}>{s.v}</span>
                <span style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Controls */}
        <motion.div className="games-controls" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text" placeholder="Search games..."
              value={query} onChange={e=>setQuery(e.target.value)}
            />
          </div>
          {SORTS.map(s=>(
            <button key={s} className={`filter-btn${sort===s?' active':''}`} onClick={()=>setSort(s)}>{s}</button>
          ))}
        </motion.div>

        {/* Genre filter */}
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'2.5rem',overflowX:'auto',paddingBottom:'0.5rem'}}>
          {ALL_GENRES.map(g=>(
            <button key={g} onClick={()=>setGenre(g)}
              style={{
                padding:'0.4rem 1rem',borderRadius:'100px',border:'1px solid',
                borderColor: genre===g ? 'var(--border-active)' : 'var(--border-card)',
                background: genre===g ? 'rgba(124,58,237,0.15)' : 'var(--bg-elevated)',
                color: genre===g ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize:'0.82rem',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',
                transition:'all var(--duration-fast)',
              }}
            >{g}</button>
          ))}
        </div>

        {/* Results count & view toggles */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.75rem',color:'var(--text-muted)'}}>
            Showing <span style={{color:'var(--violet-light)',fontWeight:700}}>{sorted.length}</span> games · Sorted by {sort}
          </p>
          <div style={{display:'flex',gap:'0.5rem'}}>
            <button
              className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('list')}
            >
              ≡ List
            </button>
          </div>
        </div>

        {/* Grid or List */}
        {sorted.length > 0 ? (
          <div className={viewMode === 'grid' ? 'games-grid-main' : 'games-list-view'} style={{marginBottom:'4rem'}}>
            {sorted.map((g,i) => <GameCard key={g.id} game={g} delay={i*0.04}/>)}
          </div>
        ) : (
          <div style={{textAlign:'center',padding:'6rem 2rem',color:'var(--text-muted)'}}>
            <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🎮</div>
            <p style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',marginBottom:'0.5rem'}}>No games found</p>
            <p style={{fontSize:'0.9rem'}}>Try a different search or genre filter</p>
          </div>
        )}

        {/* Upcoming games teaser */}
        <div style={{padding:'3rem',borderRadius:'var(--radius-xl)',background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',marginBottom:'4rem',textAlign:'center'}}>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.7rem',color:'var(--gold)',letterSpacing:'0.25em',marginBottom:'0.75rem'}}>COMING SOON</p>
          <h2 className="sec-title" style={{marginBottom:'1rem'}}>150+ Games <span>In Development</span></h2>
          <p style={{color:'var(--text-secondary)',maxWidth:'500px',margin:'0 auto 2rem'}}>The future is massive. Get early access to the next wave of gaming experiences before anyone else.</p>
          <button
            className="btn btn-primary btn-lg"
            id="wishlist-btn"
            onClick={() => addToast('Wishlist Protocol Active', 'You are prioritized for upcoming alpha playtests and drops.', '🔔')}
          >
            🔔 Join Master Wishlist
          </button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
