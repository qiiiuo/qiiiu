'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { projects } from '@/content/projects'

export default function ProjectsPage() {

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{"Projects"}</h1>
          <p className="text-lg text-gray-600">{"A collection of things I've built"}</p>
        </div>
      </AnimatedSection>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <AnimatedSection key={project.id} delay={0.1 + index * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group h-full border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-all"
            >
              {/* Cover Image */}
              {project.cover && (
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    [Project Image]
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.date}</span>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {"Tech Stack"}:
                  </p>
                  <p className="text-sm text-gray-600">{project.techStack.join(', ')}</p>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      {"View Project"} →
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      {"View Code"} →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}

