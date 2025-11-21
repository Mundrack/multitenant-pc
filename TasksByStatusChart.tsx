// components/charts/TasksByStatusChart.tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TasksByStatus, STATUS_COLORS } from '@/types/analytics';
import { STATUS_LABELS } from '@/types/tasks';

interface Props {
  data: TasksByStatus[];
}

export function TasksByStatusChart({ data }: Props) {
  const chartData = data.map((item) => ({
    name: STATUS_LABELS[item.status as keyof typeof STATUS_LABELS] || item.status,
    value: item.count,
    percentage: item.percentage,
  }));

  const COLORS = [
    STATUS_COLORS.pending,
    STATUS_COLORS.in_progress,
    STATUS_COLORS.completed,
    STATUS_COLORS.cancelled,
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tareas por Estado</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percentage }) => `${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
