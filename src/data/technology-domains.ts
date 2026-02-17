import type { TechnologyDomainInfo } from '../types/exam';

export const TECHNOLOGY_DOMAINS: TechnologyDomainInfo[] = [
  {
    id: 'kubernetes-core',
    name: 'Kubernetes Core',
    description: 'Foundational Kubernetes administration, development, and security certifications',
    examIds: ['kcna', 'ckad', 'cka', 'cks', 'kcsa'],
  },
  {
    id: 'gitops-cd',
    name: 'GitOps & Continuous Delivery',
    description: 'GitOps principles and Argo project certifications',
    examIds: ['cgoa', 'capa'],
  },
  {
    id: 'networking-service-mesh',
    name: 'Networking & Service Mesh',
    description: 'Cloud native networking and service mesh technologies',
    examIds: ['cca', 'ica'],
  },
  {
    id: 'observability',
    name: 'Observability',
    description: 'Monitoring, logging, and tracing certifications',
    examIds: ['pca', 'otca'],
  },
  {
    id: 'platform-engineering',
    name: 'Platform Engineering',
    description: 'Building and managing internal developer platforms',
    examIds: ['cnpa', 'cnpe', 'cba'],
  },
  {
    id: 'policy-governance',
    name: 'Policy & Governance',
    description: 'Policy management and governance in Kubernetes',
    examIds: ['kca'],
  },
];
