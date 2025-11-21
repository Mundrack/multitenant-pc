// components/charts/TimeSeriesChart.tsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData, CHART_COLORS } from '@/types/analytics';

interface Props {
  data: TimeSeriesData[];
}

export function TimeSeriesChart({ data }: Props) {
  const chartData = data.map((item) => ({
    ...item,
    fecha: new Date(item.date).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  // Mostrar solo cada 3 días para no saturar el eje X
  const filteredData = chartData.filter((_, index) => index % 3 === 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tendencia de Tareas (Últimos 30 días)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="created"
            name="Creadas"
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completadas"
            stroke={CHART_COLORS.success}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="overdue"
            name="Vencidas"
            stroke={CHART_COLORS.danger}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
