"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-md border
        border-[var(--border-default)]
        bg-transparent" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-10 h-10 rounded-md flex-shrink-0
        flex items-center justify-center
        border border-[var(--border-default)]
        bg-transparent
        hover:border-[var(--border-brand)]
        hover:bg-[var(--bg-brand)]
        text-[var(--text-muted)]
        hover:text-[var(--text-brand)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)]
        transition-all duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          /* Sun — shown in dark mode, click to go light */
          <motion.svg
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate:  90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41
              M17.66 17.66l1.41 1.41M2 12h2M20 12h2
              M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </motion.svg>
        ) : (
          /* Moon — shown in light mode, click to go dark */
          <motion.svg
            key="moon"
            initial={{ rotate:  90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3
              7 7 0 0 0 21 12.79z"/>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}
