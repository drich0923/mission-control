import { NextRequest, NextResponse } from 'next/server';
import { taskOperations } from '../../../../../lib/supabase';

// Force dynamic for webhook endpoint
export const dynamic = 'force-dynamic';

// Mock AI task extraction (replace with real AI service)
async function extractTasksFromTranscript(transcript: string, callTitle: string, callDate: string) {
  // TODO: Replace with real AI task extraction
  // For now, return mock extracted tasks based on transcript content
  
  const tasks = [];
  
  // Simple keyword-based task extraction for demo
  const actionWords = ['follow up', 'create', 'update', 'review', 'implement', 'schedule', 'send', 'call', 'email', 'document', 'setup', 'configure'];
  
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 10);
  
  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase();
    
    // Check if sentence contains action words and seems like a task
    if (actionWords.some(word => lowerSentence.includes(word)) && 
        (lowerSentence.includes('need to') || lowerSentence.includes('should') || 
         lowerSentence.includes('will') || lowerSentence.includes('action'))) {
      
      // Extract potential task
      let taskTitle = sentence.trim();
      if (taskTitle.length > 80) {
        taskTitle = taskTitle.substring(0, 80) + '...';
      }
      
      // Determine priority based on keywords
      let priority = 'MEDIUM';
      if (lowerSentence.includes('urgent') || lowerSentence.includes('asap') || 
          lowerSentence.includes('immediately') || lowerSentence.includes('critical')) {
        priority = 'HIGH';
      } else if (lowerSentence.includes('later') || lowerSentence.includes('eventually') || 
                 lowerSentence.includes('when time')) {
        priority = 'LOW';
      }
      
      // Extract tags from call title and content
      const tags: string[] = [];
      const callWords = callTitle.toLowerCase().split(' ');
      ['budget', 'dog', 'ghl', 'training', 'review', 'onboarding', 'sales'].forEach(tag => {
        if (callWords.some(word => word.includes(tag)) || lowerSentence.includes(tag)) {
          tags.push(tag);
        }
      });
      
      tasks.push({
        id: Math.random().toString(36).substring(7),
        title: taskTitle,
        description: `Extracted from call: ${sentence.trim()}`,
        priority,
        source: 'fathom_call',
        callTitle,
        callDate,
        tags,
        assignee: null,
        dueDate: null,
        status: 'from-calls',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Limit to max 3 tasks per call to avoid spam
      if (tasks.length >= 3) break;
    }
  }
  
  return tasks;
}

// Webhook endpoint to receive Fathom data from Zapier
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the incoming webhook data for debugging
    console.log('Fathom webhook received:', {
      timestamp: new Date().toISOString(),
      hasTranscript: !!body.transcript,
      callTitle: body.title || body.name,
      participants: body.participants?.length || 0
    });
    
    // Extract data from Zapier webhook payload
    // Adjust these field names based on what Zapier sends
    const {
      transcript,
      title: callTitle,
      name: callName,
      created_at: createdAt,
      date: callDate,
      participants = [],
      duration,
      recording_url: recordingUrl
    } = body;
    
    // Use title or name for call title
    const finalCallTitle = callTitle || callName || 'Untitled Call';
    const finalCallDate = callDate || createdAt || new Date().toISOString();
    
    // Validate required fields
    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }
    
    // Extract tasks from transcript
    const extractedTasks = await extractTasksFromTranscript(
      transcript,
      finalCallTitle,
      finalCallDate
    );
    
    // Save tasks to database
    const savedTasks = [];
    for (const task of extractedTasks) {
      try {
        const savedTask = await taskOperations.createTask({
          title: task.title,
          description: task.description,
          status: 'from-calls',
          priority: task.priority as 'LOW' | 'MEDIUM' | 'HIGH',
          assignee: task.assignee as 'charlie' | 'dylan' | null,
          due_date: task.dueDate || undefined,
          tags: task.tags,
          source: 'fathom_call',
          source_data: {
            call_title: finalCallTitle,
            call_date: finalCallDate,
            call_url: recordingUrl,
            transcript_excerpt: task.description
          }
        });
        savedTasks.push(savedTask);
      } catch (error) {
        console.error('Error saving task:', error);
        // Continue with other tasks even if one fails
      }
    }
    
    const response = {
      success: true,
      message: `Processed call: ${finalCallTitle}`,
      call: {
        title: finalCallTitle,
        date: finalCallDate,
        participants: Array.isArray(participants) ? participants : [],
        duration,
        recordingUrl,
        transcript: transcript.substring(0, 500) + '...' // Truncated for response
      },
      tasks: savedTasks,
      tasksCreated: savedTasks.length,
      tasksExtracted: extractedTasks.length,
      timestamp: new Date().toISOString()
    };
    
    // Log successful processing
    console.log('Fathom webhook processed:', {
      callTitle: finalCallTitle,
      tasksCreated: extractedTasks.length,
      taskTitles: extractedTasks.map(t => t.title)
    });
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Fathom webhook error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook verification/testing
export async function GET() {
  return NextResponse.json({
    message: 'Fathom webhook endpoint is active',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}