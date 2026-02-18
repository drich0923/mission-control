import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Task {
  id: string
  title: string
  description?: string
  status: 'from-calls' | 'charlie-queue' | 'dylan-queue' | 'needs-scoping' | 'in-progress' | 'completed' | 'done' | 'todo'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  assignee?: 'charlie' | 'dylan' | null
  due_date?: string
  tags?: string[]
  source: 'fathom_call' | 'manual' | 'recurring'
  source_data?: {
    call_title?: string
    call_date?: string
    call_url?: string
    transcript_excerpt?: string
    participants?: any[]
    requested_by?: string
    slack_url?: string
    doc_url?: string
    [key: string]: any
  }
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface RecurringTask {
  id: string
  title: string
  description?: string
  instructions: string
  frequency: 'daily' | 'weekly' | 'monthly'
  schedule: {
    time?: string // "09:00"
    day_of_week?: number // 0-6 (Sunday-Saturday)
    day_of_month?: number // 1-31
  }
  assignee: 'charlie' | 'dylan'
  is_active: boolean
  last_run?: string
  next_run?: string
  cron_job_id?: string // OpenClaw cron job ID
  created_at: string
  updated_at: string
}

// Task operations
export const taskOperations = {
  // Get all tasks
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Task[]
  },

  // Create task
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...task,
        id: Math.random().toString(36).substring(7),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  // Update task
  async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  // Delete task
  async deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Recurring task operations
export const recurringTaskOperations = {
  // Get all recurring tasks
  async getRecurringTasks() {
    const { data, error } = await supabase
      .from('recurring_tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as RecurringTask[]
  },

  // Create recurring task
  async createRecurringTask(task: Omit<RecurringTask, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('recurring_tasks')
      .insert({
        ...task,
        id: Math.random().toString(36).substring(7),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data as RecurringTask
  },

  // Update recurring task
  async updateRecurringTask(id: string, updates: Partial<RecurringTask>) {
    const { data, error } = await supabase
      .from('recurring_tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as RecurringTask
  },

  // Delete recurring task
  async deleteRecurringTask(id: string) {
    const { error } = await supabase
      .from('recurring_tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}