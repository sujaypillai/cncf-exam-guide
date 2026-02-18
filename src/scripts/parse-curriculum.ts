import * as fs from 'fs';
import * as path from 'path';
import type { Exam, ExamDomain, ExamLevel, TechnologyDomain } from '../types/exam';

const CURRICULUM_PATH = path.resolve(import.meta.dirname, '../../../curriculum');
const OUTPUT_PATH = path.resolve(import.meta.dirname, '../data/exams.json');

interface ExamMeta {
  abbreviation: string;
  name: string;
  technologyDomain: TechnologyDomain;
  pdfFilename: string;
  level: ExamLevel;
  prerequisites: string[];
}

const EXAM_METADATA: Record<string, ExamMeta> = {
  cka: { abbreviation: 'CKA', name: 'Certified Kubernetes Administrator', technologyDomain: 'kubernetes-core', pdfFilename: 'CKA_Curriculum_v1.34.pdf', level: 'professional', prerequisites: [] },
  ckad: { abbreviation: 'CKAD', name: 'Certified Kubernetes Application Developer', technologyDomain: 'kubernetes-core', pdfFilename: 'CKAD_Curriculum_v1.34.pdf', level: 'professional', prerequisites: [] },
  cks: { abbreviation: 'CKS', name: 'Certified Kubernetes Security Specialist', technologyDomain: 'kubernetes-core', pdfFilename: 'CKS_Curriculum v1.34.pdf', level: 'professional', prerequisites: ['cka'] },
  kcna: { abbreviation: 'KCNA', name: 'Kubernetes and Cloud Native Associate', technologyDomain: 'kubernetes-core', pdfFilename: 'KCNA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  kcsa: { abbreviation: 'KCSA', name: 'Kubernetes and Cloud Native Security Associate', technologyDomain: 'kubernetes-core', pdfFilename: 'KCSA Curriculum.pdf', level: 'associate', prerequisites: [] },
  cgoa: { abbreviation: 'CGOA', name: 'Certified GitOps Associate', technologyDomain: 'gitops-cd', pdfFilename: 'CGOA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  capa: { abbreviation: 'CAPA', name: 'Certified Argo Project Associate', technologyDomain: 'gitops-cd', pdfFilename: 'CAPA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  cca: { abbreviation: 'CCA', name: 'Cilium Certified Associate', technologyDomain: 'networking-service-mesh', pdfFilename: 'CCA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  ica: { abbreviation: 'ICA', name: 'Istio Certified Associate', technologyDomain: 'networking-service-mesh', pdfFilename: 'ICA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  pca: { abbreviation: 'PCA', name: 'Prometheus Certified Associate', technologyDomain: 'observability', pdfFilename: 'PCA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  otca: { abbreviation: 'OTCA', name: 'OpenTelemetry Certified Associate', technologyDomain: 'observability', pdfFilename: 'OTCA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  cnpa: { abbreviation: 'CNPA', name: 'Certified Cloud Native Platform Engineering Associate', technologyDomain: 'platform-engineering', pdfFilename: 'CNPA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  cnpe: { abbreviation: 'CNPE', name: 'Certified Cloud Native Platform Engineer', technologyDomain: 'platform-engineering', pdfFilename: 'CNPE_Curriculum.pdf', level: 'professional', prerequisites: [] },
  cba: { abbreviation: 'CBA', name: 'Certified Backstage Associate', technologyDomain: 'platform-engineering', pdfFilename: 'CBA_Curriculum.pdf', level: 'associate', prerequisites: [] },
  kca: { abbreviation: 'KCA', name: 'Kyverno Certified Associate', technologyDomain: 'policy-governance', pdfFilename: 'KCA_Curriculum.pdf', level: 'associate', prerequisites: [] },
};

function stripArtifacts(text: string): string {
  return text.replace(/:contentReference\[oaicite:\d+\]\{index=\d+\}/g, '').trim();
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

function parseTableDomains(content: string): ExamDomain[] {
  const domains: ExamDomain[] = [];
  const section = content.match(/##\s+Domains\s+&\s+Weighting([\s\S]+?)(?=\n##\s|$)/i);
  if (!section) return domains;

  for (const line of section[1].split('\n')) {
    const match = line.match(/^\|([^|]+)\|([^|]+)\|/);
    if (!match) continue;
    const name = match[1].trim();
    const weightStr = match[2].trim().replace('%', '');
    const weight = parseInt(weightStr, 10);
    if (name && !isNaN(weight) && !name.includes('---') && name !== 'Domain') {
      domains.push({ name, weight });
    }
  }
  return domains;
}

function parseBulletDomains(content: string): ExamDomain[] {
  const domains: ExamDomain[] = [];
  const section = content.match(/##\s+Domains([\s\S]+?)(?=\n##\s|$)/i);
  if (!section) return domains;

  for (const line of section[1].split('\n')) {
    const match = line.match(/^\*\s+(.+?)\s+(\d+)%/);
    if (match) {
      domains.push({ name: match[1].trim(), weight: parseInt(match[2], 10) });
    }
  }
  return domains;
}

function extractDescription(content: string): string {
  // Try "## Exam Description" first (most exams)
  let section = content.match(/##\s+Exam\s+Description([\s\S]+?)(?=\n##\s|$)/i);
  if (section) {
    return stripMarkdown(section[1].trim().split('\n').filter(l => l.trim()).join('\n'));
  }
  // Fallback: grab text between title and first ## (KCNA style)
  section = content.match(/^#\s+[^\n]+\n([\s\S]+?)(?=\n##\s)/);
  if (section) {
    return stripMarkdown(section[1].trim().split('\n').filter(l => l.trim()).join('\n'));
  }
  return '';
}

function extractContributors(content: string): string[] {
  const section = content.match(/###\s+Contributors([\s\S]+?)(?=\n##\s|$)/i);
  if (!section) return [];
  return section[1]
    .split('\n')
    .filter(l => l.trim().startsWith('-'))
    .map(l => l.replace(/^-\s*/, '').trim())
    .filter(n => n.length > 0);
}

function extractTrainingUrl(content: string): string | undefined {
  const match = content.match(/\(https:\/\/training\.linuxfoundation\.org\/[^)]+\)/);
  return match ? match[0].slice(1, -1) : undefined;
}

function extractResources(content: string): string[] | undefined {
  const section = content.match(/##\s+Resources([\s\S]+?)(?=\n##\s|$)/i);
  if (!section) return undefined;
  const urls = section[1].match(/https?:\/\/[^\s)]+/g);
  return urls ?? undefined;
}

function parseExam(examId: string): Exam {
  const meta = EXAM_METADATA[examId];
  const readmePath = path.join(CURRICULUM_PATH, examId, 'README.md');

  if (!fs.existsSync(readmePath)) {
    console.log(`  [skip] ${examId}: no README, creating minimal entry`);
    return {
      id: examId,
      name: meta.name,
      abbreviation: meta.abbreviation,
      description: `The ${meta.abbreviation} certification validates expertise in ${meta.name.replace(/^Certified\s+/, '').toLowerCase()}.`,
      domains: [],
      pdfFilename: meta.pdfFilename,
      technologyDomain: meta.technologyDomain,
      contributors: [],
      hasReadme: false,
      level: meta.level,
      prerequisites: meta.prerequisites,
    };
  }

  const raw = fs.readFileSync(readmePath, 'utf-8');
  const content = stripArtifacts(raw);

  const domains = examId === 'kcna'
    ? parseBulletDomains(content)
    : parseTableDomains(content);

  return {
    id: examId,
    name: meta.name,
    abbreviation: meta.abbreviation,
    description: extractDescription(content),
    domains,
    pdfFilename: meta.pdfFilename,
    technologyDomain: meta.technologyDomain,
    contributors: extractContributors(content),
    hasReadme: true,
    trainingUrl: extractTrainingUrl(content),
    resources: extractResources(content),
    level: meta.level,
    prerequisites: meta.prerequisites,
  };
}

function main() {
  console.log(`Parsing curriculum from: ${CURRICULUM_PATH}`);
  const exams: Exam[] = [];

  for (const examId of Object.keys(EXAM_METADATA)) {
    try {
      const exam = parseExam(examId);
      exams.push(exam);
      console.log(`  [ok] ${exam.abbreviation}: ${exam.domains.length} domains, ${exam.contributors.length} contributors`);
    } catch (err) {
      console.error(`  [error] ${examId}:`, err);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(exams, null, 2));
  console.log(`\nWrote ${exams.length} exams to ${OUTPUT_PATH}`);
}

main();
