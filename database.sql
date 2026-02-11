-- Mission Control Database Schema
-- Run this in your Supabase SQL editor to create the tables

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('from-calls', 'todo', 'in-progress', 'done')),
    priority TEXT NOT NULL CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    assignee TEXT CHECK (assignee IN ('charlie', 'dylan')),
    due_date TIMESTAMPTZ,
    tags TEXT[], -- Array of strings
    source TEXT NOT NULL CHECK (source IN ('fathom_call', 'manual', 'recurring')),
    source_data JSONB, -- Flexible JSON for call data, etc.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Recurring tasks table
CREATE TABLE IF NOT EXISTS recurring_tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
    schedule JSONB NOT NULL, -- {time?: string, day_of_week?: number, day_of_month?: number}
    assignee TEXT NOT NULL CHECK (assignee IN ('charlie', 'dylan')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_run TIMESTAMPTZ,
    next_run TIMESTAMPTZ,
    cron_job_id TEXT, -- OpenClaw cron job ID
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_tasks_source ON tasks(source);

CREATE INDEX IF NOT EXISTS idx_recurring_tasks_assignee ON recurring_tasks(assignee);
CREATE INDEX IF NOT EXISTS idx_recurring_tasks_is_active ON recurring_tasks(is_active);
CREATE INDEX IF NOT EXISTS idx_recurring_tasks_next_run ON recurring_tasks(next_run);

-- Enable Row Level Security (recommended)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_tasks ENABLE ROW LEVEL SECURITY;

-- Basic policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations on recurring_tasks" ON recurring_tasks FOR ALL USING (true);