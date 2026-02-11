import { NextRequest, NextResponse } from 'next/server';
import { taskOperations } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/tasks - Get all tasks
export async function GET() {
  try {
    const tasks = await taskOperations.getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const task = await taskOperations.createTask({
      title: body.title,
      description: body.description,
      status: body.status || 'todo',
      priority: body.priority || 'MEDIUM',
      assignee: body.assignee,
      due_date: body.due_date,
      tags: body.tags || [],
      source: body.source || 'manual'
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}