# Deployment Guide

## Prerequisites

1. A Cloudflare account
2. A Supabase account
3. GitHub account (for Supabase authentication)

## Step 1: Set up Supabase

1. Create a new project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `supabase-schema.sql`
4. Go to Authentication > Providers
5. Enable GitHub provider:
   - Create a GitHub OAuth App at https://github.com/settings/applications/new
   - Set Homepage URL to your domain (e.g., https://qiiiu.xyz)
   - Set Authorization callback URL to: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret to Supabase
6. Copy your project credentials:
   - Project URL: `https://[YOUR-PROJECT-REF].supabase.co`
   - Anon/Public Key: Found in Project Settings > API

## Step 2: Configure Environment Variables

Create a `.env.local` file for local development:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
```

## Step 3: Deploy to Cloudflare Pages

### Option A: Connect Git Repository (Recommended)

1. Push your code to GitHub
2. Go to Cloudflare Dashboard > Pages
3. Click "Create a project"
4. Connect to your GitHub repository
5. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
7. Click "Save and Deploy"

### Option B: Direct Upload

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Build your project:
```bash
npm run build
```

4. Deploy:
```bash
wrangler pages deploy .next
```

## Step 4: Configure Custom Domain

1. Go to Cloudflare Pages > Your Project > Custom domains
2. Click "Set up a custom domain"
3. Enter `qiiiu.xyz`
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (usually 5-10 minutes)

## Step 5: Update Supabase Redirect URLs

After deploying, update your Supabase project:

1. Go to Authentication > URL Configuration
2. Add your production URL to "Site URL": `https://qiiiu.xyz`
3. Add to "Redirect URLs":
   - `https://qiiiu.xyz/**`
   - `http://localhost:3000/**` (for development)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with your Supabase credentials

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Troubleshooting

### Supabase Authentication Issues

- Verify your GitHub OAuth credentials are correct
- Check that redirect URLs include your production domain
- Ensure Row Level Security policies are properly set up

### Build Failures

- Check that all environment variables are set in Cloudflare
- Verify Node.js version compatibility (use Node 18+)
- Review build logs in Cloudflare Dashboard

### 404 Errors

- Ensure `fallback_origin` is configured in Cloudflare Pages
- Check that dynamic routes are properly exported

## Content Management

### Adding New Projects

Edit `src/content/projects.ts` and add your project details.

### Adding New Blog Posts

1. Create a new `.mdx` file in `src/content/blogs/`
2. Add frontmatter with title, description, date, and tags
3. Write your content in Markdown/MDX format

### Updating About Page

Edit the translations in `src/i18n/translations.ts` under the `about.content` key.

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- Visit [Supabase documentation](https://supabase.com/docs)

