'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { supabase, type Message } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

export default function GuestbookPage() {
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    checkUser()
    fetchMessages()

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
    setLoading(false)
  }

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setMessages(data)
    }
    setLoading(false)
  }

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.href,
      },
    })
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    setSubmitting(true)

    const { error } = await supabase.from('guestbook').insert({
      user_id: user.id,
      username: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous',
      avatar: user.user_metadata?.avatar_url || '',
      content: newMessage.trim(),
    })

    if (!error) {
      setNewMessage('')
      fetchMessages()
    }

    setSubmitting(false)
  }

  async function handleDelete(id: string, userId: string) {
    const canDelete = user && (user.id === userId || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    if (!canDelete) return

    const { error } = await supabase.from('guestbook').delete().eq('id', id)

    if (!error) {
      fetchMessages()
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{"Guestbook"}</h1>
          <p className="text-lg text-gray-600">{"Leave a message and say hi!"}</p>
        </div>
      </AnimatedSection>

      {/* Sign In / Message Form */}
      <AnimatedSection delay={0.1}>
        <div className="mb-12 p-6 border border-gray-200 rounded-lg">
          {!user ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">{"Sign in to leave a message"}</p>
              <button
                onClick={handleSignIn}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Sign in with GitHub
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {user.user_metadata?.avatar_url && (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span className="font-medium">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  {"Sign Out"}
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={"Leave your message..."}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-black"
                  rows={3}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {newMessage.length}/500
                  </span>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || submitting}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Messages List */}
      <div className="space-y-6">
        {messages.length === 0 ? (
          <AnimatedSection delay={0.2}>
            <div className="text-center py-12 text-gray-500">
              {"No messages yet. Be the first to leave one!"}
            </div>
          </AnimatedSection>
        ) : (
          messages.map((message, index) => (
            <AnimatedSection key={message.id} delay={0.2 + index * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-6 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {message.avatar ? (
                      <img
                        src={message.avatar}
                        alt={message.username}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {message.username[0].toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{message.username}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>

                  {user && (user.id === message.user_id || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) && (
                    <button
                      onClick={() => handleDelete(message.id, message.user_id)}
                      className="text-sm text-red-600 hover:text-red-800 ml-4"
                    >
                      {"Delete"}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))
        )}
      </div>
    </div>
  )
}

