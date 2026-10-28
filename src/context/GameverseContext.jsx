import React, { createContext, useContext, useState, useCallback } from 'react'

const GameverseContext = createContext(null)

export function GameverseProvider({ children }) {
  // Current user state
  const [user, setUser] = useState(null)

  // Active modal
  const [modal, setModal] = useState(null)

  // Toast notifications
  const [toasts, setToasts] = useState([])

  // Wishlist
  const [wishlist, setWishlist] = useState([1, 2])

  // Registered tournaments
  const [registeredTournaments, setRegisteredTournaments] = useState([])

  // RSVP'd events
  const [savedEvents, setSavedEvents] = useState([])

  // Push a toast
  const addToast = useCallback((title, message, icon = '✨') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, title, message, icon }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // Modal helpers
  const openModal = useCallback((type, data = {}) => {
    setModal({ type, data })
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

  // Wishlist helper
  const toggleWishlist = useCallback((gameId, gameTitle) => {
    setWishlist(prev => {
      const exists = prev.includes(gameId)
      if (exists) {
        addToast('Removed from Wishlist', `${gameTitle} removed from your library`, '🗑️')
        return prev.filter(id => id !== gameId)
      } else {
        addToast('Saved to Wishlist', `${gameTitle} added to your prioritized gaming library`, '💖')
        return [...prev, gameId]
      }
    })
  }, [addToast])

  // Tournament registration helper
  const registerTournament = useCallback((tournamentId, tournamentName, teamName) => {
    setRegisteredTournaments(prev => {
      if (!prev.includes(tournamentId)) {
        addToast('Tournament Registered!', `Team "${teamName || 'Solo Champion'}" confirmed for ${tournamentName}`, '🏆')
        return [...prev, tournamentId]
      }
      return prev
    })
    closeModal()
  }, [addToast, closeModal])

  // Event RSVP helper
  const rsvpEvent = useCallback((eventTitle) => {
    setSavedEvents(prev => {
      const exists = prev.includes(eventTitle)
      if (exists) {
        addToast('Reminder Removed', `Removed reminder for "${eventTitle}"`, 'ℹ️')
        return prev.filter(t => t !== eventTitle)
      } else {
        addToast('Reminder Set!', `We will notify you 1 hour before "${eventTitle}" starts`, '🔔')
        return [...prev, eventTitle]
      }
    })
  }, [addToast])

  // Login helper
  const loginUser = useCallback((userData) => {
    setUser(userData)
    addToast('Welcome to Gameverse!', `Logged in as ${userData.name}. Neural Link active.`, '🚀')
    closeModal()
  }, [addToast, closeModal])

  const logoutUser = useCallback(() => {
    setUser(null)
    addToast('Session Ended', 'Logged out of Gameverse. See you in the next dimension.', '👋')
  }, [addToast])

  return (
    <GameverseContext.Provider
      value={{
        user,
        modal,
        toasts,
        wishlist,
        registeredTournaments,
        savedEvents,
        openModal,
        closeModal,
        addToast,
        removeToast,
        toggleWishlist,
        registerTournament,
        rsvpEvent,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GameverseContext.Provider>
  )
}

export function useGameverse() {
  const ctx = useContext(GameverseContext)
  if (!ctx) throw new Error('useGameverse must be used within GameverseProvider')
  return ctx
}
