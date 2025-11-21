// components/TaskCard.tsx
'use client';

import { Task, TaskSemaphoreColor, PRIORITY_LABELS, STATUS_LABELS } from '@/types/tasks';

interface TaskCardProps {
  task: Task;
  onUpdateProgress?: (taskId: string, progress: number) => void;
  onClick?: () => void;
}

export function TaskCard({ task, onUpdateProgress, onClick }: TaskCardProps) {
  const semaphoreColors = {
    [TaskSemaphoreColor.GREEN]: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      dot: 'bg-green-500',
      text: 'text-green-700',
    },
    [TaskSemaphoreColor.YELLOW]: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      dot: 'bg-yellow-500',
      text: 'text-yellow-700',
    },
    [TaskSemaphoreColor.RED]: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      dot: 'bg-red-500',
      text: 'text-red-700',
    },
    [TaskSemaphoreColor.COMPLETED]: {
      bg: 'bg-gray-100',
      border: 'border-gray-400',
      dot: 'bg-gray-400',
      text: 'text-gray-600',
    },
  };

  const colors = semaphoreColors[task.semaphore_color || TaskSemaphoreColor.GREEN];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border-l-4 ${colors.border} shadow-md hover:shadow-lg transition p-6 cursor-pointer`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
          )}
        </div>
        
        {/* Semáforo */}
        <div className={`ml-4 flex flex-col items-center ${colors.bg} rounded-lg p-3`}>
          <div className={`w-6 h-6 rounded-full ${colors.dot} animate-pulse`}></div>
          <span className={`text-xs font-semibold mt-2 ${colors.text}`}>
            {task.semaphore_color === TaskSemaphoreColor.COMPLETED
              ? 'DONE'
              : task.is_overdue
              ? 'VENCIDA'
              : `${task.days_remaining}d`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className="text-sm font-bold text-gray-900">{task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all ${
              task.progress === 100
                ? 'bg-green-500'
                : task.progress >= 50
                ? 'bg-blue-500'
                : 'bg-orange-500'
            }`}
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Asignado a:</span>
          <p className="font-medium text-gray-900 truncate">
            {task.assigned_user?.full_name || 'No asignado'}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Prioridad:</span>
          <p className="font-medium text-gray-900">{PRIORITY_LABELS[task.priority]}</p>
        </div>
        <div>
          <span className="text-gray-500">Fecha límite:</span>
          <p className="font-medium text-gray-900">
            {new Date(task.due_date).toLocaleDateString('es-ES')}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Estado:</span>
          <p className="font-medium text-gray-900">{STATUS_LABELS[task.status]}</p>
        </div>
      </div>

      {/* Quick Actions */}
      {onUpdateProgress && task.progress < 100 && (
        <div className="mt-4 pt-4 border-t flex gap-2">
          {task.progress < 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateProgress(task.id, Math.min(task.progress + 25, 100));
              }}
              className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition"
            >
              +25%
            </button>
          )}
          {task.progress >= 75 && task.progress < 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateProgress(task.id, 100);
              }}
              className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition"
            >
              Completar
            </button>
          )}
        </div>
      )}
    </div>
  );
}