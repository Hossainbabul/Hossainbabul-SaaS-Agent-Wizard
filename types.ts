export interface ProjectConfig {
  name: string;
  description: string;
  clerkKey: string;
  geminiKey: string;
  jinaKey: string;
  targetAudience: string;
}

export enum AgentStatus {
  IDLE = 'IDLE',
  WORKING = 'WORKING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AgentLog {
  id: string;
  agent: string;
  message: string;
  timestamp: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export enum WizardStep {
  CONFIG = 0,
  PROCESSING = 1,
  PREVIEW = 2,
}

export interface GeneratedFeature {
  title: string;
  description: string;
  icon: string;
}