import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/usage - Token usage and spend statistics
// Note: Currently returns representative data. To wire up real-time data,
// a Charlie cron job needs to write session_status output to Supabase periodically.
export async function GET() {
  try {
    const now = new Date().toISOString();

    const data = {
      timestamp: now,
      totalSessions: 9, // main + 8 client bots
      totalTokens: 0, // populated by real data pipeline when available
      model: 'anthropic/claude-sonnet-4-6',
      sessions: [
        {
          key: 'agent:main:main',
          name: 'Charlie (Main)',
          type: 'interactive',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'healthy',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:munera',
          name: 'Munera Capital Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:woobie',
          name: 'Woobie Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:budgetdog',
          name: 'Budgetdog Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:budgetdogtax',
          name: 'Budgetdog Tax Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:growthghost',
          name: 'Growth Ghost Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:simpleprogrammer',
          name: 'Simple Programmer Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:fulltimepurpose',
          name: 'Full Time Purpose Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
        {
          key: 'agent:introductioncom',
          name: 'Introduction.com Bot',
          type: 'client-bot',
          model: 'claude-sonnet-4-6',
          tokens: 0,
          contextTokens: 200000,
          utilization: 0,
          status: 'idle',
          lastActivity: now,
          compactions: 0,
        },
      ],
      dailyStats: {
        date: new Date().toISOString().split('T')[0],
        totalTokensUsed: 0,
        estimatedCost: 0,
        compactionEvents: 0,
        overflowEvents: 0,
        peakUtilization: 0,
        averageUtilization: 0,
      },
      alerts: [
        {
          type: 'info',
          message: 'Real-time data pipeline not yet connected. Charlie writes usage reports weekly (Mondays 9am ET). Wire up a Supabase table to get live stats here.',
          timestamp: now,
          severity: 'low',
        },
      ],
      trends: {
        last7Days: [] as { date: string; tokens: number; cost: number }[],
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching usage data:', error);
    return NextResponse.json({ error: 'Failed to fetch usage data' }, { status: 500 });
  }
}
