import { NextResponse } from 'next/server';
import { supabaseServer as supabase } from '../../../../lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('id, title, status, source, assignee, source_data, created_at, updated_at, completed_at')
      .order('updated_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    const events: any[] = [];
    const now = Date.now();

    for (const task of tasks || []) {
      const sd = task.source_data || {};
      const requestedBy = sd.requested_by || (task.assignee === 'dylan' ? 'Dylan' : null) || 'Team';
      const callUrl = sd.call_url || null;
      const slackUrl = sd.slack_url || null;
      const docUrl = sd.doc_url || null;
      const callTitle = sd.call_title || null;
      const participants: string[] = sd.participants || [];

      // Completion event (show first/higher in feed)
      if (task.completed_at) {
        events.push({
          id: `done-${task.id}`,
          taskId: task.id,
          icon: '✅',
          title: task.title,
          action: 'Completed',
          requestedBy,
          callTitle,
          callUrl,
          slackUrl,
          docUrl,
          participants,
          status: 'completed',
          time: task.completed_at,
          timeRel: relativeTime(new Date(task.completed_at).getTime(), now),
          color: 'bg-green-500/20 text-green-400',
        });
      }

      // Creation event
      events.push({
        id: `new-${task.id}`,
        taskId: task.id,
        icon: task.source === 'fathom_call' ? '📞' : task.source === 'manual' ? '📝' : '🔄',
        title: task.title,
        action: task.source === 'fathom_call' ? 'Extracted from call' : task.source === 'manual' ? 'Created' : 'Recurring task',
        requestedBy,
        callTitle,
        callUrl,
        slackUrl,
        docUrl,
        participants,
        status: task.status,
        time: task.created_at,
        timeRel: relativeTime(new Date(task.created_at).getTime(), now),
        color: task.source === 'fathom_call' ? 'bg-cyan-500/20 text-cyan-400' :
               task.source === 'manual' ? 'bg-blue-500/20 text-blue-400' :
               'bg-purple-500/20 text-purple-400',
      });
    }

    // usage_snapshots (graceful)
    const { data: snapshots } = await supabase
      .from('usage_snapshots')
      .select('id, summary, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    for (const snap of (snapshots || [])) {
      events.push({
        id: `usage-${snap.id}`,
        taskId: null,
        icon: '📊',
        title: snap.summary || 'Weekly usage report',
        action: 'Report generated',
        requestedBy: 'Charlie',
        callTitle: null, callUrl: null, slackUrl: null, docUrl: null, participants: [],
        status: 'report',
        time: snap.created_at,
        timeRel: relativeTime(new Date(snap.created_at).getTime(), now),
        color: 'bg-purple-500/20 text-purple-400',
      });
    }

    events.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    return NextResponse.json(events.slice(0, 50));
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
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
