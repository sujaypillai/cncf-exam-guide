import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ExamDomain } from '../../types/exam';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface Props {
  domains: ExamDomain[];
  title?: string;
}

export default function DomainChart({ domains, title = 'Domain Weighting' }: Props) {
  const data = {
    labels: domains.map((d) => d.name),
    datasets: [
      {
        data: domains.map((d) => d.weight),
        backgroundColor: 'rgba(67, 107, 149, 0.8)',
        borderColor: 'rgba(67, 107, 149, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, font: { size: 14 } },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { x: number } }) => `${ctx.parsed.x}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: Math.max(...domains.map((d) => d.weight)) + 10,
        ticks: { callback: (v: string | number) => `${v}%` },
      },
    },
  };

  return (
    <div style={{ height: `${Math.max(200, domains.length * 50)}px` }}>
      <Bar data={data} options={options} />
    </div>
  );
}
