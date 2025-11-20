# 🚀 COMANDOS A EJECUTAR AHORA MISMO

## ⚡ COPIA ESTOS COMANDOS UNO POR UNO EN TU TERMINAL

### 1️⃣ Primero, asegúrate de estar en el directorio de tu proyecto
```bash
cd tu-repositorio-nexus  # Cambia esto por el nombre de tu carpeta
pwd  # Verifica que estés en el lugar correcto
```

### 2️⃣ Copia todos los archivos de configuración
Los archivos están en tus descargas. Cópialos a la raíz de tu proyecto:
- README.md
- .env.example
- .gitignore
- package.json
- next.config.js
- tailwind.config.ts
- tsconfig.json
- postcss.config.js
- setup.sh
- QUICK_START.md

### 3️⃣ Dale permisos al script de setup
```bash
chmod +x setup.sh
```

### 4️⃣ Ejecuta el script de setup (crea toda la estructura)
```bash
./setup.sh
```

### 5️⃣ Instala las dependencias (ESTO TARDARÁ 5-10 MINUTOS)
```bash
npm install
```

☕ Mientras se instalan las dependencias, ve a Supabase:

---

## 🗄️ MIENTRAS TANTO: CONFIGURAR SUPABASE

### Paso 1: Crear cuenta en Supabase
1. Ve a https://supabase.com
2. Crea una cuenta (con GitHub es más rápido)

### Paso 2: Crear proyecto
1. Click en "New Project"
2. Nombre: `nexus-dev`
3. Database Password: **GUARDA ESTO** (ejemplo: Mi$up3rP@ssw0rd2024)
4. Region: Selecciona el más cercano a ti
5. Click "Create new project"
6. **ESPERA 2-3 MINUTOS** hasta que diga "Project is ready"

### Paso 3: Obtener credenciales
1. En el sidebar, ve a: **Settings** (⚙️) → **API**
2. Copia estas 3 cosas:

   **Project URL:**
   ```
   https://xxxxxxxxxxxx.supabase.co
   ```
   
   **anon public:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
   ```
   
   **service_role (click en "Reveal"):**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
   ```

---

## 🔐 CONFIGURAR .ENV.LOCAL

### Paso 1: Crear el archivo
```bash
cp .env.example .env.local
```

### Paso 2: Editar con tus credenciales
```bash
# Abre el archivo con tu editor favorito
code .env.local  # Si usas VS Code
# O usa nano/vim/etc
```

### Paso 3: Pega tus credenciales de Supabase
Reemplaza estas líneas con los valores que copiaste:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI...
```

---

## 📊 CONFIGURAR BASE DE DATOS

### Paso 1: Ve a SQL Editor en Supabase
1. En Supabase Dashboard
2. Sidebar → **SQL Editor**
3. Click en **New query**

### Paso 2: Ejecuta el schema
1. Busca el archivo `DATABASE_SCHEMA.sql` en tus project files
2. Ábrelo y copia TODO el contenido
3. Pégalo en el SQL Editor
4. Click en **Run** (o Ctrl/Cmd + Enter)
5. Espera 1-2 minutos hasta que termine

### Paso 3: Verifica
1. Ve a **Table Editor** en el sidebar
2. Deberías ver muchas tablas:
   - dim_users
   - dim_organizations
   - fact_tasks
   - fact_memberships
   - etc.

---

## 🚀 INICIAR EL PROYECTO

```bash
# Verifica que npm install ya terminó
# Luego ejecuta:
npm run dev
```

Deberías ver algo como:
```
  ▲ Next.js 14.2.15
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

---

## 🎉 ABRE TU NAVEGADOR

Ve a: http://localhost:3000

Deberías ver la página redirigir a /login (aunque todavía está en blanco)

---

## 📝 PRIMER COMMIT

```bash
# Verifica los archivos
git status

# Agrega todo
git add .

# Commit
git commit -m "feat: initial project setup with Next.js 14, Supabase, and Tailwind"

# Push
git push origin main  # o 'master' según tu rama
```

---

## ✅ CHECKLIST FINAL

Marca lo que ya tienes:
- [ ] Proyecto clonado
- [ ] Archivos de configuración copiados
- [ ] npm install completado
- [ ] Supabase proyecto creado
- [ ] Credenciales en .env.local
- [ ] Base de datos configurada (SQL ejecutado)
- [ ] npm run dev funcionando
- [ ] Browser abierto en localhost:3000
- [ ] Primer commit hecho

---

## 🆘 SI ALGO FALLA

### npm install falla
```bash
# Limpia e intenta de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Next.js no inicia
```bash
# Limpia el cache
npm run clean
rm -rf .next
npm run dev
```

### Error de Supabase
```bash
# Verifica que las credenciales están bien copiadas en .env.local
# NO debe haber espacios extra
# Verifica que el archivo se llama .env.local (no .env.local.txt)
```

---

## 🎯 TIEMPO ESTIMADO

- Setup inicial: 15 minutos
- Supabase config: 15 minutos  
- Database setup: 15 minutos
- Verificación: 15 minutos
- **TOTAL: 1 HORA** ⏱️

Te quedan 60 minutos para crear la UI básica de login (siguiente paso en QUICK_START.md)

---

## 📞 PRÓXIMOS PASOS (después de tener esto corriendo)

Lee el archivo `QUICK_START.md` para continuar con:
1. Crear página de login con UI
2. Implementar autenticación
3. Dashboard básico

---

**¡VAMOS, PUEDES HACERLO! 🚀**

Cualquier duda, revisa los logs en la terminal - Next.js te dirá exactamente qué falta.
