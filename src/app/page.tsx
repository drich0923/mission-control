"use client";

import { useState, useEffect } from "react";

type Tab = "activity" | "calendar" | "search" | "tasks";

export default function MissionControl() {
  const [activeTab, setActiveTab] = useState<Tab>("activity");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Mission Control</h1>
                <p className="text-sm text-gray-400">Charlie AI Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                ● Online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-800 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <TabButton
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
              icon="📋"
              label="Activity Feed"
            />
            <TabButton
              active={activeTab === "calendar"}
              onClick={() => setActiveTab("calendar")}
              icon="📅"
              label="Calendar"
            />
            <TabButton
              active={activeTab === "search"}
              onClick={() => setActiveTab("search")}
              icon="🔍"
              label="Search"
            />
            <TabButton
              active={activeTab === "tasks"}
              onClick={() => setActiveTab("tasks")}
              icon="📋"
              label="Tasks"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "activity" && <ActivityTab />}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "search" && <SearchTab />}
        {activeTab === "tasks" && <TasksTab />}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
        active
          ? "border-emerald-500 text-white"
          : "border-transparent text-gray-400 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function ActivityTab() {
  const [activities, setActivities] = useState([
    {
      id: "1",
      icon: "📝",
      description: "Created Budget Dog Cash Collected Refund Tracker SOP",
      time: "15m ago",
      type: "File Write",
      color: "bg-green-500/20 text-green-400"
    },
    {
      id: "2", 
      icon: "🔧",
      description: "Fixed Mission Control deployment issues - all tabs now working",
      time: "45m ago",
      type: "Deploy",
      color: "bg-emerald-500/20 text-emerald-400"
    },
    {
      id: "3",
      icon: "⚙️",
      description: "Updated OpenClaw config to enforce DM-only boundaries", 
      time: "1h ago",
      type: "Config",
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      id: "4",
      icon: "📞",
      description: "Processed Fathom call transcripts for task extraction",
      time: "2h ago", 
      type: "API Call",
      color: "bg-cyan-500/20 text-cyan-400"
    },
    {
      id: "5",
      icon: "📊",
      description: "Generated weekly Budget Dog performance report",
      time: "3h ago",
      type: "Report",
      color: "bg-blue-500/20 text-blue-400"
    }
  ]);

  // Load real activity data
  useEffect(() => {
    // TODO: Replace with real activity API call
    // fetchActivities().then(setActivities);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
        <span className="text-sm text-gray-400">{activities.length} activities</span>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                <span className="text-lg">{activity.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.description}</p>
                <div className="flex gap-2 text-sm text-gray-400 mt-1">
                  <span>{activity.type}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarTab() {
  const tasks = [
    { id: "1", name: "Nightly Maintenance", time: "Daily 3:00 AM ET", type: "cron", status: "active" },
    { id: "2", name: "KLOW Peptide Reminder", time: "M-F 8:00 AM ET", type: "reminder", status: "active" },
    { id: "3", name: "Ipa/Tesa Peptide Reminder", time: "Daily 10:00 PM ET", type: "reminder", status: "active" },
    { id: "4", name: "Friday Manager Check-In", time: "Fridays 9:00 AM ET", type: "cron", status: "active" },
    { id: "5", name: "Budget Dog Weekly Report", time: "Mondays 8:00 AM ET", type: "report", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar & Scheduled Tasks</h2>
          <p className="text-gray-400">Cron jobs, reminders, and recurring tasks</p>
        </div>
        <span className="text-sm text-gray-400">{tasks.filter(t => t.status === "active").length} active</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⏰</span>
            Scheduled Tasks
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{task.name}</h4>
                  <p className="text-sm text-gray-400">{task.time}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.type === "cron" ? "bg-emerald-500/20 text-emerald-400" :
                    task.type === "reminder" ? "bg-blue-500/20 text-blue-400" :
                    "bg-purple-500/20 text-purple-400"
                  }`}>
                    {task.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📊</span>
            Task Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Active Tasks</span>
              <span className="text-white font-semibold">{tasks.filter(t => t.status === "active").length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Cron Jobs</span>
              <span className="text-emerald-400 font-semibold">{tasks.filter(t => t.type === "cron").length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Reminders</span>
              <span className="text-blue-400 font-semibold">{tasks.filter(t => t.type === "reminder").length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Reports</span>
              <span className="text-purple-400 font-semibold">{tasks.filter(t => t.type === "report").length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchTab() {
  const [query, setQuery] = useState("");
  
  const documents = [
    { id: "1", title: "Charlie's Long-Term Memory", type: "memory", path: "MEMORY.md", excerpt: "Identity, business context, and key relationships..." },
    { id: "2", title: "About Dylan", type: "document", path: "USER.md", excerpt: "Co-founder of Automated Revenue LLC, sales expert..." },
    { id: "3", title: "Tool Configuration", type: "document", path: "TOOLS.md", excerpt: "Google Workspace, Slack, n8n configurations..." },
    { id: "4", title: "Daily Memory - Today", type: "memory", path: "memory/2026-02-10.md", excerpt: "Mission control fixes, boundary violations resolved..." },
    { id: "5", title: "Budget Dog SOPs", type: "document", path: "client-sops/budgetdog-*", excerpt: "Client-specific procedures and workflows..." },
  ];

  const filteredDocs = query.trim() 
    ? documents.filter(doc => 
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : documents;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Global Search</h2>
        <p className="text-gray-400">Search workspace documents, memory files, and SOPs</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-lg">🔍</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents, memory, configurations..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {query.trim() ? `Search Results (${filteredDocs.length})` : "All Documents"}
          </h3>
        </div>

        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-xl">
                {doc.type === "memory" ? "🧠" : doc.type === "document" ? "📄" : "📝"}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white">{doc.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    doc.type === "memory" ? "bg-purple-500/20 text-purple-400" :
                    doc.type === "document" ? "bg-blue-500/20 text-blue-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    {doc.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{doc.path}</p>
                <p className="text-sm text-gray-300">{doc.excerpt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksTab() {
  const [tasks, setTasks] = useState<any>({});
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load real task data
  useEffect(() => {
    loadTasks();
  }, []);

  const normalizeTask = (task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.due_date ?? task.dueDate ?? null,
    source: task.source,
    tags: task.tags || [],
    assignee: task.assignee,
    createdAt: task.created_at ?? task.createdAt,
    completedAt: task.completed_at ?? task.completedAt ?? null,
    updatedAt: task.updated_at ?? task.updatedAt ?? null,
  });

  const groupTasksByStatus = (flatTasks: any[]) => {
    const grouped: any = {
      "from-calls": [],
      "charlie-queue": [],
      "dylan-queue": [],
      "needs-scoping": [],
      "in-progress": [],
      "completed": [],
    };
    flatTasks.forEach((task) => {
      const normalized = normalizeTask(task);
      const bucket = normalized.status in grouped ? normalized.status : "from-calls";
      grouped[bucket].push(normalized);
    });
    return grouped;
  };

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const apiTasks = await response.json();
      setTasks(groupTasksByStatus(apiTasks));
    } catch (error) {
      console.error("Failed to load tasks:", error);
      setTasks({ "from-calls": [], "charlie-queue": [], "dylan-queue": [], "needs-scoping": [], "in-progress": [], "completed": [] });
    } finally {
      setIsLoading(false);
    }
  };

  // Update local state only (no localStorage)
  const saveTasks = (newTasks: any) => {
    setTasks(newTasks);
  };

  // Add new tasks from webhook
  const addTasksFromWebhook = (newTasks: any[]) => {
    setTasks((prev: any) => {
      const updated = { ...prev };
      
      newTasks.forEach(task => {
        // Add to "from-calls" column
        if (!updated['from-calls']) updated['from-calls'] = [];
        updated['from-calls'].push(task);
      });
      
      return updated;
    });
  };

  const handleSyncFathom = async () => {
    const action = confirm(
      "Choose sync option:\n\n" +
      "OK = Test with sample call data\n" +
      "Cancel = Show webhook setup info"
    );
    
    if (action) {
      // Test with sample data
      try {
        const response = await fetch('/api/webhook/test', {
          method: 'POST'
        });
        
        const result = await response.json();
        
        if (response.ok && result.webhookResponse?.tasks) {
          // Add the extracted tasks to the kanban
          addTasksFromWebhook(result.webhookResponse.tasks);
          
          alert(
            `✅ Sample call processed successfully!\n\n` +
            `Call: ${result.mockData.title}\n` +
            `Tasks extracted: ${result.webhookResponse.tasksCreated}\n\n` +
            `Check the "From Calls" column for new tasks.`
          );
        } else {
          throw new Error(result.message || 'Test failed');
        }
      } catch (error) {
        console.error("Test webhook error:", error);
        alert("Failed to test webhook. Check console for details.");
      }
    } else {
      // Show webhook setup info
      alert(
        `🔗 Fathom Webhook Setup\n\n` +
        `Webhook URL:\n${window.location.origin}/api/webhook/fathom\n\n` +
        `Configure this URL in your Zapier "Webhooks by Zapier" POST action.\n\n` +
        `The webhook will automatically extract tasks from call transcripts and add them to the "From Calls" column.`
      );
    }
  };

  const columns = [
    { id: "from-calls", title: "From Calls", icon: "📞", description: "Newly extracted tasks" },
    { id: "charlie-queue", title: "Charlie Queue", icon: "🤖", description: "Approved for Charlie" },
    { id: "dylan-queue", title: "Dylan Queue", icon: "👨‍💼", description: "Dylan to handle" },
    { id: "needs-scoping", title: "Needs Scoping", icon: "❓", description: "Unclear complexity" },
    { id: "in-progress", title: "In Progress", icon: "🔄", description: "Currently working" },
    { id: "completed", title: "Completed", icon: "✅", description: "Done" },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string, currentColumn: string) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("currentColumn", currentColumn);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const currentColumn = e.dataTransfer.getData("currentColumn");

    if (currentColumn === targetColumn) return;

    const updatedTasks = { ...tasks } as any;
    const taskIndex = updatedTasks[currentColumn].findIndex((task: any) => task.id === taskId);
    
    if (taskIndex >= 0) {
      const task = { ...updatedTasks[currentColumn][taskIndex] };
      task.status = targetColumn;
      task.updatedAt = new Date().toISOString();
      
      // Auto-assign based on column
      if (targetColumn === "charlie-queue") task.assignee = "charlie";
      else if (targetColumn === "dylan-queue") task.assignee = "dylan";
      else if (targetColumn === "completed") task.completedAt = new Date().toISOString();
      
      updatedTasks[currentColumn].splice(taskIndex, 1);
      updatedTasks[targetColumn].push(task);
      
      saveTasks(updatedTasks);

      // Sync status change to backend
      fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: targetColumn,
          assignee: task.assignee,
          completed_at: task.completedAt || null,
        }),
      }).catch((err) => console.error('Failed to sync task status:', err));
    }
  };

  const handleTaskClick = (task: any, e: React.MouseEvent) => {
    // Prevent modal opening when dragging
    if (e.defaultPrevented) return;
    setSelectedTask(task);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Task Management</h2>
          <p className="text-gray-400">Real-time kanban board with Fathom integration</p>
        </div>
        <button 
          onClick={handleSyncFathom}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          Sync Fathom Calls
          <span>📞</span>
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4 min-h-96">
        {columns.map((column) => (
          <div 
            key={column.id}
            className="bg-gray-800 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{column.icon}</span>
                <h3 className="font-semibold text-white">{column.title}</h3>
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {tasks[column.id as keyof typeof tasks]?.length || 0}
                </span>
              </div>
              <p className="text-xs text-gray-400">{column.description}</p>
            </div>
            
            <div className="space-y-3">
              {(tasks[column.id as keyof typeof tasks] || []).map((task: any) => (
                <div 
                  key={task.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  onClick={(e) => handleTaskClick(task, e)}
                  className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors border-l-4 border-gray-600 hover:border-emerald-400"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-white line-clamp-2">{task.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ml-2 ${
                      task.priority === "HIGH" ? "bg-red-900/20 text-red-300" :
                      task.priority === "MEDIUM" ? "bg-yellow-900/20 text-yellow-300" :
                      "bg-green-900/20 text-green-300"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-2">{task.description}</p>
                  
                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex gap-1 mb-2">
                      {task.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-xs bg-gray-600 text-gray-300 px-1 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                      {task.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{task.tags.length - 2}</span>
                      )}
                    </div>
                  )}
                  
                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div>
                      {task.source === "fathom_call" && (
                        <span className="flex items-center gap-1">
                          📞 {task.callTitle}
                        </span>
                      )}
                      {task.assignee && (
                        <span className="text-emerald-400">
                          👤 {task.assignee}
                        </span>
                      )}
                    </div>
                    {task.dueDate && (
                      <span className="text-yellow-400">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
          onDelete={(taskId: string) => {
            const newTasks = { ...tasks };
            for (const col of Object.keys(newTasks)) {
              newTasks[col] = newTasks[col].filter((t: any) => t.id !== taskId);
            }
            saveTasks(newTasks);
            setSelectedTask(null);
          }}
          onUpdate={(updatedTask: any) => {
            // Sync to backend
            fetch(`/api/tasks/${updatedTask.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: updatedTask.title,
                description: updatedTask.description,
                priority: updatedTask.priority,
                status: updatedTask.status,
                assignee: updatedTask.assignee,
                due_date: updatedTask.dueDate || null,
                tags: updatedTask.tags || [],
                completed_at: updatedTask.completedAt || null,
              }),
            }).catch((err) => console.error('Failed to sync task update:', err));

            // Update local state
            const newTasks = { ...tasks };
            const column = updatedTask.status;
            if (newTasks[column]) {
              const taskIndex = newTasks[column].findIndex((t: any) => t.id === updatedTask.id);
              if (taskIndex >= 0) {
                newTasks[column][taskIndex] = updatedTask;
                saveTasks(newTasks);
              }
            }
            setSelectedTask(null);
          }}
        />
      )}

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-blue-400 text-sm">
          ✨ <strong>Real Data Integration:</strong> Click any task to view/edit details. Drag tasks between columns to update status. Ready for Fathom API integration.
        </p>
      </div>
    </div>
  );
}

// Task Modal Component
function TaskModal({ task, onClose, onUpdate, onDelete }: { task: any; onClose: () => void; onUpdate: (task: any) => void; onDelete: (taskId: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    onUpdate({ ...editedTask, updatedAt: new Date().toISOString() });
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${task.title}"? This cannot be undone.`)) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      onDelete(task.id);
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Failed to delete task. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Task Details</h3>
          <div className="flex gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
              >
                Edit
              </button>
            )}
            {!isEditing && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded text-sm"
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                  <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={editedTask.dueDate || ""}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Task Info */}
              <div>
                <h4 className="font-semibold text-white mb-2 text-lg">{task.title}</h4>
                <p className="text-gray-300">{task.description}</p>
              </div>

              {/* Meta Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Priority:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    task.priority === "HIGH" ? "bg-red-900/20 text-red-300" :
                    task.priority === "MEDIUM" ? "bg-yellow-900/20 text-yellow-300" :
                    "bg-green-900/20 text-green-300"
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="ml-2 text-white">{task.status.replace("-", " ").toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-gray-400">Source:</span>
                  <span className="ml-2 text-white">{task.source === "fathom_call" ? "Fathom Call" : "Manual"}</span>
                </div>
                {task.assignee && (
                  <div>
                    <span className="text-gray-400">Assignee:</span>
                    <span className="ml-2 text-emerald-400">{task.assignee}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Created:</span>
                  <span className="ml-2 text-white">{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                {task.dueDate && (
                  <div>
                    <span className="text-gray-400">Due Date:</span>
                    <span className="ml-2 text-yellow-400">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Source Call Info */}
              {task.callTitle && (
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="font-medium text-white mb-2">📞 Source Call</h5>
                  <div className="text-sm text-gray-300">
                    <p><span className="text-gray-400">Call:</span> {task.callTitle}</p>
                    <p><span className="text-gray-400">Date:</span> {new Date(task.callDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="font-medium text-white mb-2">🏷️ Tags</h5>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag: string) => (
                      <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Info */}
              {task.completedAt && (
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="font-medium text-white mb-2">✅ Completed</h5>
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-400">Completed:</span> {new Date(task.completedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}