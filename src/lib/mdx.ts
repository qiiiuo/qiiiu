import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadingTime } from './utils'

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
  readingTime: number
}

export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(blogsDirectory)
    return files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => file.replace(/\.(mdx|md)$/, ''))
  } catch {
    return []
  }
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      content,
      readingTime: calculateReadingTime(content),
    }
  } catch {
    return null
  }
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getAllBlogSlugs()
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return blogs
}

