import examsData from '../data/exams.json';
import type { Exam } from '../types/exam';

export const exams: Exam[] = examsData as Exam[];

export function getExamById(id: string): Exam | undefined {
  return exams.find((exam) => exam.id === id);
}

export function getExamsByDomain(domain: string): Exam[] {
  return exams.filter((exam) => exam.technologyDomain === domain);
}

export function getAllExamIds(): string[] {
  return exams.map((exam) => exam.id);
}
