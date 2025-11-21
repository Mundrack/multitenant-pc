@echo off
echo ========================================
echo NEXUS - Instalando Analytics Avanzado
echo ========================================
echo.

echo PASO 1: Instalar Recharts
echo.
echo IMPORTANTE: Primero debes instalar Recharts
echo Abre otra terminal y ejecuta:
echo npm install recharts
echo.
echo Presiona cualquier tecla cuando termine la instalacion...
pause
echo.

echo Descarga estos archivos y ponlos en la raiz del proyecto:
echo.
echo 1. types-analytics.ts
echo 2. useAnalytics.ts
echo 3. TasksByStatusChart.tsx
echo 4. TasksByPriorityChart.tsx
echo 5. TimeSeriesChart.tsx
echo 6. analytics-page.tsx
echo 7. dashboard-layout-FINAL.tsx
echo.

pause
echo.
echo Creando carpetas necesarias...
echo.

mkdir types 2>nul
mkdir hooks 2>nul
mkdir components\charts 2>nul
mkdir app\dashboard\analytics 2>nul

echo [OK] Carpetas creadas
echo.
echo Copiando archivos...
echo.

copy types-analytics.ts types\analytics.ts
echo [OK] types\analytics.ts creado

copy useAnalytics.ts hooks\useAnalytics.ts
echo [OK] hooks\useAnalytics.ts creado

copy TasksByStatusChart.tsx components\charts\TasksByStatusChart.tsx
echo [OK] components\charts\TasksByStatusChart.tsx creado

copy TasksByPriorityChart.tsx components\charts\TasksByPriorityChart.tsx
echo [OK] components\charts\TasksByPriorityChart.tsx creado

copy TimeSeriesChart.tsx components\charts\TimeSeriesChart.tsx
echo [OK] components\charts\TimeSeriesChart.tsx creado

copy analytics-page.tsx app\dashboard\analytics\page.tsx
echo [OK] app\dashboard\analytics\page.tsx creado

copy dashboard-layout-FINAL.tsx app\dashboard\layout.tsx
echo [OK] app\dashboard\layout.tsx actualizado con Analytics

echo.
echo ========================================
echo [EXITO] Analytics Avanzado instalado!
echo ========================================
echo.
echo IMPORTANTE: Debes reiniciar el servidor Next.js
echo.
echo 1. Ve a la terminal donde corre npm run dev
echo 2. Presiona Ctrl+C para detener
echo 3. Ejecuta de nuevo: npm run dev
echo 4. Refresca el navegador
echo.
echo Ahora puedes acceder a:
echo - http://localhost:3000/dashboard/analytics - Analytics completo
echo.
echo Funcionalidades:
echo - Graficos interactivos (Pie, Barras, Lineas)
echo - KPIs en tiempo real
echo - Tendencias de 30 dias
echo - Rendimiento por usuario
echo - Exportar a CSV
echo.
pause
