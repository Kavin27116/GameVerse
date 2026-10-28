import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let rx = -100, ry = -100, dx = -100, dy = -100, raf

    const onMove = e => { dx = e.clientX; dy = e.clientY }

    const onOver = e => {
      setHover(!!e.target.closest('a,button,[role=button],.game-card,.tourn-row,.lb-row,.news-card-sm,.news-featured-card,.forum-item,.event-card,.genre-pill'))
    }

    const animate = () => {
      raf = requestAnimationFrame(animate)
      rx += (dx - rx) * 0.13
      ry += (dy - ry) * 0.13
      if (dotRef.current) { dotRef.current.style.left = `${dx-4}px`; dotRef.current.style.top = `${dy-4}px` }
      if (ringRef.current) { ringRef.current.style.left = `${rx-18}px`; ringRef.current.style.top = `${ry-18}px` }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className={`cursor-dot${hover?' hover':''}`} />
      <div ref={ringRef} className={`cursor-ring${hover?' hover':''}`} />
    </>
  )
}
