import type { LearningPath, Exam } from '../../types/exam';

interface Props {
  paths: LearningPath[];
  exams: Exam[];
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-amber-100 text-amber-800',
  advanced: 'bg-red-100 text-red-800',
};

export default function LearningPathViewer({ paths, exams }: Props) {
  const getExam = (id: string) => exams.find((e) => e.id === id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {paths.map((path) => (
        <div key={path.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-cncf-navy">{path.name}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[path.difficulty]}`}
            >
              {path.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{path.description}</p>
          <p className="text-xs text-gray-400 mb-4">
            Estimated: <strong className="text-gray-600">{path.estimatedTime}</strong>
          </p>

          <div className="space-y-2">
            {path.examSequence.map((examId, i) => {
              const exam = getExam(examId);
              if (!exam) return null;
              return (
                <div key={examId} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cncf-blue text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <a
                    href={`/exams/${exam.id}`}
                    className="text-sm text-cncf-blue hover:underline"
                  >
                    <strong>{exam.abbreviation}</strong>
                    <span className="text-gray-500 ml-1">{exam.name}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
