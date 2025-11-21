// types/tasks.ts
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaskSemaphoreColor {
  GREEN = 'green',    // <= 50% tiempo transcurrido
  YELLOW = 'yellow',  // 50-80% tiempo transcurrido
  RED = 'red',        // > 80% o vencida
  COMPLETED = 'completed',
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number; // 0-100
  start_date: string;
  due_date: string;
  completed_at: string | null;
  created_by: string;
  assigned_to: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
  
  // Computed fields
  semaphore_color?: TaskSemaphoreColor;
  days_remaining?: number;
  is_overdue?: boolean;
  assigned_user?: {
    id: string;
    full_name: string;
    email: string;
  };
  creator?: {
    id: string;
    full_name: string;
    email: string;
  };
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: TaskPriority;
  start_date: string;
  due_date: string;
  assigned_to: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  progress?: number;
  due_date?: string;
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: 'Baja',
  [TaskPriority.MEDIUM]: 'Media',
  [TaskPriority.HIGH]: 'Alta',
  [TaskPriority.URGENT]: 'Urgente',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'Pendiente',
  [TaskStatus.IN_PROGRESS]: 'En Progreso',
  [TaskStatus.COMPLETED]: 'Completada',
  [TaskStatus.CANCELLED]: 'Cancelada',
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: 'bg-gray-100 text-gray-800',
  [TaskPriority.MEDIUM]: 'bg-blue-100 text-blue-800',
  [TaskPriority.HIGH]: 'bg-orange-100 text-orange-800',
  [TaskPriority.URGENT]: 'bg-red-100 text-red-800',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [TaskStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
};

// Función para calcular el color del semáforo
export function calculateSemaphoreColor(
  startDate: string,
  dueDate: string,
  progress: number,
  status: TaskStatus
): TaskSemaphoreColor {
  if (status === TaskStatus.COMPLETED) {
    return TaskSemaphoreColor.COMPLETED;
  }

  const now = new Date();
  const start = new Date(startDate);
  const due = new Date(dueDate);
  
  const totalTime = due.getTime() - start.getTime();
  const elapsedTime = now.getTime() - start.getTime();
  const percentElapsed = (elapsedTime / totalTime) * 100;

  // Si ya venció
  if (now > due) {
    return TaskSemaphoreColor.RED;
  }

  // Si el progreso está muy atrasado respecto al tiempo
  if (progress < percentElapsed - 30) {
    return TaskSemaphoreColor.RED;
  }

  // Lógica del semáforo por tiempo
  if (percentElapsed <= 50) {
    return TaskSemaphoreColor.GREEN;
  } else if (percentElapsed <= 80) {
    return TaskSemaphoreColor.YELLOW;
  } else {
    return TaskSemaphoreColor.RED;
  }
}

// Función para calcular días restantes
export function calculateDaysRemaining(dueDate: string): number {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
