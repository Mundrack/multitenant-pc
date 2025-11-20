@echo off
echo ========================================
echo NEXUS - Copiando archivos esenciales
echo ========================================
echo.

echo Descarga estos 5 archivos y ponlos en tu carpeta del proyecto:
echo.
echo 1. app-globals.css
echo 2. app-layout.tsx
echo 3. app-page.tsx
echo 4. login-page.tsx
echo 5. lib-utils.ts
echo.
echo Luego ejecuta estos comandos:
echo.

pause
echo.
echo Copiando archivos...
echo.

copy app-globals.css app\globals.css
echo [OK] app\globals.css creado

copy app-layout.tsx app\layout.tsx
echo [OK] app\layout.tsx creado

copy app-page.tsx app\page.tsx
echo [OK] app\page.tsx creado

copy login-page.tsx app\(auth)\login\page.tsx
echo [OK] app\(auth)\login\page.tsx creado

copy lib-utils.ts lib\utils.ts
echo [OK] lib\utils.ts creado

echo.
echo ========================================
echo [EXITO] Todos los archivos copiados!
echo ========================================
echo.
echo Ahora ejecuta: npm run dev
echo.
pause
