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
