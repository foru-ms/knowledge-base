# Knowledge Base

This is a [Foru.ms](https://foru.ms/) Next.js Knowledge Base application bootstrapped with the minimal endpoints to get you started.

## Overview

This is a complete knowledge base system built with Next.js that transforms forum concepts into documentation structure:

- **Articles** - Create and manage documentation articles (formerly threads)
- **Comments** - Add comments and feedback to articles (formerly posts)
- **Search** - Find articles quickly with full-text search
- **User Management** - Create accounts, login, and manage your profile
- **Responsive Design** - Works seamlessly on desktop and mobile

## Getting Started

First, we need to populate the .env file with the following variables:

```bash
FORU_MS_API_KEY="YOUR_API_KEY"
FORU_MS_API_URL="https://foru.ms/api/v1"
```

To obtain an API key, you need to create an account on [Foru.ms](https://foru.ms/) and create a new instance. You can find the API key in the instance settings.

## Running locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the knowledge base.

## Project Structure

- `/app` - Next.js App Router pages and API routes
  - `/api/createArticle` - Create new articles
  - `/api/createComment` - Add comments to articles
  - `/api/search` - Full-text search functionality
  - `/api/auth` - Authentication endpoints
  - `/new-thread` - Article creation page
  - `/thread/[id]` - Article detail page
- `/lib` - Shared utilities
  - `knowledgeBaseApi.js` - Server-side Knowledge Base API client
  - `clientApi.js` - Client-side API wrapper
  - `auth.js` - Authentication utilities
  - `validation.js` - Input validation
- `/components` - Reusable React components
  - `Threads` - Display articles list
  - `Posts` - Display comments
  - `Sidebar` - Navigation sidebar
  - `Meta` - Article metadata

## Architecture

The application uses a two-layer API pattern:

1. **Server Layer** (`knowledgeBaseApi`) - Direct calls to Foru.ms API with authentication
2. **Client Layer** (`clientApi`) - Client-safe wrappers that call Next.js API routes

This ensures API keys are never exposed to the frontend.

## Key Features

- ✅ User authentication (login, register, password reset)
- ✅ Create and manage articles
- ✅ Comment on articles
- ✅ Full-text search
- ✅ Responsive design with Tailwind CSS
- ✅ Accessibility features (ARIA labels, semantic HTML)
- ✅ Toast notifications for user feedback

## Deploying on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fforu-ms%2Fnextjs-starter&env=FORU_MS_API_KEY,FORU_MS_API_URL&envDescription=API%20Key%20and%20URL%20needed%20for%20the%20application.&envLink=https%3A%2F%2Fforu.ms&demo-title=Knowledge%20Base&demo-description=A%20functional%20knowledge%20base%20example%20using%20Next.js.&demo-url=https%3A%2F%2Fknowledge-base-kb.vercel.app%2F&demo-image=https%3A%2F%2Fknowledge-base-kb.vercel.app%2Fdemo.png)

## Learn More

To learn more about Foru.ms, take a look at the following resources:

- [Foru.ms Documentation](https://foru.ms/docs) - learn about Foru.ms features and API.
- [Blog](https://foru.ms/blog) - read the latest news and updates.
- [GitHub](https://github.com/foru-ms) - check out the Foru.ms GitHub repositories.
- [Support](https://foru.ms/support) - get help and support.