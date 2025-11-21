// hooks/useAnalytics.ts
'use client';

import { useMemo } from 'react';
import { useTasks } from './useTasks';
import {
  AnalyticsData,
  TaskMetrics,
  UserPerformance,
  TasksByPriority,
  TasksByStatus,
  TimeSeriesData,
} from '@/types/analytics';
import { TaskStatus, TaskPriority } from '@/types/tasks';

export function useAnalytics() {
  const { tasks, loading } = useTasks();

  const analyticsData: AnalyticsData = useMemo(() => {
    if (tasks.length === 0) {
      return {
        metrics: {
          total: 0,
          completed: 0,
          in_progress: 0,
          pending: 0,
          overdue: 0,
          completion_rate: 0,
          average_completion_time: 0,
        },
        by_priority: [],
        by_status: [],
        time_series: [],
        user_performance: [],
        trends: {
          tasks_growth: 0,
          completion_trend: 'stable',
          productivity_score: 0,
        },
      };
    }

    // Calcular métricas generales
    const completed = tasks.filter((t) => t.status === TaskStatus.COMPLETED);
    const inProgress = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS);
    const pending = tasks.filter((t) => t.status === TaskStatus.PENDING);
    const overdue = tasks.filter((t) => t.is_overdue);

    const completionRate = tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0;

    // Calcular tiempo promedio de completación
    const completedWithTime = completed.filter((t) => t.completed_at);
    let avgCompletionTime = 0;
    if (completedWithTime.length > 0) {
      const totalDays = completedWithTime.reduce((sum, task) => {
        const start = new Date(task.start_date);
        const end = new Date(task.completed_at!);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0);
      avgCompletionTime = totalDays / completedWithTime.length;
    }

    const metrics: TaskMetrics = {
      total: tasks.length,
      completed: completed.length,
      in_progress: inProgress.length,
      pending: pending.length,
      overdue: overdue.length,
      completion_rate: Math.round(completionRate),
      average_completion_time: Math.round(avgCompletionTime),
    };

    // Tareas por prioridad
    const byPriority: TasksByPriority[] = Object.values(TaskPriority).map((priority) => {
      const tasksWithPriority = tasks.filter((t) => t.priority === priority);
      return {
        priority,
        count: tasksWithPriority.length,
        completed: tasksWithPriority.filter((t) => t.status === TaskStatus.COMPLETED).length,
        in_progress: tasksWithPriority.filter((t) => t.status === TaskStatus.IN_PROGRESS)
          .length,
        pending: tasksWithPriority.filter((t) => t.status === TaskStatus.PENDING).length,
      };
    });

    // Tareas por estado
    const byStatus: TasksByStatus[] = Object.values(TaskStatus).map((status) => {
      const count = tasks.filter((t) => t.status === status).length;
      return {
        status,
        count,
        percentage: tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0,
      };
    });

    // Serie temporal (últimos 30 días)
    const timeSeries: TimeSeriesData[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const created = tasks.filter((t) => t.created_at.startsWith(dateStr)).length;
      const completedOnDate = tasks.filter(
        (t) => t.completed_at && t.completed_at.startsWith(dateStr)
      ).length;
      const overdueOnDate = tasks.filter((t) => {
        if (!t.is_overdue) return false;
        const dueDate = new Date(t.due_date);
        return dueDate.toISOString().split('T')[0] === dateStr;
      }).length;

      timeSeries.push({
        date: dateStr,
        created,
        completed: completedOnDate,
        overdue: overdueOnDate,
      });
    }

    // Rendimiento por usuario
    const userMap = new Map<string, UserPerformance>();

    tasks.forEach((task) => {
      const userId = task.assigned_to;
      const userName = task.assigned_user?.full_name || task.assigned_user?.email || 'Unknown';

      if (!userMap.has(userId)) {
        userMap.set(userId, {
          user_id: userId,
          user_name: userName,
          tasks_assigned: 0,
          tasks_completed: 0,
          tasks_overdue: 0,
          completion_rate: 0,
          average_completion_time: 0,
        });
      }

      const userPerf = userMap.get(userId)!;
      userPerf.tasks_assigned++;
      if (task.status === TaskStatus.COMPLETED) {
        userPerf.tasks_completed++;
      }
      if (task.is_overdue) {
        userPerf.tasks_overdue++;
      }
    });

    // Calcular métricas de cada usuario
    const userPerformance: UserPerformance[] = Array.from(userMap.values()).map((user) => {
      const completionRate =
        user.tasks_assigned > 0 ? (user.tasks_completed / user.tasks_assigned) * 100 : 0;

      // Calcular tiempo promedio de completación
      const userCompletedTasks = completed.filter((t) => t.assigned_to === user.user_id);
      let avgTime = 0;
      if (userCompletedTasks.length > 0) {
        const totalDays = userCompletedTasks.reduce((sum, task) => {
          const start = new Date(task.start_date);
          const end = new Date(task.completed_at!);
          const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          return sum + days;
        }, 0);
        avgTime = totalDays / userCompletedTasks.length;
      }

      return {
        ...user,
        completion_rate: Math.round(completionRate),
        average_completion_time: Math.round(avgTime),
      };
    });

    // Calcular tendencias
    const last7Days = tasks.filter((t) => {
      const created = new Date(t.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created >= weekAgo;
    });

    const previous7Days = tasks.filter((t) => {
      const created = new Date(t.created_at);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created >= twoWeeksAgo && created < weekAgo;
    });

    const tasksGrowth =
      previous7Days.length > 0
        ? ((last7Days.length - previous7Days.length) / previous7Days.length) * 100
        : 0;

    // Tendencia de completación
    const recentCompletionRate =
      last7Days.length > 0
        ? (last7Days.filter((t) => t.status === TaskStatus.COMPLETED).length /
            last7Days.length) *
          100
        : 0;
    const previousCompletionRate =
      previous7Days.length > 0
        ? (previous7Days.filter((t) => t.status === TaskStatus.COMPLETED).length /
            previous7Days.length) *
          100
        : 0;

    let completionTrend: 'up' | 'down' | 'stable' = 'stable';
    if (recentCompletionRate > previousCompletionRate + 5) {
      completionTrend = 'up';
    } else if (recentCompletionRate < previousCompletionRate - 5) {
      completionTrend = 'down';
    }

    // Score de productividad (0-100)
    const productivityScore = Math.round(
      (completionRate * 0.4 + (100 - (overdue.length / tasks.length) * 100) * 0.3 + (tasks.length > 0 ? 100 : 0) * 0.3)
    );

    return {
      metrics,
      by_priority: byPriority,
      by_status: byStatus,
      time_series: timeSeries,
      user_performance: userPerformance.sort((a, b) => b.completion_rate - a.completion_rate),
      trends: {
        tasks_growth: Math.round(tasksGrowth),
        completion_trend: completionTrend,
        productivity_score: productivityScore,
      },
    };
  }, [tasks]);

  return {
    data: analyticsData,
    loading,
  };
}
