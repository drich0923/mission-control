import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/usage — latest snapshot from Supabase, falls back to skeleton
export async function GET() {
  try {
    const { data: snapshots } = await supabase
      .from('usage_snapshots')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);

    const latest = snapshots?.[0] ?? null;
    const trend = (snapshots || []).reverse().map((s: any) => ({
      date: s.created_at.split('T')[0],
      tokens: s.total_tokens ?? 0,
      cost: s.estimated_cost ?? 0,
    }));

    const data = {
      timestamp: latest?.created_at ?? new Date().toISOString(),
      totalSessions: latest?.total_sessions ?? 9,
      totalTokens: latest?.total_tokens ?? 0,
      model: latest?.model ?? 'anthropic/claude-sonnet-4-6',
      sessions: latest?.sessions ?? defaultSessions(),
      dailyStats: {
        date: new Date().toISOString().split('T')[0],
        totalTokensUsed: latest?.total_tokens ?? 0,
        estimatedCost: latest?.estimated_cost ?? 0,
        compactionEvents: latest?.compaction_events ?? 0,
        overflowEvents: 0,
        peakUtilization: 0,
        averageUtilization: 0,
      },
      alerts: latest
        ? []
        : [{
            type: 'info',
            message: 'No usage data yet. Charlie writes snapshots on Mondays 9am ET. Run the weekly-usage-report cron manually to populate.',
            timestamp: new Date().toISOString(),
            severity: 'low',
          }],
      trends: { last7Days: trend },
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(skeleton());
  }
}

// POST /api/usage — Charlie writes a usage snapshot here
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from('usage_snapshots').insert([{
      total_tokens: body.total_tokens ?? 0,
      total_sessions: body.total_sessions ?? 0,
      estimated_cost: body.estimated_cost ?? 0,
      compaction_events: body.compaction_events ?? 0,
      model: body.model ?? 'anthropic/claude-sonnet-4-6',
      sessions: body.sessions ?? [],
      summary: body.summary ?? null,
    }]).select().single();

    if (error) throw error;
    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error('Error writing usage snapshot:', error);
    return NextResponse.json({ error: 'Failed to write snapshot' }, { status: 500 });
  }
}

function defaultSessions() {
  const agents = [
    { key: 'agent:main', name: 'Charlie (Main)', type: 'interactive' },
    { key: 'agent:munera', name: 'Munera Capital Bot', type: 'client-bot' },
    { key: 'agent:woobie', name: 'Woobie Bot', type: 'client-bot' },
    { key: 'agent:budgetdog', name: 'Budgetdog Bot', type: 'client-bot' },
    { key: 'agent:budgetdogtax', name: 'Budgetdog Tax Bot', type: 'client-bot' },
    { key: 'agent:growthghost', name: 'Growth Ghost Bot', type: 'client-bot' },
    { key: 'agent:simpleprogrammer', name: 'Simple Programmer Bot', type: 'client-bot' },
    { key: 'agent:fulltimepurpose', name: 'Full Time Purpose Bot', type: 'client-bot' },
    { key: 'agent:introductioncom', name: 'Introduction.com Bot', type: 'client-bot' },
  ];
  return agents.map(a => ({ ...a, tokens: 0, contextTokens: 200000, utilization: 0, status: 'idle', compactions: 0, model: 'claude-sonnet-4-6' }));
}

function skeleton() {
  return {
    timestamp: new Date().toISOString(),
    totalSessions: 9,
    totalTokens: 0,
    model: 'anthropic/claude-sonnet-4-6',
    sessions: defaultSessions(),
    dailyStats: { date: new Date().toISOString().split('T')[0], totalTokensUsed: 0, estimatedCost: 0, compactionEvents: 0, overflowEvents: 0, peakUtilization: 0, averageUtilization: 0 },
    alerts: [{ type: 'info', message: 'Usage data pipeline not yet set up. Run the SQL in Supabase and trigger the usage report cron.', timestamp: new Date().toISOString(), severity: 'low' }],
    trends: { last7Days: [] },
  };
}
