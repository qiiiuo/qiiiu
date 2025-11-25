'use client'

import { useState } from 'react'
import Header, { LoginModalContext } from './Header'
import Footer from './Footer'
import LoginModal from './LoginModal'

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <LoginModalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
      }}
    >
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      
      {/* Global Login Modal - renders at body level */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </LoginModalContext.Provider>
  )
}



