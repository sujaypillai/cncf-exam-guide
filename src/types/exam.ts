export interface ExamDomain {
  name: string;
  weight: number;
}

export type TechnologyDomain =
  | 'kubernetes-core'
  | 'gitops-cd'
  | 'networking-service-mesh'
  | 'observability'
  | 'platform-engineering'
  | 'policy-governance';

export type ExamLevel = 'associate' | 'professional';

export type ExamFormat = 'performance-based' | 'multiple-choice';

export interface SimulationProvider {
  name: string;
  url: string;
  includedWithPurchase: boolean;
}

export interface Exam {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  domains: ExamDomain[];
  pdfFilename: string;
  technologyDomain: TechnologyDomain;
  contributors: string[];
  hasReadme: boolean;
  trainingUrl?: string;
  resources?: string[];
  level: ExamLevel;
  prerequisites: string[];
  duration?: string;
  questionCount?: number;
  questionLabel?: string;
  format?: ExamFormat;
  simulationProviders?: SimulationProvider[];
  documentationUrl?: string;
  lastVerified?: string;
}

export interface TechnologyDomainInfo {
  id: TechnologyDomain;
  name: string;
  description: string;
  examIds: string[];
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  examSequence: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
