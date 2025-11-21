'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { TaskStatus, TaskPriority } from '@/types/tasks';
import Link from 'next/link';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/types/roles';

export default function TasksPage() {
  const { tasks, loading, updateTask } = useTasks();
  const { hasPermission } = usePermissions();
  const [filter, setFilter] = useState<'all' | 'my' | 'overdue'>('all');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  // Filtrar tareas
  const filteredTasks = tasks.filter((task) => {
    // Filtro por tipo
    if (filter === 'my') {
      // TODO: Filtrar por usuario actual
    } else if (filter === 'overdue') {
      if (!task.is_overdue) return false;
    }

    // Filtro por status
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false;
    }

    return true;
  });

  // Estadísticas
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === TaskStatus.PENDING).length,
    inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    completed: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
    overdue: tasks.filter((t) => t.is_overdue).length,
  };

  const handleUpdateProgress = async (taskId: string, progress: number) => {
    const newStatus =
      progress === 100
        ? TaskStatus.COMPLETED
        : progress > 0
        ? TaskStatus.IN_PROGRESS
        : TaskStatus.PENDING;

    await updateTask(taskId, { progress, status: newStatus });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
              <p className="text-gray-600">Gestiona tus tareas y proyectos</p>
            </div>
            {hasPermission(Permission.TASKS_CREATE) && (
              <Link
                href="/dashboard/tasks/new"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Nueva Tarea
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En Progreso</p>
                <p className="text-3xl font-bold text-blue-500">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completadas</p>
                <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vencidas</p>
                <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vista
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              >
                <option value="all">Todas las tareas</option>
                <option value="my">Mis tareas</option>
                <option value="overdue">Vencidas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              >
                <option value="all">Todos los estados</option>
                <option value={TaskStatus.PENDING}>Pendiente</option>
                <option value={TaskStatus.IN_PROGRESS}>En Progreso</option>
                <option value={TaskStatus.COMPLETED}>Completada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay tareas
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza creando tu primera tarea
            </p>
            {hasPermission(Permission.TASKS_CREATE) && (
              <Link
                href="/dashboard/tasks/new"
                className="inline-flex px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Crear Primera Tarea
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdateProgress={handleUpdateProgress}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
