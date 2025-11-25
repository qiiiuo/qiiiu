# QIIIU Personal Website

A minimalist personal portfolio website for engineer Hongwei Qiu.

## Features

- 🏠 **Home** - Personal introduction
- 💼 **Projects** - Showcase of engineering projects
- ✍️ **Blogs** - Technical blog with code highlighting
- 💬 **Guestbook** - Interactive message board with authentication
- 🌍 **Multilingual** - English and Chinese support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Authentication**: Supabase
- **Code Highlighting**: Shiki
- **Content**: Local MDX files
- **Deployment**: Cloudflare Pages

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your Supabase credentials and admin email.

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

This project is configured for Cloudflare Pages:

1. Build command: `npm run build`
2. Output directory: `.next`
3. Set environment variables in Cloudflare dashboard

## Project Structure

```
src/
├── app/              # Next.js app directory
│   └── [locale]/    # Multilingual routes
├── components/       # React components
├── lib/             # Utilities and helpers
├── i18n/            # Internationalization
└── content/         # MDX content (blogs, projects)
```

## License

© 2025 Hongwei Qiu. All rights reserved.

