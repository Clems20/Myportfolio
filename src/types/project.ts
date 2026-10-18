export interface ProcessStep {
  title: string;
  description: string;
  images: string[];
}

export interface ProjectResults {
  metrics?: string[];
  learnings: string[];
}

export interface Project {
  id: number;
  _id?: string; // MongoDB ObjectId as string
  title: string;
  category: string;
  year: string;
  images: string[];
  description: string;
  client?: string;
  role: string;
  date: string;
  productLink?: string;
  tools: string[];
  goal: string;
  problem: string;
  userDescription: string;
  challenges: string[];
  processSteps: ProcessStep[];
  results: ProjectResults;
  order?: number; // for manual reordering
  published?: boolean; // draft/publish toggle
}
