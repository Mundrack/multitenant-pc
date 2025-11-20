# 👥 GESTIÓN DE USUARIOS - Instalación

## 📊 PROGRESO
```
[████░░░░░░░░░░░░░░░░] 20% → 30%
```

---

## 🎯 LO QUE VAS A TENER:

✅ Sistema de 5 roles (Super Admin, Owner, Admin, Manager, Member)
✅ Página de gestión de equipo
✅ Perfil de usuario editable
✅ Cambio de contraseña
✅ Sidebar de navegación
✅ Control de permisos basado en roles
✅ Vista de usuarios con estadísticas

---

## 📥 PASO 1: Descargar archivos

Descarga estos 5 archivos:

1. [types-roles.ts](computer:///mnt/user-data/outputs/types-roles.ts)
2. [usePermissions.ts](computer:///mnt/user-data/outputs/usePermissions.ts)
3. [team-page.tsx](computer:///mnt/user-data/outputs/team-page.tsx)
4. [profile-page.tsx](computer:///mnt/user-data/outputs/profile-page.tsx)
5. [dashboard-layout.tsx](computer:///mnt/user-data/outputs/dashboard-layout.tsx)
6. [instalar-usuarios.cmd](computer:///mnt/user-data/outputs/instalar-usuarios.cmd) ⭐ **Script automático**

---

## ⚡ PASO 2: Ejecutar el script

Pon todos los archivos en la raíz de tu proyecto y ejecuta:

```cmd
instalar-usuarios.cmd
```

Este script:
- Crea las carpetas necesarias (types, hooks)
- Copia cada archivo a su lugar correcto
- Te muestra qué hizo

---

## 🔄 PASO 3: Reiniciar Next.js

**MUY IMPORTANTE**: Debes reiniciar el servidor.

1. Ve a la terminal donde corre `npm run dev`
2. Presiona **Ctrl+C** para detener
3. Espera que termine
4. Ejecuta de nuevo:
```cmd
npm run dev
```
5. Espera a que diga "Ready"

---

## 🧪 PASO 4: Probar las nuevas funcionalidades

### 1️⃣ Ver el Dashboard mejorado

Ve a: http://localhost:3000/dashboard

**Deberías ver:**
- ✅ Sidebar con navegación
- ✅ Enlaces a Dashboard, Equipo, Perfil
- ✅ Botón para abrir/cerrar sidebar
- ✅ Tu foto de perfil y nombre abajo
- ✅ Botón de cerrar sesión

### 2️⃣ Ver tu Equipo

Click en "Equipo" en el sidebar o ve a: http://localhost:3000/dashboard/team

**Deberías ver:**
- ✅ Estadísticas del equipo (Total, Activos, Admins, Miembros)
- ✅ Tabla con todos los usuarios
- ✅ Columnas: Usuario, Email, Rol, Estado, Fecha de Ingreso
- ✅ Botón "Invitar Usuario" (si tienes permisos)
- ✅ Badges de colores para roles

### 3️⃣ Ver tu Perfil

Click en "Perfil" en el sidebar o ve a: http://localhost:3000/dashboard/profile

**Deberías ver:**
- ✅ Tu foto de perfil grande
- ✅ Formulario para editar nombre
- ✅ Email (no editable)
- ✅ Sección para cambiar contraseña
- ✅ Información de la cuenta (ID, fecha de creación)

### 4️⃣ Editar tu perfil

1. Cambia tu nombre
2. Click en "Guardar Cambios"
3. Debería aparecer mensaje verde "Perfil actualizado correctamente"
4. El nombre se actualiza en el sidebar

### 5️⃣ Cambiar contraseña

1. Escribe una nueva contraseña (mínimo 6 caracteres)
2. Confirma la contraseña
3. Click en "Cambiar Contraseña"
4. Debería aparecer mensaje verde
5. Los campos se limpian

---

## ✅ CHECKLIST

Marca lo que ya funciona:

- [ ] Archivos descargados
- [ ] Script ejecutado
- [ ] Next.js reiniciado
- [ ] Dashboard muestra sidebar
- [ ] Puedo abrir/cerrar sidebar
- [ ] Página de Equipo carga correctamente
- [ ] Veo la lista de usuarios (al menos yo)
- [ ] Página de Perfil carga
- [ ] Puedo editar mi nombre
- [ ] Puedo cambiar mi contraseña
- [ ] Navegación entre páginas funciona
- [ ] Cerrar sesión funciona

---

## 🎨 LO QUE VES

### Dashboard con Sidebar

```
┌─────────────────┬──────────────────────────────┐
│                 │                              │
│    Nexus [≡]    │      Dashboard Content       │
│                 │                              │
│  🏠 Dashboard   │                              │
│  👥 Equipo      │                              │
│  👤 Perfil      │                              │
│                 │                              │
│                 │                              │
│                 │                              │
│  [U] Usuario    │                              │
│  user@email.com │                              │
│  [Cerrar Sesión]│                              │
└─────────────────┴──────────────────────────────┘
```

### Página de Equipo

```
┌──────────────────────────────────────────────┐
│ Equipo                    [+ Invitar Usuario]│
├──────────────────────────────────────────────┤
│  Total: 1   Activos: 1   Admins: 1  Miembros│
├──────────────────────────────────────────────┤
│ Usuario     Email           Rol      Estado  │
│ [U] Mateo   mateo@gmail    Owner    Activo   │
└──────────────────────────────────────────────┘
```

### Página de Perfil

```
┌──────────────────────────────────────────────┐
│ Mi Perfil                                    │
├──────────────────────────────────────────────┤
│  [U]  Mateo Puga                            │
│       mateo@gmail.com                        │
│                                              │
│  Nombre: [____________]                      │
│  Email:  [mateo@gmail] (no editable)        │
│  [Guardar Cambios]                          │
│                                              │
│  Cambiar Contraseña                         │
│  Nueva:    [____________]                    │
│  Confirmar:[____________]                    │
│  [Cambiar Contraseña]                       │
└──────────────────────────────────────────────┘
```

---

## 🔐 SISTEMA DE ROLES

Tu aplicación ahora tiene 5 roles:

| Rol | Color | Permisos |
|-----|-------|----------|
| **Super Admin** | Morado | TODO |
| **Owner** | Naranja | Control total de organización |
| **Admin** | Azul | Gestión operativa |
| **Manager** | Teal | Gestiona su equipo |
| **Member** | Gris | Usuario básico |

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot find module '@/types/roles'"

**Solución:**
```cmd
cd D:\Work Space\RADICAL\Proyecto F\App Multitenant\multitenant-pc
dir types
```
Verifica que existe `roles.ts`. Si no:
```cmd
copy types-roles.ts types\roles.ts
```

### Error: "Cannot find module '@/hooks/usePermissions'"

**Solución:**
```cmd
copy usePermissions.ts hooks\usePermissions.ts
```

### La página de Equipo está vacía

Esto es **normal**. Solo verás tu usuario. Cuando invites más usuarios, aparecerán aquí.

### No veo el botón "Invitar Usuario"

Esto es **normal** si no tienes rol de Owner o Admin. El botón solo aparece con permisos.

---

## 🎉 ¡FELICIDADES!

Si todo funciona, ahora tienes:

✅ Sistema de roles completo
✅ Gestión de equipo
✅ Perfil editable
✅ Navegación profesional
✅ 30% del proyecto completo

---

## 📊 ACTUALIZACIÓN DE PROGRESO

```
ANTES:  [████░░░░░░░░░░░░░░░░] 20%
AHORA:  [██████░░░░░░░░░░░░░░] 30% ✅
```

---

## 💾 GUARDA TU PROGRESO

```cmd
git add .
git commit -m "feat: sistema de gestión de usuarios con roles y permisos"
git push origin main
```

---

## 🚀 PRÓXIMOS PASOS

Ya tienes el 30% completo. Las opciones son:

**A) Sistema de Invitaciones (35% total)** - 30 min
- Invitar usuarios por email
- Sistema de tokens de invitación
- Asignar roles al invitar

**B) Sistema de Tareas (50% total)** - 1-2 horas
- Crear tareas
- Asignar tareas
- Sistema de semáforo (verde/amarillo/rojo)
- Dashboard de tareas

**C) Descansar** 😴
- Commit y continuar mañana

---

**¿Listo para probar?** Ejecuta el script y dime qué ves 🚀
