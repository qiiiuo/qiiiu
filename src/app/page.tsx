'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Mail} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { socialLinks } from '@/config/social'
import { DouyinIcon } from '@/components/icons/DouyinIcon'

export default function HomePage() {

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <AnimatedSection>
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200"
          >
            <Image
              src="/avatar.jpg"
              alt="Hongwei Qiu"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              {"Hi, I'm Hongwei Qiu"}
            </h1>
            <div className="mt-4">
              <span className="text-4xl font-bold">&lt;</span>
              <TypingAnimation
                words={["Developer","Designer","Builder"]}
                cursorStyle="line"
                loop
                className="text-4xl font-bold"
              />
              <span className="text-4xl font-bold">/&gt;</span>
            </div>
            <p className="text-lg text-gray-500 max-w-2xl">
              {"I design and build thoughtful digital products."}
            </p>
          </div>


          {/* Social Links */}
          <div className="flex items-center gap-6 pt-4">
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href={socialLinks.douyin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="抖音"
            >
              <DouyinIcon size={20} />
            </motion.a>
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href={socialLinks.email}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </AnimatedSection>

      


      {/* Featured Section */}
      <AnimatedSection delay={0.2} className="mt-32">
        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href="/projects"
            className="group p-8 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{"Projects"}</h3>
            <p className="text-gray-600">{"A collection of things I've built"}</p>
            <span className="inline-block mt-4 text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          <Link
            href="/blogs"
            className="group p-8 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{"Blogs"}</h3>
            <p className="text-gray-600">{"Thoughts on engineering, design, and life"}</p>
            <span className="inline-block mt-4 text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          <Link
            href="/guestbook"
            className="group p-8 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{"Guestbook"}</h3>
            <p className="text-gray-600">{"Leave a message and say hi!"}</p>
            <span className="inline-block mt-4 text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
