import type { LearningPath } from '../types/exam';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'kubernetes-beginner-to-admin',
    name: 'Kubernetes: Beginner to Administrator',
    description: 'Start with cloud native fundamentals and progress to Kubernetes administration',
    examSequence: ['kcna', 'ckad', 'cka'],
    estimatedTime: '6-12 months',
    difficulty: 'beginner',
  },
  {
    id: 'kubernetes-security-specialist',
    name: 'Kubernetes Security Specialist',
    description: 'Master Kubernetes security from basics to advanced',
    examSequence: ['kcna', 'kcsa', 'cka', 'cks'],
    estimatedTime: '9-15 months',
    difficulty: 'intermediate',
  },
  {
    id: 'gitops-professional',
    name: 'GitOps Professional',
    description: 'Become proficient in GitOps practices and the Argo ecosystem',
    examSequence: ['kcna', 'cgoa', 'capa'],
    estimatedTime: '6-9 months',
    difficulty: 'intermediate',
  },
  {
    id: 'platform-engineer',
    name: 'Platform Engineer',
    description: 'Build expertise in cloud native platform engineering',
    examSequence: ['kcna', 'cka', 'cnpa', 'cnpe', 'cba'],
    estimatedTime: '12-18 months',
    difficulty: 'advanced',
  },
  {
    id: 'observability-expert',
    name: 'Observability Expert',
    description: 'Master cloud native observability tools',
    examSequence: ['kcna', 'pca', 'otca'],
    estimatedTime: '4-6 months',
    difficulty: 'intermediate',
  },
  {
    id: 'networking-specialist',
    name: 'Cloud Native Networking Specialist',
    description: 'Specialize in cloud native networking and service mesh',
    examSequence: ['kcna', 'cka', 'cca', 'ica'],
    estimatedTime: '9-12 months',
    difficulty: 'intermediate',
  },
];
