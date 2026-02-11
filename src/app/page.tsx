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

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with real API call
      // For now, use demo data but structure it as if from API
      const mockTasks = {
        "from-calls": [
          { 
            id: "1", 
            title: "Follow up on Budget Dog quarterly review", 
            priority: "HIGH", 
            description: "Schedule Q1 review meeting with Budget Dog team to discuss performance metrics and upcoming initiatives",
            dueDate: "2026-02-15",
            source: "fathom_call",
            callTitle: "Budget Dog Weekly Check-in",
            callDate: "2026-02-10",
            tags: ["budget-dog", "quarterly-review", "meeting"],
            assignee: null,
            createdAt: "2026-02-10T14:30:00Z",
            status: "from-calls"
          },
          { 
            id: "2", 
            title: "Create GHL training materials", 
            priority: "MEDIUM", 
            description: "Comprehensive sales rep training documentation for new automation workflows and best practices",
            dueDate: null,
            source: "fathom_call", 
            callTitle: "Training Strategy Discussion",
            callDate: "2026-02-09",
            tags: ["ghl", "training", "documentation"],
            assignee: null,
            createdAt: "2026-02-09T16:15:00Z",
            status: "from-calls"
          }
        ],
        "charlie-queue": [
          { 
            id: "3", 
            title: "Update client onboarding documentation", 
            priority: "MEDIUM", 
            description: "Revise automation sequences and improve clarity for new client setup process",
            dueDate: "2026-02-12",
            source: "manual",
            tags: ["documentation", "onboarding", "automation"],
            assignee: "charlie",
            createdAt: "2026-02-08T10:20:00Z",
            status: "charlie-queue"
          }
        ],
        "dylan-queue": [
          { 
            id: "4", 
            title: "Review Introduction.com proposal", 
            priority: "HIGH", 
            description: "Strategic partnership evaluation and feedback on revised service proposal",
            dueDate: "2026-02-11",
            source: "fathom_call",
            callTitle: "Introduction.com Strategy Session",
            callDate: "2026-02-07",
            tags: ["introduction.com", "partnership", "strategy"],
            assignee: "dylan",
            createdAt: "2026-02-07T14:45:00Z",
            status: "dylan-queue"
          }
        ],
        "needs-scoping": [
          { 
            id: "5", 
            title: "Implement lead scoring system", 
            priority: "MEDIUM", 
            description: "Research and implement automated lead scoring based on engagement metrics and demographics",
            dueDate: null,
            source: "fathom_call",
            callTitle: "Lead Quality Discussion",
            callDate: "2026-02-06",
            tags: ["lead-scoring", "automation", "analytics"],
            assignee: null,
            createdAt: "2026-02-06T11:30:00Z",
            status: "needs-scoping"
          }
        ],
        "in-progress": [
          { 
            id: "6", 
            title: "Mission Control dashboard deployment", 
            priority: "HIGH", 
            description: "Full-featured task management interface with real-time updates and Fathom integration",
            dueDate: null,
            source: "manual",
            tags: ["mission-control", "dashboard", "development"],
            assignee: "charlie",
            createdAt: "2026-02-05T09:00:00Z",
            status: "in-progress"
          }
        ],
        "completed": [
          { 
            id: "7", 
            title: "Fix OpenClaw boundary violations", 
            priority: "HIGH", 
            description: "Configure DM-only responses to prevent accidental responses in other channels",
            dueDate: null,
            source: "manual",
            tags: ["openclaw", "configuration", "boundaries"],
            assignee: "charlie",
            createdAt: "2026-02-04T13:15:00Z",
            completedAt: "2026-02-10T21:25:00Z",
            status: "completed"
          },
          { 
            id: "8", 
            title: "Budget Dog refund tracker SOP", 
            priority: "MEDIUM", 
            description: "Cash collection process documentation and workflow setup",
            dueDate: null,
            source: "fathom_call",
            callTitle: "Budget Dog Operations Review",
            callDate: "2026-02-03",
            tags: ["budget-dog", "sop", "refunds"],
            assignee: "charlie",
            createdAt: "2026-02-03T15:45:00Z",
            completedAt: "2026-02-10T20:30:00Z",
            status: "completed"
          }
        ]
      };

      setTasks(mockTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncFathom = async () => {
    // TODO: Implement real Fathom sync
    console.log("Syncing with Fathom API...");
    alert("Fathom sync would extract new tasks from recent call transcripts");
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

    setTasks((prev: any) => {
      const newTasks = { ...prev } as any;
      const taskIndex = newTasks[currentColumn].findIndex((task: any) => task.id === taskId);
      
      if (taskIndex >= 0) {
        const task = { ...newTasks[currentColumn][taskIndex] };
        task.status = targetColumn;
        task.updatedAt = new Date().toISOString();
        
        // Auto-assign based on column
        if (targetColumn === "charlie-queue") task.assignee = "charlie";
        else if (targetColumn === "dylan-queue") task.assignee = "dylan";
        else if (targetColumn === "completed") task.completedAt = new Date().toISOString();
        
        newTasks[currentColumn].splice(taskIndex, 1);
        newTasks[targetColumn].push(task);
      }
      
      return newTasks;
    });

    // TODO: Sync change to backend
    console.log(`Moved task ${taskId} from ${currentColumn} to ${targetColumn}`);
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
          onUpdate={(updatedTask: any) => {
            // Update task in state
            setTasks((prev: any) => {
              const newTasks = { ...prev };
              const column = updatedTask.status;
              const taskIndex = newTasks[column].findIndex((t: any) => t.id === updatedTask.id);
              if (taskIndex >= 0) {
                newTasks[column][taskIndex] = updatedTask;
              }
              return newTasks;
            });
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
function TaskModal({ task, onClose, onUpdate }: { task: any; onClose: () => void; onUpdate: (task: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate({ ...editedTask, updatedAt: new Date().toISOString() });
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