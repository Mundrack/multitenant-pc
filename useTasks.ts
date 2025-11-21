// hooks/useTasks.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskStatus,
  calculateSemaphoreColor,
  calculateDaysRemaining,
} from '@/types/tasks';
import { usePermissions } from './usePermissions';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { membership } = usePermissions();
  const supabase = createClient();

  useEffect(() => {
    if (membership) {
      loadTasks();
    }
  }, [membership]);

  async function loadTasks() {
    try {
      if (!membership) return;

      const { data, error } = await supabase
        .from('fact_tasks')
        .select(
          `
          *,
          assigned_user:dim_users!fact_tasks_assigned_to_fkey (
            id,
            full_name,
            email
          ),
          creator:dim_users!fact_tasks_created_by_fkey (
            id,
            full_name,
            email
          )
        `
        )
        .eq('organization_id', membership.organization_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading tasks:', error);
      } else {
        // Enriquecer tareas con datos calculados
        const enrichedTasks = data.map((task: any) => ({
          ...task,
          semaphore_color: calculateSemaphoreColor(
            task.start_date,
            task.due_date,
            task.progress,
            task.status
          ),
          days_remaining: calculateDaysRemaining(task.due_date),
          is_overdue: new Date(task.due_date) < new Date() && task.status !== TaskStatus.COMPLETED,
        }));
        setTasks(enrichedTasks);
      }
    } catch (error) {
      console.error('Error in loadTasks:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createTask(data: CreateTaskData): Promise<{ success: boolean; error?: string }> {
    try {
      if (!membership) {
        return { success: false, error: 'No membership found' };
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return { success: false, error: 'No user found' };
      }

      const { error } = await supabase.from('fact_tasks').insert({
        title: data.title,
        description: data.description || null,
        priority: data.priority,
        status: TaskStatus.PENDING,
        progress: 0,
        start_date: data.start_date,
        due_date: data.due_date,
        created_by: user.id,
        assigned_to: data.assigned_to,
        organization_id: membership.organization_id,
      });

      if (error) {
        console.error('Error creating task:', error);
        return { success: false, error: error.message };
      }

      // Recargar tareas
      await loadTasks();
      return { success: true };
    } catch (error) {
      console.error('Error in createTask:', error);
      return { success: false, error: 'Error creating task' };
    }
  }

  async function updateTask(
    taskId: string,
    data: UpdateTaskData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = { ...data };

      // Si se completa la tarea, agregar completed_at
      if (data.status === TaskStatus.COMPLETED && data.progress === 100) {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('fact_tasks')
        .update(updateData)
        .eq('id', taskId);

      if (error) {
        console.error('Error updating task:', error);
        return { success: false, error: error.message };
      }

      // Recargar tareas
      await loadTasks();
      return { success: true };
    } catch (error) {
      console.error('Error in updateTask:', error);
      return { success: false, error: 'Error updating task' };
    }
  }

  async function deleteTask(taskId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from('fact_tasks').delete().eq('id', taskId);

      if (error) {
        console.error('Error deleting task:', error);
        return { success: false, error: error.message };
      }

      // Recargar tareas
      await loadTasks();
      return { success: true };
    } catch (error) {
      console.error('Error in deleteTask:', error);
      return { success: false, error: 'Error deleting task' };
    }
  }

  // Funciones de filtrado
  const getMyTasks = () => {
    return tasks.filter((task) => {
      const {
        data: { user },
      } = supabase.auth.getUser();
      return task.assigned_to === user?.id;
    });
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const getOverdueTasks = () => {
    return tasks.filter((task) => task.is_overdue);
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    loadTasks,
    getMyTasks,
    getTasksByStatus,
    getOverdueTasks,
  };
}
