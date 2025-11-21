@echo off
color 0E
echo ============================================
echo      CREAR BACKUP COMPLETO DEL PROYECTO
echo ============================================
echo.
echo Este script creara una copia completa de
echo tu proyecto antes de cualquier limpieza.
echo.
echo Ubicacion del backup:
echo D:\Work Space\RADICAL\Proyecto F\App Multitenant\
echo.
echo Nombre: multitenant-pc-BACKUP-[FECHA]
echo.
pause

cd /d "D:\Work Space\RADICAL\Proyecto F\App Multitenant\"

REM Obtener fecha en formato YYYYMMDD
set FECHA=%date:~-4,4%%date:~-7,2%%date:~-10,2%
set HORA=%time:~0,2%%time:~3,2%
set HORA=%HORA: =0%

set BACKUP_NAME=multitenant-pc-BACKUP-%FECHA%-%HORA%

echo.
echo Creando backup: %BACKUP_NAME%
echo.
echo Esto puede tomar 2-5 minutos...
echo.

REM Copiar todo excepto node_modules y .next (son muy grandes y se regeneran)
echo [1/3] Copiando archivos principales...
xcopy multitenant-pc\* %BACKUP_NAME%\ /E /I /H /Y /EXCLUDE:BACKUP-EXCLUDE.txt

REM Crear archivo de exclusión si no existe
echo node_modules > BACKUP-EXCLUDE.txt
echo .next >> BACKUP-EXCLUDE.txt
echo .turbo >> BACKUP-EXCLUDE.txt
echo .git >> BACKUP-EXCLUDE.txt

echo.
echo [2/3] Verificando backup...
if exist %BACKUP_NAME% (
    echo   ✓ Backup creado correctamente
) else (
    echo   ✗ ERROR: No se pudo crear el backup
    pause
    exit /b 1
)

echo.
echo [3/3] Creando archivo INFO.txt...
echo ============================================ > %BACKUP_NAME%\BACKUP-INFO.txt
echo   BACKUP DEL PROYECTO NEXUS >> %BACKUP_NAME%\BACKUP-INFO.txt
echo ============================================ >> %BACKUP_NAME%\BACKUP-INFO.txt
echo. >> %BACKUP_NAME%\BACKUP-INFO.txt
echo Fecha: %date% >> %BACKUP_NAME%\BACKUP-INFO.txt
echo Hora: %time% >> %BACKUP_NAME%\BACKUP-INFO.txt
echo. >> %BACKUP_NAME%\BACKUP-INFO.txt
echo COMO RESTAURAR: >> %BACKUP_NAME%\BACKUP-INFO.txt
echo 1. Elimina la carpeta: multitenant-pc >> %BACKUP_NAME%\BACKUP-INFO.txt
echo 2. Renombra esta carpeta a: multitenant-pc >> %BACKUP_NAME%\BACKUP-INFO.txt
echo 3. Ejecuta: npm install >> %BACKUP_NAME%\BACKUP-INFO.txt
echo 4. Ejecuta: npm run dev >> %BACKUP_NAME%\BACKUP-INFO.txt
echo. >> %BACKUP_NAME%\BACKUP-INFO.txt
echo NOTA: Esta copia NO incluye node_modules ni .next >> %BACKUP_NAME%\BACKUP-INFO.txt
echo       Estas carpetas se regeneran con npm install >> %BACKUP_NAME%\BACKUP-INFO.txt

echo.
echo ============================================
echo          BACKUP COMPLETADO
echo ============================================
echo.
echo ✓ Backup creado: %BACKUP_NAME%
echo ✓ Ubicacion: D:\Work Space\RADICAL\Proyecto F\App Multitenant\%BACKUP_NAME%
echo.
echo IMPORTANTE:
echo - Este backup NO incluye node_modules (se regenera)
echo - Para restaurar, sigue las instrucciones en:
echo   %BACKUP_NAME%\BACKUP-INFO.txt
echo.
echo ============================================
echo.
pause
