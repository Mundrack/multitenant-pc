@echo off
echo ========================================
echo NEXUS - Instalando Gestion de Usuarios
echo ========================================
echo.

echo Descarga estos archivos y ponlos en la raiz del proyecto:
echo.
echo 1. types-roles.ts
echo 2. usePermissions.ts
echo 3. team-page.tsx
echo 4. profile-page.tsx
echo 5. dashboard-layout.tsx
echo.

pause
echo.
echo Creando carpetas necesarias...
echo.

mkdir types 2>nul
mkdir hooks 2>nul
mkdir app\dashboard\team 2>nul
mkdir app\dashboard\profile 2>nul

echo [OK] Carpetas creadas
echo.
echo Copiando archivos...
echo.

copy types-roles.ts types\roles.ts
echo [OK] types\roles.ts creado

copy usePermissions.ts hooks\usePermissions.ts
echo [OK] hooks\usePermissions.ts creado

copy team-page.tsx app\dashboard\team\page.tsx
echo [OK] app\dashboard\team\page.tsx creado

copy profile-page.tsx app\dashboard\profile\page.tsx
echo [OK] app\dashboard\profile\page.tsx creado

copy dashboard-layout.tsx app\dashboard\layout.tsx
echo [OK] app\dashboard\layout.tsx creado

echo.
echo ========================================
echo [EXITO] Gestion de Usuarios instalada!
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
echo - http://localhost:3000/dashboard/team - Ver equipo
echo - http://localhost:3000/dashboard/profile - Tu perfil
echo.
pause
