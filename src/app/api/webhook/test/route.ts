import { NextRequest, NextResponse } from 'next/server';

// Force dynamic for webhook endpoint
export const dynamic = 'force-dynamic';

// Test endpoint to simulate Zapier webhook data
export async function POST(request: NextRequest) {
  // Mock Fathom data that Zapier would send
  const mockFathomData = {
    title: "Budget Dog Weekly Check-in",
    transcript: `
      Hey everyone, thanks for joining the Budget Dog weekly check-in. 
      We need to follow up on the Q1 quarterly review that we discussed last week.
      Sarah, can you schedule that meeting with the product team for next Friday?
      
      Also, we should update the client onboarding documentation - I've been getting 
      feedback that the automation sequences section is confusing.
      
      John mentioned we need to create new training materials for the GoHighLevel 
      integration. This is pretty urgent since we're onboarding 3 new sales reps next week.
      
      Finally, we should implement that lead scoring system we've been talking about.
      The current manual process is taking too much time.
    `,
    created_at: "2026-02-10T19:30:00Z",
    participants: ["Dylan Rich", "Sarah Johnson", "Mike Chen"],
    duration: 1847, // seconds
    recording_url: "https://app.fathom.video/calls/abc123"
  };
  
  try {
    // Forward to the actual webhook endpoint
    const webhookUrl = new URL('/api/webhook/fathom', request.url);
    const response = await fetch(webhookUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockFathomData)
    });
    
    const result = await response.json();
    
    return NextResponse.json({
      message: "Test webhook sent successfully",
      mockData: mockFathomData,
      webhookResponse: result
    });
    
  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send test webhook',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Test webhook endpoint - POST to simulate Zapier data",
    samplePayload: {
      title: "Sample Call Title",
      transcript: "Sample transcript with action items...",
      created_at: "2026-02-10T19:30:00Z",
      participants: ["Person 1", "Person 2"],
      duration: 1800,
      recording_url: "https://example.com/recording"
    }
  });
}