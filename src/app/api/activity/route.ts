import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/activity — derive activity feed from real task events
export async function GET() {
  try {
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('id, title, status, source, assignee, created_at, updated_at, completed_at')
      .order('updated_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    const events: any[] = [];

    for (const task of tasks || []) {
      if (task.completed_at) {
        events.push({
          id: `completed-${task.id}`,
          icon: '✅',
          description: `Completed: ${task.title}`,
          time: task.completed_at,
          type: 'Completed',
          color: 'bg-green-500/20 text-green-400',
        });
      }
      if (task.source === 'fathom_call') {
        events.push({
          id: `created-${task.id}`,
          icon: '📞',
          description: `Extracted from Fathom call: ${task.title}`,
          time: task.created_at,
          type: 'From Call',
          color: 'bg-cyan-500/20 text-cyan-400',
          assignee: task.assignee,
        });
      } else {
        events.push({
          id: `created-${task.id}`,
          icon: '📝',
          description: `Task created: ${task.title}`,
          time: task.created_at,
          type: 'Task',
          color: 'bg-blue-500/20 text-blue-400',
          assignee: task.assignee,
        });
      }
    }

    // usage_snapshots if table exists (graceful fail)
    const { data: snapshots } = await supabase
      .from('usage_snapshots')
      .select('id, summary, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    for (const snap of (snapshots || [])) {
      events.push({
        id: `usage-${snap.id}`,
        icon: '📊',
        description: snap.summary || 'Weekly usage report generated',
        time: snap.created_at,
        type: 'Report',
        color: 'bg-purple-500/20 text-purple-400',
      });
    }

    events.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    const now = Date.now();
    const result = events.slice(0, 30).map((e) => ({
      ...e,
      timeRel: relativeTime(new Date(e.time).getTime(), now),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json([]);
  }
}

function relativeTime(ts: number, now: number): string {
  const diff = now - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}
