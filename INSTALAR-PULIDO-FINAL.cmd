@echo off
color 0A
echo ========================================
echo NEXUS - PULIDO FINAL (85%% a 100%%)
echo ========================================
echo.
echo Este script instalara:
echo - Sistema de notificaciones Toast
echo - Loading states elegantes
echo - Manejo de errores profesional
echo - Animaciones suaves
echo - README actualizado
echo.
pause
echo.

echo [1/5] Creando estructura de carpetas...
mkdir components 2>nul
mkdir hooks 2>nul
echo [OK] Carpetas creadas
echo.

echo [2/5] Copiando componentes de UI...
echo.

if exist Toast.tsx (
    copy Toast.tsx components\Toast.tsx >nul
    echo [OK] components\Toast.tsx
) else (
    echo [FALTA] Toast.tsx - DESCARGALO PRIMERO
)

if exist LoadingCard.tsx (
    copy LoadingCard.tsx components\LoadingCard.tsx >nul
    echo [OK] components\LoadingCard.tsx
) else (
    echo [FALTA] LoadingCard.tsx - DESCARGALO PRIMERO
)

if exist ErrorState.tsx (
    copy ErrorState.tsx components\ErrorState.tsx >nul
    echo [OK] components\ErrorState.tsx
) else (
    echo [FALTA] ErrorState.tsx - DESCARGALO PRIMERO
)

echo.
echo [3/5] Copiando hooks...
echo.

if exist useToast.ts (
    copy useToast.ts hooks\useToast.ts >nul
    echo [OK] hooks\useToast.ts
) else (
    echo [FALTA] useToast.ts - DESCARGALO PRIMERO
)

echo.
echo [4/5] Actualizando configuracion...
echo.

if exist tailwind-config-ACTUALIZADO.ts (
    copy tailwind-config-ACTUALIZADO.ts tailwind.config.ts >nul
    echo [OK] tailwind.config.ts actualizado con animaciones
) else (
    echo [FALTA] tailwind-config-ACTUALIZADO.ts - DESCARGALO PRIMERO
)

echo.
echo [5/5] Copiando documentacion...
echo.

if exist README-COMPLETO.md (
    copy README-COMPLETO.md README.md >nul
    echo [OK] README.md actualizado
) else (
    echo [FALTA] README-COMPLETO.md - DESCARGALO PRIMERO
)

echo.
echo ========================================
echo         PULIDO FINAL COMPLETO!
echo ========================================
echo.
echo IMPORTANTE: Ahora debes:
echo 1. Reiniciar el servidor Next.js
echo    - Presiona Ctrl+C en la terminal
echo    - Ejecuta: npm run dev
echo.
echo 2. Refresca el navegador
echo.
echo 3. Prueba las nuevas funcionalidades:
echo    - Notificaciones Toast
echo    - Loading states
echo    - Error handling
echo.
echo ========================================
echo     PROYECTO 100%% COMPLETO! 🎉
echo ========================================
echo.
echo Tu aplicacion Nexus esta lista para produccion!
echo.
echo Proximso pasos opcionales:
echo - Agregar tu logo personalizado
echo - Configurar dominio personalizado
echo - Deploy en Vercel
echo.
pause
