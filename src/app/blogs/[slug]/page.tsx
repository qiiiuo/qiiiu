'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { formatDate } from '@/lib/utils'

// Sample blog post content
const samplePost = {
  title: 'Sample Blog Post',
  description: 'This is a sample blog post.',
  date: '2024-01-15',
  tags: ['Web', 'Tutorial'],
  readingTime: 5,
  content: `
# Getting Started with Modern Web Development

This is a sample blog post demonstrating the blog system.

## Introduction

Modern web development has evolved significantly over the years. In this post, we'll explore the key concepts and tools that define the current landscape.

## Key Technologies

### React and Next.js

React has become the de facto library for building user interfaces, and Next.js extends it with powerful features like:

- Server-side rendering
- Static site generation
- API routes
- File-based routing

### Styling with Tailwind CSS

Tailwind CSS provides a utility-first approach to styling that enables rapid development without leaving your HTML.

## Code Example

Here's a simple React component:

\`\`\`typescript
export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
      {children}
    </button>
  )
}
\`\`\`

## Conclusion

The modern web development ecosystem offers powerful tools for building fast, scalable applications. Keep learning and experimenting!
  `.trim(),
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <AnimatedSection>
        <Link
          href="/blogs"
          className="text-sm text-gray-600 hover:text-black mb-8 inline-block"
        >
          ← {"Blogs"}
        </Link>

        <article className="prose prose-lg max-w-none">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">{samplePost.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time>{formatDate(samplePost.date)}</time>
              <span>·</span>
              <span>
                {samplePost.readingTime} {"min read"}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              {samplePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose-headings:font-bold prose-a:text-black prose-a:underline prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          >
            {/* In a real implementation, this would be rendered MDX */}
            <div dangerouslySetInnerHTML={{ __html: samplePost.content.replace(/\n/g, '<br />') }} />
          </motion.div>
        </article>
      </AnimatedSection>
    </div>
  )
}

