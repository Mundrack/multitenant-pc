@echo off
color 0A
echo ============================================
echo   INSTALAR ORGANIZACIONES JERARQUICAS
echo ============================================
echo.
echo Este script instalara:
echo  1. Script SQL para base de datos
echo  2. Tipos TypeScript
echo  3. Hook useOrganizations
echo  4. Context Provider
echo  5. Componentes UI
echo  6. Pagina de gestion
echo.
pause

cd /d "D:\Work Space\RADICAL\Proyecto F\App Multitenant\multitenant-pc"

echo.
echo [1/9] Copiando tipos...
copy /Y "%USERPROFILE%\Downloads\types-organizations.ts" "types\organizations.ts"
if %errorlevel% == 0 (
    echo [OK] types\organizations.ts
) else (
    echo [ERROR] No se pudo copiar types-organizations.ts
)

echo.
echo [2/9] Copiando hook useOrganizations...
copy /Y "%USERPROFILE%\Downloads\useOrganizations.ts" "hooks\useOrganizations.ts"
if %errorlevel% == 0 (
    echo [OK] hooks\useOrganizations.ts
) else (
    echo [ERROR] No se pudo copiar useOrganizations.ts
)

echo.
echo [3/9] Creando carpeta lib\contexts...
if not exist "lib\contexts" mkdir "lib\contexts"
copy /Y "%USERPROFILE%\Downloads\OrganizationContext.tsx" "lib\contexts\OrganizationContext.tsx"
if %errorlevel% == 0 (
    echo [OK] lib\contexts\OrganizationContext.tsx
) else (
    echo [ERROR] No se pudo copiar OrganizationContext.tsx
)

echo.
echo [4/9] Copiando OrganizationSelector...
copy /Y "%USERPROFILE%\Downloads\OrganizationSelector.tsx" "components\OrganizationSelector.tsx"
if %errorlevel% == 0 (
    echo [OK] components\OrganizationSelector.tsx
) else (
    echo [ERROR] No se pudo copiar OrganizationSelector.tsx
)

echo.
echo [5/9] Copiando OrganizationTree...
copy /Y "%USERPROFILE%\Downloads\OrganizationTree.tsx" "components\OrganizationTree.tsx"
if %errorlevel% == 0 (
    echo [OK] components\OrganizationTree.tsx
) else (
    echo [ERROR] No se pudo copiar OrganizationTree.tsx
)

echo.
echo [6/9] Copiando SubOrganizationModal...
copy /Y "%USERPROFILE%\Downloads\SubOrganizationModal.tsx" "components\SubOrganizationModal.tsx"
if %errorlevel% == 0 (
    echo [OK] components\SubOrganizationModal.tsx
) else (
    echo [ERROR] No se pudo copiar SubOrganizationModal.tsx
)

echo.
echo [7/9] Creando carpeta app\dashboard\organizations...
if not exist "app\dashboard\organizations" mkdir "app\dashboard\organizations"
copy /Y "%USERPROFILE%\Downloads\organizations-page.tsx" "app\dashboard\organizations\page.tsx"
if %errorlevel% == 0 (
    echo [OK] app\dashboard\organizations\page.tsx
) else (
    echo [ERROR] No se pudo copiar organizations-page.tsx
)

echo.
echo [8/9] Copiando script SQL...
copy /Y "%USERPROFILE%\Downloads\01_AGREGAR_SUB_ORGANIZACIONES.sql" "01_AGREGAR_SUB_ORGANIZACIONES.sql"
if %errorlevel% == 0 (
    echo [OK] 01_AGREGAR_SUB_ORGANIZACIONES.sql
) else (
    echo [ERROR] No se pudo copiar el script SQL
)

echo.
echo ============================================
echo          ARCHIVOS COPIADOS
echo ============================================
echo.
echo IMPORTANTE: Ahora debes hacer 2 cosas:
echo.
echo 1. EJECUTAR EL SCRIPT SQL EN SUPABASE:
echo    - Abre Supabase Dashboard
echo    - Ve a SQL Editor
echo    - Copia el contenido de: 01_AGREGAR_SUB_ORGANIZACIONES.sql
echo    - Ejecutalo
echo.
echo 2. ACTUALIZAR app\dashboard\layout.tsx:
echo    - Agregar OrganizationProvider
echo    - Agregar OrganizationSelector en el navbar
echo.
echo ============================================
echo.
echo [9/9] Abriendo guia de integracion...
start notepad INTEGRACION_ORGANIZACIONES.txt

echo.
echo Presiona cualquier tecla para continuar...
pause > nul
