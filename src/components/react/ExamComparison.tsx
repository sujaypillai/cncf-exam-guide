import { useState } from 'react';
import type { Exam } from '../../types/exam';

interface Props {
  exams: Exam[];
}

const DOMAIN_LABELS: Record<string, string> = {
  'kubernetes-core': 'Kubernetes Core',
  'gitops-cd': 'GitOps & CD',
  'networking-service-mesh': 'Networking & Service Mesh',
  'observability': 'Observability',
  'platform-engineering': 'Platform Engineering',
  'policy-governance': 'Policy & Governance',
};

export default function ExamComparison({ exams }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev,
    );
  };

  const compared = exams.filter((e) => selected.includes(e.id));

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => toggle(exam.id)}
              disabled={!selected.includes(exam.id) && selected.length >= 3}
              className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer ${
                selected.includes(exam.id)
                  ? 'border-cncf-blue bg-cncf-blue text-white'
                  : 'border-gray-300 hover:border-cncf-blue bg-white'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {exam.abbreviation}
            </button>
          ))}
        </div>
        {selected.length === 0 && (
          <p className="mt-4 text-gray-500 text-sm">Click on exam badges above to start comparing.</p>
        )}
      </div>

      {compared.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b w-48">
                  Attribute
                </th>
                {compared.map((e) => (
                  <th key={e.id} className="px-4 py-3 text-left text-sm font-semibold text-cncf-navy border-b">
                    <a href={`/exams/${e.id}`} className="hover:underline">
                      {e.abbreviation}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label="Full Name" values={compared.map((e) => e.name)} />
              <Row label="Technology Domain" values={compared.map((e) => DOMAIN_LABELS[e.technologyDomain] ?? e.technologyDomain)} />
              <Row label="Number of Domains" values={compared.map((e) => String(e.domains.length))} />
              <tr>
                <td className="px-4 py-3 border-b text-sm font-medium text-gray-700">Domain Breakdown</td>
                {compared.map((e) => (
                  <td key={e.id} className="px-4 py-3 border-b align-top">
                    {e.domains.length > 0 ? (
                      <ul className="text-sm space-y-1">
                        {e.domains.map((d) => (
                          <li key={d.name} className="flex justify-between gap-4">
                            <span className="text-gray-600">{d.name}</span>
                            <span className="font-semibold text-cncf-navy whitespace-nowrap">{d.weight}%</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 text-sm">Not available</span>
                    )}
                  </td>
                ))}
              </tr>
              <Row label="Contributors" values={compared.map((e) => String(e.contributors.length))} />
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">Curriculum PDF</td>
                {compared.map((e) => (
                  <td key={e.id} className="px-4 py-3">
                    <a
                      href={`/pdfs/${encodeURIComponent(e.pdfFilename)}`}
                      className="text-cncf-blue hover:underline text-sm"
                      download
                    >
                      Download
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <td className="px-4 py-3 border-b text-sm font-medium text-gray-700">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="px-4 py-3 border-b text-sm text-gray-600">
          {v}
        </td>
      ))}
    </tr>
  );
}
