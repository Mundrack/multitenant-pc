// components/Toast.tsx
'use client';

import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-500 border-green-600',
  error: 'bg-red-500 border-red-600',
  info: 'bg-blue-500 border-blue-600',
  warning: 'bg-yellow-500 border-yellow-600',
};

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`${toastStyles[type]} fixed top-4 right-4 z-50 min-w-[300px] max-w-[500px] rounded-lg border-2 shadow-lg animate-slide-in`}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white">
          {toastIcons[type]}
        </div>
        <p className="flex-1 text-sm font-medium text-white">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
