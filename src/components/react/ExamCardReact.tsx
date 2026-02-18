import type { Exam } from '../../types/exam';

const domainColors: Record<string, string> = {
  'kubernetes-core': 'bg-blue-100 text-blue-800',
  'gitops-cd': 'bg-purple-100 text-purple-800',
  'networking-service-mesh': 'bg-green-100 text-green-800',
  'observability': 'bg-amber-100 text-amber-800',
  'platform-engineering': 'bg-rose-100 text-rose-800',
  'policy-governance': 'bg-teal-100 text-teal-800',
};

const levelColors: Record<string, string> = {
  associate: 'bg-emerald-100 text-emerald-800',
  professional: 'bg-indigo-100 text-indigo-800',
};

interface ExamCardReactProps {
  exam: Exam;
}

export default function ExamCardReact({ exam }: ExamCardReactProps) {
  const descriptionPreview = exam.description.split('\n')[0].substring(0, 160);
  const badgeClass = domainColors[exam.technologyDomain] ?? 'bg-gray-100 text-gray-800';
  const levelClass = levelColors[exam.level] ?? 'bg-gray-100 text-gray-800';

  return (
    <a href={`/exams/${exam.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 h-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-2xl font-bold text-cncf-navy">{exam.abbreviation}</h3>
        <div className="flex gap-1.5">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${levelClass}`}>
            {exam.level}
          </span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeClass}`}>
            {exam.domains.length} domains
          </span>
        </div>
      </div>
      <h4 className="text-sm font-medium text-gray-600 mb-3">{exam.name}</h4>
      <p className="text-sm text-gray-500 mb-4 line-clamp-3">
        {descriptionPreview}...
      </p>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
        <span>{exam.contributors.length} contributors</span>
        <span className="text-cncf-blue font-medium">View details &rarr;</span>
      </div>
    </a>
  );
}
