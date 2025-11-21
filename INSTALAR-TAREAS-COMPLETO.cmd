@echo off
color 0A
echo ========================================
echo NEXUS - INSTALACION COMPLETA DE TAREAS
echo ========================================
echo.
echo Este script instalara TODO el sistema de tareas:
echo - Tipos y enums
echo - Hooks de gestion
echo - Componentes visuales
echo - Paginas completas
echo - Dashboard actualizado
echo.
pause
echo.

echo [1/3] Creando estructura de carpetas...
mkdir types 2>nul
mkdir hooks 2>nul
mkdir components 2>nul
mkdir app\dashboard\tasks 2>nul
mkdir app\dashboard\tasks\new 2>nul
echo [OK] Carpetas creadas
echo.

echo [2/3] Copiando archivos del sistema de tareas...
echo.

if exist types-tasks.ts (
    copy types-tasks.ts types\tasks.ts >nul
    echo [OK] types\tasks.ts
) else (
    echo [FALTA] types-tasks.ts - DESCARGALO PRIMERO
)

if exist useTasks.ts (
    copy useTasks.ts hooks\useTasks.ts >nul
    echo [OK] hooks\useTasks.ts
) else (
    echo [FALTA] useTasks.ts - DESCARGALO PRIMERO
)

if exist TaskCard.tsx (
    copy TaskCard.tsx components\TaskCard.tsx >nul
    echo [OK] components\TaskCard.tsx
) else (
    echo [FALTA] TaskCard.tsx - DESCARGALO PRIMERO
)

if exist tasks-page.tsx (
    copy tasks-page.tsx app\dashboard\tasks\page.tsx >nul
    echo [OK] app\dashboard\tasks\page.tsx
) else (
    echo [FALTA] tasks-page.tsx - DESCARGALO PRIMERO
)

if exist new-task-page.tsx (
    copy new-task-page.tsx app\dashboard\tasks\new\page.tsx >nul
    echo [OK] app\dashboard\tasks\new\page.tsx
) else (
    echo [FALTA] new-task-page.tsx - DESCARGALO PRIMERO
)

if exist dashboard-page-ACTUALIZADO.tsx (
    copy dashboard-page-ACTUALIZADO.tsx app\dashboard\page.tsx >nul
    echo [OK] app\dashboard\page.tsx ACTUALIZADO
) else (
    echo [FALTA] dashboard-page-ACTUALIZADO.tsx - DESCARGALO PRIMERO
)

if exist dashboard-layout-ACTUALIZADO.tsx (
    copy dashboard-layout-ACTUALIZADO.tsx app\dashboard\layout.tsx >nul
    echo [OK] app\dashboard\layout.tsx ACTUALIZADO
) else (
    echo [FALTA] dashboard-layout-ACTUALIZADO.tsx - DESCARGALO PRIMERO
)

echo.
echo [3/3] Limpiando cache de Next.js...
if exist .next (
    rmdir /s /q .next
    echo [OK] Cache limpiado
) else (
    echo [INFO] No hay cache que limpiar
)

echo.
echo ========================================
echo         INSTALACION COMPLETA!
echo ========================================
echo.
echo IMPORTANTE: Ahora debes:
echo 1. Reiniciar el servidor Next.js
echo    - Presiona Ctrl+C en la terminal
echo    - Ejecuta: npm run dev
echo.
echo 2. Ir a: http://localhost:3000/dashboard/tasks
echo.
echo 3. Crear 2-3 tareas de prueba
echo.
echo Si todo funciona, regresa y di "Listo"
echo para continuar con Analytics.
echo.
pause
