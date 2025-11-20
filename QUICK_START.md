# ⚡ QUICK START - 2 Horas para tener algo funcionando

## 🎯 Objetivo
Tener el proyecto base funcionando con autenticación básica en 2 horas.

## ⏱️ Timeline

### Minuto 0-15: Setup Inicial
```bash
# 1. Dale permisos de ejecución al script de setup
chmod +x setup.sh

# 2. Ejecuta el script de setup
./setup.sh

# 3. Instala las dependencias (esto puede tardar 5-10 minutos)
npm install
```

### Minuto 15-30: Configurar Supabase
1. Ve a https://supabase.com y crea una cuenta (si no tienes)
2. Crea un nuevo proyecto:
   - Project name: `nexus-dev`
   - Database password: Guarda esto en un lugar seguro
   - Region: Elige el más cercano a ti
   - Wait for project to be ready (2-3 minutos)

3. Obtén tus credenciales:
   - Ve a: Settings → API
   - Copia `Project URL` → Esto es tu `NEXT_PUBLIC_SUPABASE_URL`
   - Copia `anon/public key` → Esto es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copia `service_role key` → Esto es tu `SUPABASE_SERVICE_ROLE_KEY`

4. Pega las credenciales en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

### Minuto 30-45: Setup de Base de Datos
1. En Supabase Dashboard:
   - Ve a: SQL Editor
   - Click en "New Query"
   - Abre el archivo `DATABASE_SCHEMA.sql` desde los project files
   - Copia TODO el contenido
   - Pégalo en el SQL Editor
   - Click en "Run"
   - Espera a que termine (puede tardar 1-2 minutos)

2. Verifica que se crearon las tablas:
   - Ve a: Table Editor
   - Deberías ver tablas como: `dim_users`, `fact_tasks`, `fact_memberships`, etc.

### Minuto 45-60: Prueba el Proyecto
```bash
# Inicia el servidor de desarrollo
npm run dev
```

Abre http://localhost:3000

### Minuto 60-90: Crear Páginas Básicas de Auth
Ahora vamos a crear las páginas básicas de autenticación para que veas algo funcional.

#### 1. Página de Login (`app/(auth)/login/page.tsx`)
```typescript
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-teal-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nexus Enterprise
          </h1>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-orange-500 hover:text-orange-600 font-semibold">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
```

Crea este archivo ejecutando:
```bash
mkdir -p app/\(auth\)/login
# Luego crea el archivo page.tsx con el código de arriba
```

### Minuto 90-120: Probar y Documentar
1. Refresca tu navegador en http://localhost:3000
2. Deberías ver la página de login
3. Toma screenshots
4. Haz tu primer commit:

```bash
git add .
git commit -m "feat: initial project setup with basic auth UI"
git push origin main
```

## ✅ Checklist de lo que debes tener funcionando
- [ ] Proyecto Next.js iniciado
- [ ] Supabase configurado
- [ ] Base de datos creada
- [ ] Variables de entorno configuradas
- [ ] Página de login visual (aunque no funcional aún)
- [ ] Primer commit en Git

## 🎉 ¡Lo lograste!
En 2 horas tienes:
- ✅ Proyecto configurado profesionalmente
- ✅ Base de datos completa
- ✅ UI básica funcionando
- ✅ Estructura de carpetas organizada
- ✅ Todo en Git

## 🚀 Próximos pasos (después de las 2 horas)
1. Implementar la lógica de autenticación con Supabase
2. Crear página de registro
3. Crear dashboard básico
4. Implementar sistema de tareas
5. Seguir el ROADMAP.md

## 💡 Tips
- Si algo falla, revisa los logs en la terminal
- Mantén la documentación abierta en otra ventana
- Haz commits frecuentes
- No te preocupes por hacer todo perfecto, itera

## 🆘 Problemas Comunes

### Error: "Module not found"
```bash
# Reinstala las dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Invalid Supabase URL"
- Verifica que copiaste bien las credenciales de Supabase
- Asegúrate de que no hay espacios extra en .env.local

### El servidor no inicia
```bash
# Limpia el caché de Next.js
npm run clean
npm run dev
```

## 📞 Siguiente Sesión
En tu próxima sesión de desarrollo, continuaremos con:
- Implementar autenticación funcional
- Crear páginas de registro y recuperación de contraseña
- Dashboard básico
- Sistema de roles

---

**¡Buena suerte y a desarrollar! 🚀**
