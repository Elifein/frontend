"use client"

import { useState, useEffect, createContext, useContext } from "react"

type MobileMenuContextType = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
})

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  // Close menu when route changes or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <MobileMenuContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export const useMobileMenu = () => useContext(MobileMenuContext)
