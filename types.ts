export interface DocumentTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  defaultPrompt: string;
}

export enum TemplateCategory {
  LEGAL = 'Legal',
  HR = 'HR & Team',
  FUNDRAISING = 'Fundraising',
  OPERATIONS = 'Operations',
  SALES = 'Sales & Growth'
}

export interface GeneratedDocument {
  title: string;
  content: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export type GenerationStatus = 'idle' | 'loading' | 'streaming' | 'completed' | 'error';