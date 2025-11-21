// types/analytics.ts
export interface TaskMetrics {
  total: number;
  completed: number;
  in_progress: number;
  pending: number;
  overdue: number;
  completion_rate: number;
  average_completion_time: number; // días
}

export interface UserPerformance {
  user_id: string;
  user_name: string;
  tasks_assigned: number;
  tasks_completed: number;
  tasks_overdue: number;
  completion_rate: number;
  average_completion_time: number;
}

export interface TasksByPriority {
  priority: string;
  count: number;
  completed: number;
  in_progress: number;
  pending: number;
}

export interface TasksByStatus {
  status: string;
  count: number;
  percentage: number;
}

export interface TimeSeriesData {
  date: string;
  created: number;
  completed: number;
  overdue: number;
}

export interface AnalyticsData {
  metrics: TaskMetrics;
  by_priority: TasksByPriority[];
  by_status: TasksByStatus[];
  time_series: TimeSeriesData[];
  user_performance: UserPerformance[];
  trends: {
    tasks_growth: number; // % de crecimiento
    completion_trend: 'up' | 'down' | 'stable';
    productivity_score: number; // 0-100
  };
}

export interface DateRange {
  start: string;
  end: string;
}

export interface ExportFormat {
  type: 'csv' | 'pdf';
  data: any;
  filename: string;
}

// Colores para gráficos
export const CHART_COLORS = {
  primary: '#F97316', // orange-500
  secondary: '#14B8A6', // teal-500
  success: '#22C55E', // green-500
  warning: '#F59E0B', // yellow-500
  danger: '#EF4444', // red-500
  info: '#3B82F6', // blue-500
  purple: '#A855F7',
  pink: '#EC4899',
};

export const STATUS_COLORS = {
  pending: CHART_COLORS.warning,
  in_progress: CHART_COLORS.info,
  completed: CHART_COLORS.success,
  cancelled: '#9CA3AF',
};

export const PRIORITY_COLORS = {
  low: '#9CA3AF',
  medium: CHART_COLORS.info,
  high: CHART_COLORS.primary,
  urgent: CHART_COLORS.danger,
};
