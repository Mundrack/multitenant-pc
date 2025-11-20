@echo off
echo ========================================
echo NEXUS - Instalando Autenticacion
echo ========================================
echo.

echo Descarga estos archivos y ponlos en la raiz del proyecto:
echo.
echo 1. lib-supabase-client.ts
echo 2. lib-supabase-server.ts
echo 3. login-page-funcional.tsx
echo 4. register-page.tsx
echo 5. dashboard-page.tsx
echo 6. middleware.ts
echo.

pause
echo.
echo Creando carpetas necesarias...
echo.

mkdir lib\supabase 2>nul
mkdir app\(auth)\register 2>nul
mkdir app\dashboard 2>nul

echo [OK] Carpetas creadas
echo.
echo Copiando archivos...
echo.

copy lib-supabase-client.ts lib\supabase\client.ts
echo [OK] lib\supabase\client.ts creado

copy lib-supabase-server.ts lib\supabase\server.ts
echo [OK] lib\supabase\server.ts creado

copy login-page-funcional.tsx app\(auth)\login\page.tsx
echo [OK] app\(auth)\login\page.tsx actualizado

copy register-page.tsx app\(auth)\register\page.tsx
echo [OK] app\(auth)\register\page.tsx creado

copy dashboard-page.tsx app\dashboard\page.tsx
echo [OK] app\dashboard\page.tsx creado

copy middleware.ts middleware.ts
echo [OK] middleware.ts creado en la raiz del proyecto

echo.
echo ========================================
echo [EXITO] Autenticacion instalada!
echo ========================================
echo.
echo IMPORTANTE: Debes reiniciar el servidor Next.js
echo.
echo 1. Ve a la terminal donde corre npm run dev
echo 2. Presiona Ctrl+C para detener
echo 3. Ejecuta de nuevo: npm run dev
echo 4. Refresca el navegador
echo.
echo Ahora puedes:
echo - Registrar usuarios en: http://localhost:3000/register
echo - Iniciar sesion en: http://localhost:3000/login
echo - Ver dashboard en: http://localhost:3000/dashboard
echo.
pause
