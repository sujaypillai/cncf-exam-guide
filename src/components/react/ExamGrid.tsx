import { useState, useMemo } from 'react';
import type { Exam, TechnologyDomain, ExamLevel } from '../../types/exam';
import ExamCardReact from './ExamCardReact';

const DOMAIN_LABELS: Record<TechnologyDomain, string> = {
  'kubernetes-core': 'Kubernetes Core',
  'gitops-cd': 'GitOps & CD',
  'networking-service-mesh': 'Networking & Service Mesh',
  'observability': 'Observability',
  'platform-engineering': 'Platform Engineering',
  'policy-governance': 'Policy & Governance',
};

type SortOption = 'alpha-asc' | 'alpha-desc' | 'domains' | 'domain-group';

interface ExamGridProps {
  exams: Exam[];
}

export default function ExamGrid({ exams }: ExamGridProps) {
  const [domainFilter, setDomainFilter] = useState<TechnologyDomain | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<ExamLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('alpha-asc');

  const filtered = useMemo(() => {
    let result = exams;

    if (domainFilter !== 'all') {
      result = result.filter((e) => e.technologyDomain === domainFilter);
    }
    if (levelFilter !== 'all') {
      result = result.filter((e) => e.level === levelFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.abbreviation.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'alpha-asc':
        result = [...result].sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
        break;
      case 'alpha-desc':
        result = [...result].sort((a, b) => b.abbreviation.localeCompare(a.abbreviation));
        break;
      case 'domains':
        result = [...result].sort((a, b) => b.domains.length - a.domains.length);
        break;
      case 'domain-group':
        result = [...result].sort((a, b) => a.technologyDomain.localeCompare(b.technologyDomain));
        break;
    }

    return result;
  }, [exams, domainFilter, levelFilter, searchQuery, sortBy]);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="exam-search" className="block text-xs font-medium text-gray-500 mb-1">
              Search
            </label>
            <input
              id="exam-search"
              type="text"
              placeholder="Search by name or abbreviation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cncf-blue focus:border-transparent"
            />
          </div>

          {/* Technology Domain */}
          <div>
            <label htmlFor="domain-filter" className="block text-xs font-medium text-gray-500 mb-1">
              Technology Domain
            </label>
            <select
              id="domain-filter"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value as TechnologyDomain | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cncf-blue focus:border-transparent bg-white"
            >
              <option value="all">All Domains</option>
              {(Object.entries(DOMAIN_LABELS) as [TechnologyDomain, string][]).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level-filter" className="block text-xs font-medium text-gray-500 mb-1">
              Level
            </label>
            <select
              id="level-filter"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as ExamLevel | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cncf-blue focus:border-transparent bg-white"
            >
              <option value="all">All Levels</option>
              <option value="associate">Associate</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort-by" className="block text-xs font-medium text-gray-500 mb-1">
              Sort By
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cncf-blue focus:border-transparent bg-white"
            >
              <option value="alpha-asc">Alphabetical (A-Z)</option>
              <option value="alpha-desc">Alphabetical (Z-A)</option>
              <option value="domains">By Domain Count</option>
              <option value="domain-group">By Technology Domain</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} of {exams.length} exams
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No exams match your filters.</p>
          <button
            onClick={() => { setDomainFilter('all'); setLevelFilter('all'); setSearchQuery(''); }}
            className="mt-2 text-cncf-blue hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exam) => (
            <ExamCardReact key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </div>
  );
}
