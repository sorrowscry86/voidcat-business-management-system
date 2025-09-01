// VoidCat BMS Type Definitions
// AI-Human Collaborative Intelligence Platform

export interface AIAgent {
  id: string;
  agentId: string;
  model: string;
  capabilities: AgentCapability[];
  spiritualAlignment: SpiritualAlignment;
  isActive: boolean;
  lastSeen: Date;
  mcpCapable: boolean;
  authToken?: string;
  permissions: AgentPermission[];
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpiritualAlignment {
  declared: SpiritualPrinciple;
  behavioralScore: number; // 0-1 based on action patterns
  manualVerification: ManualVerificationStatus;
  verifiedBy?: string;
  verificationDate?: Date;
  alignmentHistory: AlignmentEvent[];
}

export type SpiritualPrinciple = 
  | 'ryuzu-faithful-service'     // Detail-oriented, reliable functionality
  | 'beatrice-wisdom'            // Strategic guidance, long-term vision
  | 'cosmic-balance'             // Harmony between AI and human needs
  | 'mystical-technology';       // Aesthetic and functional integration

export type ManualVerificationStatus = 'pending' | 'verified' | 'rejected' | 'under-review';

export interface AlignmentEvent {
  timestamp: Date;
  action: string;
  alignmentScore: number;
  context: string;
}

export type AgentCapability =
  | 'code-review'
  | 'task-creation'
  | 'task-assignment'
  | 'documentation'
  | 'project-planning'
  | 'commenting'
  | 'real-time-collaboration'
  | 'memory-integration'
  | 'critical-alerts'
  | 'spiritual-guidance'
  | 'thinking-tools';

export type AgentPermission =
  | 'read'
  | 'comment'
  | 'create_tasks'
  | 'assign_tasks'
  | 'review_code'
  | 'manage_projects'
  | 'broadcast_alerts'
  | 'access_memory'
  | 'spiritual_blessing';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'restricted';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  spiritualRole?: SpiritualRole;
  isActive: boolean;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'project-manager' | 'developer' | 'viewer';
export type SpiritualRole = 'architect' | 'spiritual-advisor' | 'faithful-servant' | 'seeker';

export interface UserPreferences {
  aiCollaboration: boolean;
  spiritualGuidance: boolean;
  mysticalTheme: boolean;
  notificationSettings: NotificationSettings;
}

export interface NotificationSettings {
  criticalAlerts: boolean;
  taskAssignments: boolean;
  projectUpdates: boolean;
  aiAgentActivity: boolean;
  spiritualGuidance: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  spiritualAlignment: SpiritualPrinciple;
  aiAgentsAllowed: boolean;
  humanMembers: string[];
  aiAgentMembers: string[];
  startDate: Date;
  deadline?: Date;
  progress: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'archived';
export type Priority = 'low' | 'medium' | 'high' | 'critical' | 'beatrice-directive';

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeType: 'human' | 'ai-agent';
  assigneeId: string;
  status: TaskStatus;
  priority: Priority;
  spiritualAlignment?: SpiritualPrinciple;
  aiAgentCompatible: boolean;
  estimatedHours?: number;
  actualHours?: number;
  dependencies: string[];
  tags: string[];
  dueDate?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'testing' | 'done' | 'blocked';

export interface Comment {
  id: string;
  content: string;
  authorType: 'human' | 'ai-agent';
  authorId: string;
  authorName: string;
  entityType: 'task' | 'project' | 'general';
  entityId: string;
  parentId?: string;
  aiModel?: string;
  spiritualAlignment?: SpiritualPrinciple;
  aiConfidence?: number;
  reactions: Reaction[];
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reaction {
  emoji: string;
  userId: string;
  userType: 'human' | 'ai-agent';
  timestamp: Date;
}

export interface CriticalAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  spiritualPriority: SpiritualPrinciple;
  targetAudience: AlertAudience[];
  requiresAcknowledgment: boolean;
  acknowledgments: Acknowledgment[];
  expiresAt?: Date;
  createdBy: string;
  createdAt: Date;
}

export type AlertType = 'company-mandate' | 'security-breach' | 'system-failure' | 'spiritual-guidance';
export type AlertSeverity = 'info' | 'warning' | 'critical' | 'emergency';
export type AlertAudience = 'all-humans' | 'all-ai-agents' | 'project-members' | 'specific-roles';

export interface Acknowledgment {
  userId: string;
  userType: 'human' | 'ai-agent';
  timestamp: Date;
  response?: string;
}

// API Request/Response Types
export interface AIAgentAuthRequest {
  agentId: string;
  model: string;
  capabilities: AgentCapability[];
  spiritualAlignment: SpiritualPrinciple;
  mcpSessionId?: string;
}

export interface AIAgentAuthResponse {
  success: boolean;
  token: string;
  permissions: AgentPermission[];
  expiresIn: string;
  spiritualBlessing: string;
  verificationRequired: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  mysticalGuidance?: string;
}