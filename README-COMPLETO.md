# 🚀 Nexus - Plataforma Empresarial Multitenant

<div align="center">

**Sistema completo de gestión empresarial con multitenancy, autenticación y analytics avanzado**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

</div>

---

## ✨ Características Principales

### 🔐 **Autenticación Completa**
- Registro e inicio de sesión seguro
- Gestión de sesiones con Supabase Auth
- Protección de rutas con middleware
- Roles y permisos granulares

### 🏢 **Multitenancy Robusto**
- Organizaciones múltiples
- Aislamiento total de datos
- 5 roles: Owner, Admin, Manager, Member, Viewer
- Gestión de membresías

### 📋 **Sistema de Tareas Avanzado**
- CRUD completo
- **Semáforo de urgencia** 🟢🟡🔴
- Asignación a usuarios
- 4 prioridades: Baja, Media, Alta, Urgente
- 4 estados: Pendiente, En Progreso, Completada, Cancelada
- Barra de progreso visual (0-100%)
- Filtros y búsqueda en tiempo real

### 📊 **Analytics Profesional**

**Gráficos Interactivos:**
- 📊 Gráfico de Pie (Distribución por Estado)
- 📊 Gráfico de Barras (Tareas por Prioridad)
- 📈 Gráfico de Líneas (Tendencias 30 días)

**KPIs en Tiempo Real:**
- ✅ Tasa de Completación
- ⏱️ Tiempo Promedio de Completación
- 🎯 Score de Productividad (0-100)
- 📈 Tendencia (↑ Mejorando / ↓ Decayendo / → Estable)

**Extras:**
- Tabla de rendimiento por usuario
- Exportación a CSV de reportes completos
- Cálculos automáticos en tiempo real

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Gráficos** | Recharts |
| **Backend** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Deployment** | Vercel (recomendado) |

---

## 🚀 Instalación Rápida

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/nexus.git
cd nexus
npm install
```

### 2. Configurar Supabase

Crea `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

### 3. Ejecutar migraciones

En Supabase SQL Editor, ejecuta `DATABASE_SCHEMA.sql`

### 4. Iniciar

```bash
npm run dev
```

Abre http://localhost:3000

---

## 📁 Estructura

```
nexus/
├── app/
│   ├── (auth)/              # Login, Register
│   └── dashboard/           # Dashboard protegido
│       ├── analytics/       # 📊 Analytics
│       ├── tasks/          # 📋 Tareas
│       ├── team/           # 👥 Equipo
│       └── profile/        # 👤 Perfil
├── components/
│   ├── charts/             # Gráficos Recharts
│   ├── Toast.tsx           # Notificaciones
│   └── LoadingCard.tsx     # Loading states
├── hooks/
│   ├── useAnalytics.ts     # Hook analytics
│   ├── useTasks.ts         # Hook tareas
│   └── usePermissions.ts   # Hook permisos
├── types/                   # Tipos TypeScript
└── DATABASE_SCHEMA.sql      # Esquema de BD
```

---

## 💻 Uso

### Crear una tarea

1. Ve a **Tareas** en el sidebar
2. Click **"Nueva Tarea"**
3. Llena el formulario
4. La tarea aparece con semáforo 🟢🟡🔴
5. Usa **+25%** para actualizar progreso

### Ver Analytics

1. Ve a **Analytics**
2. Observa:
   - 4 KPIs en tarjetas con gradientes
   - 3 gráficos interactivos
   - Tabla de rendimiento
3. Click **"Exportar CSV"** para descargar

---

## 🎨 Personalización

### Cambiar colores

```typescript
// tailwind.config.ts
colors: {
  primary: '#FF6B35',    // Naranja
  secondary: '#004E89',  // Azul
}
```

### Modificar branding

- Logo: `app/dashboard/layout.tsx`
- Favicon: `public/favicon.ico`
- Metadata: `app/layout.tsx`

---

## 🚀 Deploy en Vercel

```bash
# 1. Push a GitHub
git push origin main

# 2. Conecta con Vercel
# - Importa repo
# - Agrega variables de entorno
# - Deploy automático
```

---

## 📊 Métricas del Proyecto

- **Líneas de código**: ~5,000
- **Componentes**: 25+
- **Páginas**: 8
- **Hooks personalizados**: 6
- **Tablas en BD**: 5
- **Tiempo de desarrollo**: 8 horas

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/Nueva`)
3. Commit (`git commit -m 'Add: Nueva característica'`)
4. Push (`git push origin feature/Nueva`)
5. Pull Request

---

## 📝 Licencia

MIT License - Ver `LICENSE`

---

## 👨‍💻 Autor

**Mateo Puga**
- Email: mateopuga75@gmail.com
- Proyecto: Nexus Enterprise Platform

---

## 🙏 Agradecimientos

- Next.js por el framework
- Supabase por el backend
- Recharts por los gráficos
- Tailwind CSS por los estilos

---

<div align="center">

**⭐ Dale una estrella si te gustó el proyecto ⭐**

Made with ❤️ and ☕ by Mateo Puga

**PROYECTO 100% COMPLETO** 🎉

</div>
