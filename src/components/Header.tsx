'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

// Create a context for the login modal
export const LoginModalContext = createContext<{
  openLoginModal: () => void
  closeLoginModal: () => void
  isLoginModalOpen: boolean
}>({
  openLoginModal: () => {},
  closeLoginModal: () => {},
  isLoginModalOpen: false,
})

export const useLoginModal = () => useContext(LoginModalContext)

export default function Header() {
  const pathname = usePathname()
  const { openLoginModal } = useLoginModal()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  const links = [
    { href: '/', label: "Home" },
    { href: '/projects', label: "Projects" },
    { href: '/blogs', label: "Blogs" },
    { href: '/about', label: "About" },
    { href: '/guestbook', label: "Guestbook" },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm"
    >
      <nav className="mx-auto max-w-4xl px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <Image
                src="/favicon.ico"
                alt="QIIIU"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight">qiiiu</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    isActive(link.href)
                      ? 'text-black font-medium'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
              )}
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {"Sign Out"}
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
            >
              {"Sign In"}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <ul className="mt-6 flex gap-6 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-black font-medium'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

// Render LoginModal outside of Header to ensure proper z-index and overlay
export function HeaderWithModal() {
  return (
    <>
      <Header />
    </>
  )
}
