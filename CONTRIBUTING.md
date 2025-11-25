# Contributing Guide

Thank you for considering contributing to this project!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your Supabase credentials
4. Run development server: `npm run dev`

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── [locale]/    # Internationalized routes
│   └── globals.css  # Global styles
├── components/       # React components
├── content/         # Static content (blogs, projects)
├── i18n/            # Internationalization
└── lib/             # Utilities and helpers
```

## Adding Content

### New Blog Post

Create a new file in `src/content/blogs/`:

```markdown
---
title: "Your Post Title"
description: "A brief description"
date: "2024-01-15"
tags: ["Tag1", "Tag2"]
---

# Your Content Here

Write your blog post content...
```

### New Project

Edit `src/content/projects.ts`:

```typescript
{
  id: 'project-id',
  title: 'Project Title',
  description: 'Project description',
  date: '2024',
  tags: ['Tag1', 'Tag2'],
  techStack: ['Tech1', 'Tech2'],
  link: 'https://example.com',
  repo: 'https://github.com/user/repo',
}
```

## Code Style

- Use TypeScript for type safety
- Follow the existing code style
- Use Tailwind CSS for styling
- Keep components small and focused
- Write meaningful commit messages

## Pull Request Process

1. Create a new branch for your feature
2. Make your changes
3. Test locally
4. Submit a pull request with a clear description

## Questions?

Feel free to open an issue for any questions or concerns.

