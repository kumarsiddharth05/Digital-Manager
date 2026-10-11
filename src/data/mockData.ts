// ─── Employees ───────────────────────────────────────────────────────────────
export type EmployeeStatus = "online" | "offline" | "busy" | "away";
export type EmployeeRole =
  | "CEO"
  | "CTO"
  | "Product Designer"
  | "Frontend Engineer"
  | "Backend Engineer"
  | "Marketing Lead";

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  email: string;
  avatar: string;
  avatarColor: string;
  status: EmployeeStatus;
  joinDate: string;
  department: string;
}

export const employees: Employee[] = [
  { id:"emp-1", name:"Aisha Patel",    role:"CEO",               email:"aisha@digitalmanager.io",  avatar:"AP", avatarColor:"#6366f1", status:"online",  joinDate:"2022-01-10", department:"Leadership" },
  { id:"emp-2", name:"Marcus Chen",    role:"CTO",               email:"marcus@digitalmanager.io", avatar:"MC", avatarColor:"#0ea5e9", status:"busy",    joinDate:"2022-03-15", department:"Engineering" },
  { id:"emp-3", name:"Sofia Rivera",   role:"Product Designer",  email:"sofia@digitalmanager.io",  avatar:"SR", avatarColor:"#ec4899", status:"online",  joinDate:"2022-06-01", department:"Design" },
  { id:"emp-4", name:"James Okafor",   role:"Frontend Engineer", email:"james@digitalmanager.io",  avatar:"JO", avatarColor:"#10b981", status:"online",  joinDate:"2023-02-20", department:"Engineering" },
  { id:"emp-5", name:"Priya Nair",     role:"Marketing Lead",    email:"priya@digitalmanager.io",  avatar:"PN", avatarColor:"#f59e0b", status:"away",    joinDate:"2023-05-08", department:"Marketing" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export type ProjectStatus = "active" | "planning" | "on-hold" | "completed";

export interface Project {
  id: string; name: string; description: string;
  status: ProjectStatus; progress: number; deadline: string;
  teamIds: string[]; tasksTotal: number; tasksDone: number; color: string;
}

export const projects: Project[] = [
  { id:"proj-1", name:"Brand Refresh",         description:"Update visual identity, design system, and marketing assets for Q4 launch.",          status:"active",    progress:68, deadline:"2026-11-15", teamIds:["emp-3","emp-5","emp-1"], tasksTotal:24, tasksDone:16, color:"#6366f1" },
  { id:"proj-2", name:"Dashboard v2",           description:"Complete rebuild of the internal analytics dashboard with real-time data.",             status:"active",    progress:42, deadline:"2026-12-01", teamIds:["emp-2","emp-4","emp-3"], tasksTotal:38, tasksDone:16, color:"#0ea5e9" },
  { id:"proj-3", name:"API Integration",        description:"Connect third-party services: Stripe, SendGrid, and Twilio.",                           status:"planning",  progress:15, deadline:"2027-01-20", teamIds:["emp-2","emp-4"],          tasksTotal:18, tasksDone:3,  color:"#10b981" },
  { id:"proj-4", name:"Q4 Marketing Campaign",  description:"Multi-channel campaign covering email, social, and paid ads.",                          status:"active",    progress:55, deadline:"2026-10-31", teamIds:["emp-5","emp-1"],          tasksTotal:12, tasksDone:7,  color:"#f59e0b" },
  { id:"proj-5", name:"Onboarding Flow",        description:"Redesign the new user onboarding experience end-to-end.",                               status:"on-hold",   progress:30, deadline:"2027-02-10", teamIds:["emp-3","emp-4","emp-1"],  tasksTotal:20, tasksDone:6,  color:"#ec4899" },
];

// ─── Tasks ────────────────────────────────────────────────────────────────────
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string; title: string; description: string;
  status: TaskStatus; priority: TaskPriority;
  assigneeId: string; projectId: string;
  dueDate: string; tags: string[];
}

export const tasks: Task[] = [
  { id:"task-1",  title:"Finalize color palette for brand refresh",  description:"Choose primary, secondary, and neutral colors.", status:"done",        priority:"high",   assigneeId:"emp-3", projectId:"proj-1", dueDate:"2026-10-05", tags:["design","branding"] },
  { id:"task-2",  title:"Implement dark mode token system",           description:"CSS custom properties for dark/light themes.",   status:"in-progress", priority:"high",   assigneeId:"emp-4", projectId:"proj-2", dueDate:"2026-10-18", tags:["frontend","design-system"] },
  { id:"task-3",  title:"Write API documentation for endpoints",      description:"OpenAPI spec for all v2 endpoints.",             status:"todo",        priority:"medium", assigneeId:"emp-2", projectId:"proj-3", dueDate:"2026-10-25", tags:["backend","docs"] },
  { id:"task-4",  title:"Set up Stripe webhook handler",              description:"Handle payment events: succeeded, failed.",      status:"todo",        priority:"urgent", assigneeId:"emp-2", projectId:"proj-3", dueDate:"2026-10-20", tags:["backend","payments"] },
  { id:"task-5",  title:"Create email campaign templates",            description:"Design 3 email templates for Q4 campaign.",      status:"in-progress", priority:"high",   assigneeId:"emp-5", projectId:"proj-4", dueDate:"2026-10-22", tags:["marketing","email"] },
  { id:"task-6",  title:"Dashboard chart components",                 description:"Build reusable line, bar, and donut charts.",    status:"review",      priority:"high",   assigneeId:"emp-4", projectId:"proj-2", dueDate:"2026-10-15", tags:["frontend","charts"] },
  { id:"task-7",  title:"User research interviews",                   description:"Conduct 5 user interviews for onboarding.",       status:"done",        priority:"medium", assigneeId:"emp-3", projectId:"proj-5", dueDate:"2026-09-30", tags:["research","ux"] },
  { id:"task-8",  title:"Social media content calendar",              description:"Plan 30 days of LinkedIn and Twitter content.",  status:"review",      priority:"medium", assigneeId:"emp-5", projectId:"proj-4", dueDate:"2026-10-17", tags:["marketing","social"] },
  { id:"task-9",  title:"Performance audit – dashboard load time",    description:"Reduce initial load from 4.2s to under 1.5s.",   status:"todo",        priority:"high",   assigneeId:"emp-4", projectId:"proj-2", dueDate:"2026-10-30", tags:["frontend","performance"] },
  { id:"task-10", title:"Logo redesign concepts",                     description:"Deliver 3 distinct logo directions.",            status:"done",        priority:"urgent", assigneeId:"emp-3", projectId:"proj-1", dueDate:"2026-09-25", tags:["design","branding"] },
  { id:"task-11", title:"Investor update slide deck",                 description:"Prepare Q3 metrics slide deck.",                 status:"in-progress", priority:"urgent", assigneeId:"emp-1", projectId:"proj-4", dueDate:"2026-10-20", tags:["leadership","reporting"] },
  { id:"task-12", title:"SendGrid integration",                       description:"Integrate transactional email via SendGrid.",    status:"todo",        priority:"medium", assigneeId:"emp-2", projectId:"proj-3", dueDate:"2026-11-05", tags:["backend","email"] },
];

// ─── Activity Feed ────────────────────────────────────────────────────────────
export interface ActivityItem {
  id: string; employeeId: string; action: string; target: string; time: string;
  type: "task" | "project" | "comment" | "file" | "member";
}

export const activityFeed: ActivityItem[] = [
  { id:"act-1", employeeId:"emp-4", action:"completed",           target:"Dashboard chart components",       time:"2 min ago",  type:"task" },
  { id:"act-2", employeeId:"emp-3", action:"uploaded a file to",  target:"Brand Refresh",                    time:"18 min ago", type:"file" },
  { id:"act-3", employeeId:"emp-5", action:"commented on",        target:"Social media content calendar",    time:"1 hr ago",   type:"comment" },
  { id:"act-4", employeeId:"emp-2", action:"created task",        target:"Set up Stripe webhook handler",    time:"2 hr ago",   type:"task" },
  { id:"act-5", employeeId:"emp-1", action:"updated status of",   target:"Q4 Marketing Campaign",            time:"3 hr ago",   type:"project" },
  { id:"act-6", employeeId:"emp-3", action:"moved to review",     target:"Dashboard chart components",       time:"5 hr ago",   type:"task" },
];

// ─── Chat ─────────────────────────────────────────────────────────────────────
export interface ChatChannel {
  id: string; name: string; type: "general" | "project" | "direct";
  projectId?: string; memberIds: string[];
  lastMessage: string; lastTime: string; unread: number;
}

export interface ChatMessage {
  id: string; channelId: string; senderId: string;
  text: string; time: string; isMe?: boolean;
}

export const chatChannels: ChatChannel[] = [
  { id:"ch-1", name:"general",           type:"general", memberIds:["emp-1","emp-2","emp-3","emp-4","emp-5"], lastMessage:"Let'`s do a quick sync at 3pm.", lastTime:"10:42 AM", unread:3 },
  { id:"ch-2", name:"brand-refresh",     type:"project", projectId:"proj-1", memberIds:["emp-3","emp-5","emp-1"], lastMessage:"New logo concepts are uploaded!", lastTime:"9:15 AM", unread:0 },
  { id:"ch-3", name:"dashboard-v2",      type:"project", projectId:"proj-2", memberIds:["emp-2","emp-4","emp-3"], lastMessage:"Chart components are in review.", lastTime:"Yesterday", unread:1 },
  { id:"ch-4", name:"engineering",       type:"general", memberIds:["emp-2","emp-4"], lastMessage:"Merging the auth PR now.", lastTime:"Yesterday", unread:0 },
  { id:"ch-5", name:"Aisha Patel",       type:"direct",  memberIds:["emp-1"], lastMessage:"Deck looks great, good work!", lastTime:"Mon", unread:0 },
];

export const chatMessages: ChatMessage[] = [
  { id:"msg-1",  channelId:"ch-1", senderId:"emp-1", text:"Good morning everyone! Exciting week — we present to investors Friday.", time:"9:01 AM" },
  { id:"msg-2",  channelId:"ch-1", senderId:"emp-3", text:"Morning! Just finished the final logo directions. Sharing Figma link shortly.", time:"9:08 AM" },
  { id:"msg-3",  channelId:"ch-1", senderId:"emp-4", text:"Charts look solid. Moved them to review — Marcus can you check?", time:"9:22 AM" },
  { id:"msg-4",  channelId:"ch-1", senderId:"emp-2", text:"On it. Also spinning up the Stripe webhook handler today — marked urgent.", time:"9:35 AM" },
  { id:"msg-5",  channelId:"ch-1", senderId:"emp-5", text:"Email templates are 80% done. Wrapped by EOD.", time:"10:10 AM" },
  { id:"msg-6",  channelId:"ch-1", senderId:"emp-1", text:"Let'`s do a quick sync at 3pm.", time:"10:42 AM", isMe:true },
  { id:"msg-7",  channelId:"ch-2", senderId:"emp-3", text:"New logo concepts are uploaded! Check the Figma file in the project folder.", time:"9:15 AM" },
  { id:"msg-8",  channelId:"ch-2", senderId:"emp-5", text:"Love concept B! The rounded mark feels more approachable.", time:"9:40 AM" },
  { id:"msg-9",  channelId:"ch-2", senderId:"emp-1", text:"Agreed on concept B. Let'`s move to the full identity system.", time:"9:55 AM", isMe:true },
  { id:"msg-10", channelId:"ch-3", senderId:"emp-4", text:"Chart components are in review. Used Recharts for line graphs.", time:"Yesterday 4:30 PM" },
  { id:"msg-11", channelId:"ch-3", senderId:"emp-2", text:"Looks good from backend. API response time is now under 120ms.", time:"Yesterday 5:00 PM" },
  { id:"msg-12", channelId:"ch-4", senderId:"emp-2", text:"Merging the auth PR now. Tagged you for review on the token refresh logic.", time:"Yesterday 3:15 PM" },
  { id:"msg-13", channelId:"ch-4", senderId:"emp-4", text:"Approved! The refresh endpoint is clean.", time:"Yesterday 3:45 PM" },
];
