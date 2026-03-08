
<h1 align="center">Infiniteo: Automation Without Limits</h1>

<div align="center">
  <p><strong>Liberate your business from archaic, manual workflows. Achieve unbounded evolution with our limitless, intuitive automation services.</strong></p>
  <p>
    <a href="https://infiniteo.org" target="_blank"><strong>Explore the Live Site</strong></a>
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js Badge"/>
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Badge"/>
</div>

---

## About Infiniteo

Infiniteo is the next-generation automation service partner for businesses and professionals ready to break free from manual workflows. By seamlessly integrating with every digital channel, Infiniteo empowers teams of all sizes to deploy reliable, secure, and infinitely scalable solutions.

## Tech Stack

- **Framework:** Next.js 15.3.3 with Turbopack
- **UI:** React 18, Tailwind CSS, Shadcn UI
- **Backend:** Google Sheets API (googleapis), Pollinations AI
- **Deployment:** Vercel with daily cron jobs
- **SEO:** Dynamic sitemap, RSS feed, JSON-LD structured data

## Features

- **AI Chatbot** - Intelligent assistant powered by Pollinations AI, trained on Infiniteo services
- **Automated Blog** - AI-generated articles published daily via cron, stored in Google Sheets
- **Contact Form** - Submissions saved directly to Google Sheets via service account
- **SEO Optimized** - Dynamic sitemap.xml, robots.txt, RSS feed, OpenGraph metadata
- **Video Background** - Optimized MP4/WebM replacing original 52MB GIF
- **Responsive Design** - Mobile-first dark theme with Poppins + PT Sans fonts

## Project Structure

```
src/
  app/
    api/
      blog/generate/   # AI blog generation endpoint
      chat/             # AI chatbot endpoint
      contact/          # Contact form endpoint
      cron/blog/        # Daily auto-post cron
    blog/               # Blog listing + individual posts + RSS feed
    about/              # About page
    contact/            # Contact page
    solutions/          # Solutions page
    technology/         # Technology page
    impact/             # Impact page
    sitemap.ts          # Dynamic sitemap
    robots.ts           # robots.txt
  components/
    ai/                 # AI Chatbot component
    contact/            # Contact form
    layout/             # Header, Footer, VideoBackground
    ui/                 # Shadcn UI components
  lib/
    blog-data.ts        # Blog data layer (Google Sheets + static fallback)
    google-sheets.ts    # Google Sheets API helper
scripts/
  setup-sheets.mjs      # One-time Google Sheets table setup
  optimize-media.mjs    # Image/video optimization script
```

## Setup

```bash
# Install dependencies
npm install

# Set up Google Sheets tables (one-time)
node scripts/setup-sheets.mjs

# Run development server
npm run dev
```

The dev server starts at http://localhost:9002.

## Environment Variables

| Variable | Description |
|---|---|
| `POLLINATIONS_API_KEY` | Pollinations AI API key |
| `POLLINATIONS_BASE_URL` | Pollinations API base URL |
| `GOOGLE_SERVICE_ACCOUNT_BASE64` | Base64-encoded service account JSON (for Vercel) |
| `CRON_SECRET` | Secret for cron job authentication |

For local development, place `service-account.json` in the project root (gitignored).

## License

**Copyright 2024 Infiniteo Solutions. All Rights Reserved.**

This repository and its contents are the proprietary property of Infiniteo Solutions. Unauthorized copying, modification, or distribution is strictly prohibited without express written permission.

---
<p align="center">Empowering Business Evolution, Without Limits.</p>
