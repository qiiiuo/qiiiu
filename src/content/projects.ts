export interface Project {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  techStack: string[]
  cover?: string
  link?: string
  repo?: string
}

export const projects: Project[] = [
  {
    id: 'sample-project-1',
    title: 'Sample Web Application',
    description: 'A modern web application built with React and Node.js, featuring real-time updates and responsive design.',
    date: '2024',
    tags: ['Web', 'Full-stack'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    link: 'https://example.com',
    repo: 'https://github.com/yourusername/project',
  },
  {
    id: 'sample-project-2',
    title: 'Mobile App',
    description: 'Cross-platform mobile application for iOS and Android with native performance.',
    date: '2023',
    tags: ['Mobile', 'iOS', 'Android'],
    techStack: ['React Native', 'TypeScript', 'Firebase'],
    link: 'https://example.com',
  },
  {
    id: 'sample-project-3',
    title: 'Mini Program',
    description: 'WeChat mini program for e-commerce with seamless payment integration.',
    date: '2023',
    tags: ['Mini Program', 'E-commerce'],
    techStack: ['WeChat SDK', 'JavaScript', 'Cloud Functions'],
  },
]

