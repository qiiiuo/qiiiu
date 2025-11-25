'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutPage() {

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-12">{"About Me"}</h1>

        <div className="flex flex-col items-center space-y-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gray-200"
          >
            <Image
              src="/avatar.jpg"
              alt="Hongwei Qiu"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {"Hi, I'm Hongwei Qiu — an engineer who designs and builds thoughtful digital products.\n\nI enjoy creating clean, functional interfaces and shipping polished user experiences.\n\nMy work spans web apps, mini programs, and mobile applications.\n\nThis website is a curated collection of the projects I've built and the things I've written.".split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-gray-700 leading-relaxed mb-6"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

