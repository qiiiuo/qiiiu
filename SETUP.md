# 快速开始指南 / Quick Start Guide

[中文](#中文指南) | [English](#english-guide)

---

## 中文指南

### 📦 安装依赖

```bash
npm install
```

### 🔑 配置环境变量

1. 复制环境变量示例文件：
```bash
cp .env.example .env.local
```

2. 编辑 `.env.local`，填入你的配置：
```env
NEXT_PUBLIC_SUPABASE_URL=你的-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的-supabase-密钥
NEXT_PUBLIC_ADMIN_EMAIL=你的管理员邮箱@example.com
```

### 🗄️ 设置 Supabase 数据库

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 进入 SQL Editor，运行 `supabase-schema.sql` 中的 SQL 脚本
3. 在 Authentication > Providers 中启用 GitHub 登录
4. 复制 Project URL 和 Anon Key 到 `.env.local`

### 🚀 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

### 📝 添加内容

#### 添加项目

编辑 `src/content/projects.ts`：

```typescript
{
  id: 'my-project',
  title: '项目标题',
  description: '项目描述',
  date: '2024',
  tags: ['Web', 'Mobile'],
  techStack: ['React', 'Node.js'],
  link: 'https://example.com',
  repo: 'https://github.com/user/repo',
}
```

#### 添加博客文章

在 `src/content/blogs/` 目录创建新的 `.mdx` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2024-01-15"
tags: ["技术", "教程"]
---

# 文章内容

这里是你的博客内容...
```

#### 修改个人信息

编辑 `src/i18n/translations.ts` 中的 `about.content` 字段。

### 🎨 自定义

- **头像**：替换首页和 About 页面的头像组件
- **颜色**：编辑 `tailwind.config.ts` 修改主题色
- **导航**：编辑 `src/i18n/translations.ts` 修改导航文本
- **Logo**：编辑 `src/components/Header.tsx` 中的 logo

### 📤 部署

详细部署步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

#### 快速部署到 Cloudflare Pages：

1. 推送代码到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 Pages，连接你的 GitHub 仓库
4. 配置构建设置：
   - 构建命令：`npm run build`
   - 输出目录：`.next`
5. 添加环境变量（与 .env.local 相同）
6. 点击部署

---

## English Guide

### 📦 Install Dependencies

```bash
npm install
```

### 🔑 Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
```

### 🗄️ Set up Supabase Database

1. Create a new project at [Supabase](https://supabase.com)
2. Go to SQL Editor and run the script from `supabase-schema.sql`
3. Enable GitHub provider in Authentication > Providers
4. Copy Project URL and Anon Key to `.env.local`

### 🚀 Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to view your site.

### 📝 Adding Content

#### Add a Project

Edit `src/content/projects.ts`:

```typescript
{
  id: 'my-project',
  title: 'Project Title',
  description: 'Project description',
  date: '2024',
  tags: ['Web', 'Mobile'],
  techStack: ['React', 'Node.js'],
  link: 'https://example.com',
  repo: 'https://github.com/user/repo',
}
```

#### Add a Blog Post

Create a new `.mdx` file in `src/content/blogs/`:

```markdown
---
title: "Post Title"
description: "Post description"
date: "2024-01-15"
tags: ["Tech", "Tutorial"]
---

# Post Content

Your blog content here...
```

#### Update About Info

Edit the `about.content` field in `src/i18n/translations.ts`.

### 🎨 Customization

- **Avatar**: Replace avatar components in Home and About pages
- **Colors**: Edit `tailwind.config.ts` to change theme colors
- **Navigation**: Edit `src/i18n/translations.ts` for nav text
- **Logo**: Edit logo in `src/components/Header.tsx`

### 📤 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

#### Quick Deploy to Cloudflare Pages:

1. Push code to GitHub
2. Login to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Go to Pages and connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Add environment variables (same as .env.local)
6. Deploy

---

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

## 🐛 Troubleshooting

### Build Errors

- Ensure Node.js version is 18 or higher
- Delete `node_modules` and `.next` folders, then reinstall

### Authentication Issues

- Verify Supabase credentials are correct
- Check GitHub OAuth app configuration
- Ensure redirect URLs are properly set

## 📄 License

© 2025 Hongwei Qiu. All rights reserved.

