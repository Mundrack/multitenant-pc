'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { useTasks } from '@/hooks/useTasks';
import { TaskStatus } from '@/types/tasks';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const { tasks, loading: tasksLoading } = useTasks();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();
  }, [router, supabase.auth]);

  // Calcular estadísticas
  const stats = {
    totalTasks: tasks.length,
    pendingTasks: tasks.filter((t) => t.status === TaskStatus.PENDING).length,
    inProgressTasks: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    completedTasks: tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
    overdueTasks: tasks.filter((t) => t.is_overdue).length,
  };

  if (loading || tasksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido, {user?.user_metadata?.full_name || 'Usuario'}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida Card */}
        <div className="bg-gradient-to-br from-orange-500 to-teal-500 rounded-xl shadow-md p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo! 🎉</h2>
          <p className="text-lg opacity-90">
            Tu panel de control está listo. Aquí está tu resumen de hoy.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/dashboard/tasks"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tareas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTasks}</p>
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
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En Progreso</p>
                <p className="text-3xl font-bold text-blue-500">{stats.inProgressTasks}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completadas</p>
                <p className="text-3xl font-bold text-green-500">{stats.completedTasks}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vencidas</p>
                <p className="text-3xl font-bold text-red-500">{stats.overdueTasks}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/tasks/new"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-lg group-hover:bg-orange-200 transition">
                <svg
                  className="w-8 h-8 text-orange-500"
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
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Crear Tarea</h3>
                <p className="text-sm text-gray-600">Nueva tarea para el equipo</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/tasks"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-4 rounded-lg group-hover:bg-teal-200 transition">
                <svg
                  className="w-8 h-8 text-teal-500"
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
              <div>
                <h3 className="font-semibold text-gray-900">Ver Tareas</h3>
                <p className="text-sm text-gray-600">Todas las tareas del equipo</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/team"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-lg group-hover:bg-blue-200 transition">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ver Equipo</h3>
                <p className="text-sm text-gray-600">Gestiona tu equipo</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Sistema de Semáforo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Verde</h4>
                <p className="text-sm text-gray-600">
                  Tarea en tiempo. Menos del 50% del tiempo transcurrido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Amarillo</h4>
                <p className="text-sm text-gray-600">
                  Atención requerida. Entre 50-80% del tiempo transcurrido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Rojo</h4>
                <p className="text-sm text-gray-600">
                  Urgente. Más del 80% del tiempo o tarea vencida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
