# Mission Control - Charlie AI Dashboard

A Next.js dashboard for managing Charlie AI tasks, activities, and scheduled jobs.

## Features

- **Activity Feed**: Recent Charlie AI actions and deployments
- **Calendar**: Scheduled tasks, cron jobs, and reminders  
- **Search**: Global search across workspace documents and memory
- **Tasks**: Kanban board for Fathom call tasks and manual entries

## Deployment

### Vercel (Recommended)

1. Create new project on [vercel.com](https://vercel.com)
2. Connect to your GitHub repository
3. Set root directory to `clean-mission-control/`
4. Deploy

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (Static Export)