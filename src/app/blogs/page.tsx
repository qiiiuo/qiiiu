'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { formatDate } from '@/lib/utils'

// Sample blog posts data
const sampleBlogs = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Modern Web Development',
    description: 'An introduction to building modern web applications with the latest tools and best practices.',
    date: '2024-01-15',
    tags: ['Web', 'Tutorial'],
    readingTime: 5,
  },
  {
    slug: 'design-principles',
    title: 'Design Principles for Engineers',
    description: 'Key design principles that every engineer should know to build better products.',
    date: '2024-01-10',
    tags: ['Design', 'Engineering'],
    readingTime: 8,
  },
]

export default function BlogsPage() {

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{"Blogs"}</h1>
          <p className="text-lg text-gray-600">{"Thoughts on engineering, design, and life"}</p>
        </div>
      </AnimatedSection>

      <div className="space-y-12">
        {sampleBlogs.map((blog, index) => (
          <AnimatedSection key={blog.slug} delay={0.1 + index * 0.1}>
            <Link href={`/blogs/${blog.slug}`}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group border-b border-gray-200 pb-8 hover:border-black transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-semibold group-hover:underline">
                    {blog.title}
                  </h2>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(blog.date)}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{blog.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {blog.readingTime} {"min read"}
                  </span>
                </div>

                <div className="mt-4 text-sm group-hover:translate-x-1 transition-transform inline-block">
                  {"Read More"} →
                </div>
              </motion.article>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}

