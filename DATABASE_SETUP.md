# Mission Control Database Setup

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose any name, e.g., "mission-control")
3. Wait for the project to be ready (~2 minutes)

## 2. Set up Database
1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `database.sql` 
3. Run the SQL to create the tables

## 3. Get API Keys
1. Go to Project Settings > API
2. Copy the following values:
   - **Project URL** (looks like: https://abcdefghijklmnop.supabase.co)
   - **Project API Key (anon/public)** (long JWT token)

## 4. Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase URL and API key:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Test the Setup
1. Deploy the updated code to Vercel
2. Vercel will automatically use the environment variables
3. Test by sending a Fathom webhook - tasks should now persist!

## Database Schema

### Tasks Table
- Stores all tasks (from calls + manual + recurring)
- Full CRUD operations via API
- Tracks assignee, priority, status, tags

### Recurring Tasks Table  
- Stores recurring task templates
- Will integrate with OpenClaw cron jobs
- Tracks schedule, frequency, next run times

## API Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/[id]` - Update task  
- `DELETE /api/tasks/[id]` - Delete task