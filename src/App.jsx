import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ThreeBackground from './ThreeBackground'
import CustomCursor from './CustomCursor'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Games from './pages/Games'
import Tournaments from './pages/Tournaments'
import Leaderboard from './pages/Leaderboard'
import News from './pages/News'
import Community from './pages/Community'
import { GameverseProvider } from './context/GameverseContext'
import { GlobalModals } from './components/Modals'

// Page transition wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Animated routes
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home/></PageWrapper>}/>
        <Route path="/games" element={<PageWrapper><Games/></PageWrapper>}/>
        <Route path="/tournaments" element={<PageWrapper><Tournaments/></PageWrapper>}/>
        <Route path="/leaderboard" element={<PageWrapper><Leaderboard/></PageWrapper>}/>
        <Route path="/news" element={<PageWrapper><News/></PageWrapper>}/>
        <Route path="/community" element={<PageWrapper><Community/></PageWrapper>}/>
      </Routes>
    </AnimatePresence>
  )
}

// Loading screen (Name Logo Only)
function Loader({ onDone }) {
  const [progress, setProgress] = useState(15)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100
        const inc = Math.floor(Math.random() * 15 + 10)
        return Math.min(100, p + inc)
      })
    }, 180)
    const t = setTimeout(onDone, 2200)
    return () => {
      clearInterval(timer)
      clearTimeout(t)
    }
  }, [onDone])

  return (
    <div className="loader">
      <div className="loader-bg-glow" />
      <div className="loader-name-logo">
        <div className="loader-name-main">
          <span className="loader-name-game">GAME</span>
          <span className="loader-name-verse">VERSE</span>
        </div>
        <div className="loader-name-sub">// MULTIVERSE ARENA</div>
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-status-row">
        <span className="loader-label">SYNCING GAMEVERSE PROTOCOLS</span>
        <span className="loader-percent">{progress}%</span>
      </div>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <HashRouter>
      <GameverseProvider>
        {!loaded && <Loader onDone={() => setLoaded(true)}/>}
        <div className="scanlines-overlay"/>
        <CustomCursor/>
        <ThreeBackground/>
        <div className="app">
          <Navbar/>
          <AnimatedRoutes/>
        </div>
        <GlobalModals/>
      </GameverseProvider>
    </HashRouter>
  )
}
