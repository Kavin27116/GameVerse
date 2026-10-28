import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [isInput, setIsInput] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let rx = -100, ry = -100, dx = -100, dy = -100, raf

    const onMove = e => {
      dx = e.clientX
      dy = e.clientY
      if (!visible) setVisible(true)
    }

    const onOver = e => {
      const isInteractive = !!e.target.closest('a, button, [role=button], .game-card, .tourn-row, .lb-row, .news-card-sm, .news-featured-card, .forum-item, .event-card, .genre-pill, .auth-tab-btn, .modal-close-btn, .region-btn, .tab-btn')
      const isInputField = !!e.target.closest('input, textarea, select')
      setHover(isInteractive)
      setIsInput(isInputField)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      rx += (dx - rx) * 0.16
      ry += (dy - ry) * 0.16
      if (dotRef.current) {
        dotRef.current.style.left = `${dx - 4}px`
        dotRef.current.style.top = `${dy - 4}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx - 18}px`
        ringRef.current.style.top = `${ry - 18}px`
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${hover ? ' hover' : ''}${isInput ? ' input-mode' : ''}${!visible ? ' hidden' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring${hover ? ' hover' : ''}${isInput ? ' input-mode' : ''}${!visible ? ' hidden' : ''}`}
      />
    </>
  )
}

