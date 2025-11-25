# 🚀 Cloudflare Pages 部署指南

## 📋 部署前准备

### 1. 确保代码已推送到 GitHub

```bash
# 如果还没有初始化 Git
git init
git add .
git commit -m "Initial commit"

# 在 GitHub 创建仓库后
git remote add origin https://github.com/qiiiuo/qiiiu.git
git branch -M main
git push -u origin main
```

### 2. 准备 Supabase 配置

确保你已经：
- ✅ 创建了 Supabase 项目
- ✅ 运行了 `supabase-schema.sql` 创建数据库表
- ✅ 启用了 Email、GitHub、Google 认证
- ✅ 复制了 Supabase URL 和 Anon Key

## 🎯 部署步骤

### 方法一：通过 Cloudflare Dashboard（推荐）

#### 步骤 1: 登录 Cloudflare

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 登录你的账户（如果没有，免费注册）

#### 步骤 2: 创建 Pages 项目

1. 在左侧菜单选择 **"Pages"**
2. 点击 **"Create a project"**
3. 选择 **"Connect to Git"**
4. 授权 Cloudflare 访问你的 GitHub 账户
5. 选择你的仓库 `qiiiu_page`

#### 步骤 3: 配置构建设置

在项目设置页面，填写以下信息：

**项目名称**：
```
qiiiu-page
```

**生产分支**：
```
main
```

**框架预设**：
```
Next.js
```

**构建设置**：
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (留空或填写 `/`)

**环境变量**（重要！）：
点击 "Add environment variable" 添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL = 你的 Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY = 你的 Supabase Anon Key
NEXT_PUBLIC_ADMIN_EMAIL = 你的管理员邮箱
```

#### 步骤 4: 部署

1. 点击 **"Save and Deploy"**
2. 等待构建完成（通常 2-5 分钟）
3. 构建成功后，你会得到一个 `*.pages.dev` 的临时域名

### 方法二：使用 Wrangler CLI

#### 步骤 1: 安装 Wrangler

```bash
npm install -g wrangler
```

#### 步骤 2: 登录 Cloudflare

```bash
wrangler login
```

#### 步骤 3: 创建项目

```bash
wrangler pages project create qiiiu-page
```

#### 步骤 4: 部署

```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
wrangler pages deploy .next --project-name=qiiiu-page
```

## 🌐 配置自定义域名

### 步骤 1: 添加自定义域名

1. 在 Cloudflare Pages 项目页面
2. 点击 **"Custom domains"** 标签
3. 点击 **"Set up a custom domain"**
4. 输入 `qiiiu.xyz`
5. 点击 **"Continue"**

### 步骤 2: 配置 DNS

Cloudflare 会自动检测你的域名。如果域名已经在 Cloudflare 管理：

1. 系统会自动添加 CNAME 记录
2. 等待 DNS 传播（通常 5-10 分钟）

如果域名不在 Cloudflare：

1. 在你的域名注册商添加 CNAME 记录：
   ```
   类型: CNAME
   名称: @ (或 www)
   值: qiiiu-page.pages.dev
   ```
2. 或者添加 A 记录（Cloudflare 会提供 IP 地址）

### 步骤 3: 等待 SSL 证书

Cloudflare 会自动为你的域名生成 SSL 证书（通常 1-5 分钟）

## ⚙️ 更新 Supabase 配置

部署完成后，需要更新 Supabase 的重定向 URL：

### 步骤 1: 更新 Site URL

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Authentication** > **URL Configuration**
4. 设置 **Site URL** 为：`https://qiiiu.xyz`

### 步骤 2: 更新 Redirect URLs

在 **Redirect URLs** 中添加：

```
https://qiiiu.xyz/**
https://qiiiu.xyz
https://*.pages.dev/**
http://localhost:3000/**
```

### 步骤 3: 更新 GitHub OAuth（如果使用）

1. 访问 [GitHub OAuth Apps](https://github.com/settings/developers)
2. 编辑你的 OAuth App
3. 更新 **Authorization callback URL** 为：
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   ```
4. 更新 **Homepage URL** 为：`https://qiiiu.xyz`

## 🔄 持续部署

### 自动部署

每次推送到 `main` 分支，Cloudflare Pages 会自动：
1. 检测代码变更
2. 重新构建项目
3. 部署到生产环境

### 预览部署

推送到其他分支会创建预览部署，你可以：
- 在 Pull Request 中测试更改
- 分享预览链接给团队成员

## 🐛 常见问题排查

### 问题 1: 构建失败

**检查清单**：
- ✅ 确认所有依赖都在 `package.json` 中
- ✅ 检查 Node.js 版本（Cloudflare 使用 Node 18+）
- ✅ 查看构建日志中的具体错误信息
- ✅ 确认环境变量都已正确设置

**解决方案**：
```bash
# 本地测试构建
npm run build

# 如果本地构建失败，先修复问题
```

### 问题 2: 404 错误

**可能原因**：
- Next.js 路由配置问题
- 缺少 `_redirects` 文件

**解决方案**：
在 `public` 目录创建 `_redirects` 文件：
```
/*    /index.html   200
```

### 问题 3: 环境变量未生效

**检查**：
1. 确认环境变量名称正确（注意大小写）
2. 确认变量值没有多余空格
3. 重新部署项目（环境变量更改需要重新构建）

### 问题 4: Supabase 认证失败

**检查**：
- ✅ Supabase URL 和 Key 是否正确
- ✅ Redirect URLs 是否包含生产域名
- ✅ SSL 证书是否有效

## 📊 监控和日志

### 查看构建日志

1. 在 Cloudflare Pages 项目页面
2. 点击 **"Deployments"** 标签
3. 选择任意部署查看详细日志

### 查看实时日志

1. 在项目页面点击 **"Functions"** 标签
2. 可以查看实时请求日志和错误

## 🔐 安全建议

1. **不要提交 `.env.local`** 到 Git
2. **使用环境变量**存储敏感信息
3. **定期更新依赖**：
   ```bash
   npm audit
   npm update
   ```
4. **启用 Cloudflare 安全功能**：
   - WAF (Web Application Firewall)
   - DDoS 保护
   - Bot 管理

## 📝 部署检查清单

部署前确认：

- [ ] 代码已推送到 GitHub
- [ ] 本地构建成功 (`npm run build`)
- [ ] Supabase 项目已创建并配置
- [ ] 环境变量已准备
- [ ] 域名已准备好（可选）
- [ ] `.env.local` 已添加到 `.gitignore`

部署后确认：

- [ ] 网站可以正常访问
- [ ] 所有页面路由正常
- [ ] 登录功能正常
- [ ] Supabase 连接正常
- [ ] 自定义域名已配置（如果使用）
- [ ] SSL 证书已激活
- [ ] Supabase Redirect URLs 已更新

## 🎉 完成！

部署成功后，你的网站将：
- ✅ 自动获得全球 CDN 加速
- ✅ 免费 SSL 证书
- ✅ 自动 HTTPS
- ✅ 无限带宽
- ✅ 自动部署（Git push 触发）

## 📚 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Supabase 文档](https://supabase.com/docs)
- [项目 GitHub](https://github.com/yourusername/qiiiu_page)

---

**需要帮助？** 查看构建日志或联系 Cloudflare 支持。

