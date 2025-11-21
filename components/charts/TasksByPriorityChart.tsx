// components/charts/TasksByPriorityChart.tsx
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TasksByPriority, CHART_COLORS } from '@/types/analytics';
import { PRIORITY_LABELS } from '@/types/tasks';

interface Props {
  data: TasksByPriority[];
}

export function TasksByPriorityChart({ data }: Props) {
  const chartData = data.map((item) => ({
    name: PRIORITY_LABELS[item.priority as keyof typeof PRIORITY_LABELS] || item.priority,
    Completadas: item.completed,
    'En Progreso': item.in_progress,
    Pendientes: item.pending,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tareas por Prioridad</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completadas" fill={CHART_COLORS.success} />
          <Bar dataKey="En Progreso" fill={CHART_COLORS.info} />
          <Bar dataKey="Pendientes" fill={CHART_COLORS.warning} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
