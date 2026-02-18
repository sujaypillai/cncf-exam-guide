import type { ExamFormat, SimulationProvider } from '../types/exam';

export interface ExamDetails {
  duration?: string;
  questionCount?: number;
  questionLabel?: string;
  format?: ExamFormat;
  simulationProviders?: SimulationProvider[];
  documentationUrl?: string;
  lastVerified?: string;
}

const KILLER_SH_CKA: SimulationProvider = { name: 'killer.sh', url: 'https://killer.sh/cka', includedWithPurchase: true };
const KILLER_SH_CKAD: SimulationProvider = { name: 'killer.sh', url: 'https://killer.sh/ckad', includedWithPurchase: true };
const KILLER_SH_CKS: SimulationProvider = { name: 'killer.sh', url: 'https://killer.sh/cks', includedWithPurchase: true };

export const EXAM_DETAILS: Partial<Record<string, ExamDetails>> = {
  cka: {
    duration: '2 hours',
    questionCount: 17,
    questionLabel: 'tasks',
    format: 'performance-based',
    simulationProviders: [KILLER_SH_CKA],
    documentationUrl: 'https://kubernetes.io/docs/',
    lastVerified: '2026-02-19',
  },
  ckad: {
    duration: '2 hours',
    questionCount: 16,
    questionLabel: 'tasks',
    format: 'performance-based',
    simulationProviders: [KILLER_SH_CKAD],
    documentationUrl: 'https://kubernetes.io/docs/',
    lastVerified: '2026-02-19',
  },
  cks: {
    duration: '2 hours',
    questionCount: 16,
    questionLabel: 'tasks',
    format: 'performance-based',
    simulationProviders: [KILLER_SH_CKS],
    documentationUrl: 'https://kubernetes.io/docs/',
    lastVerified: '2026-02-19',
  },
  kcna: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://kubernetes.io/docs/',
    lastVerified: '2026-02-19',
  },
  kcsa: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://kubernetes.io/docs/',
    lastVerified: '2026-02-19',
  },
  cgoa: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://opengitops.dev/',
    lastVerified: '2026-02-19',
  },
  capa: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://argoproj.github.io/argo-cd/',
    lastVerified: '2026-02-19',
  },
  cca: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://docs.cilium.io/',
    lastVerified: '2026-02-19',
  },
  ica: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://istio.io/latest/docs/',
    lastVerified: '2026-02-19',
  },
  pca: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://prometheus.io/docs/',
    lastVerified: '2026-02-19',
  },
  otca: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://opentelemetry.io/docs/',
    lastVerified: '2026-02-19',
  },
  cnpa: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://tag-app-delivery.cncf.io/whitepapers/platforms/',
    lastVerified: '2026-02-19',
  },
  cba: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://backstage.io/docs/',
    lastVerified: '2026-02-19',
  },
  kca: {
    duration: '1.5 hours',
    questionCount: 60,
    format: 'multiple-choice',
    documentationUrl: 'https://kyverno.io/docs/',
    lastVerified: '2026-02-19',
  },
  // cnpe: intentionally omitted — no data available yet, graceful degradation via optional fields
};
