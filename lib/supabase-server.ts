import { createClient } from '@supabase/supabase-js'

// Server-only client using service role key — never exposed to browser
// Used exclusively in Next.js API routes (server-side)
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

import type { Task } from './supabase'

// taskOperations using service role client
export const taskOperations = {
  async getTasks() {
    const { data, error } = await supabaseServer.from('tasks').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as Task[]
  },
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabaseServer.from('tasks').insert({
      ...task,
      id: Math.random().toString(36).substring(7),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).select().single()
    if (error) throw error
    return data as Task
  },
  async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await supabaseServer.from('tasks').update({
      ...updates,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single()
    if (error) throw error
    return data as Task
  },
  async deleteTask(id: string) {
    const { error } = await supabaseServer.from('tasks').delete().eq('id', id)
    if (error) throw error
  },
}
