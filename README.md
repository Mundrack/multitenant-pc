# 🚀 Nexus Enterprise Platform

<div align="center">

![Nexus Logo](https://via.placeholder.com/200x80/F97316/FFFFFF?text=NEXUS)

**Plataforma SaaS Multi-Tenant para gestión organizacional empresarial**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Private-red)](LICENSE)

[Demo](https://demo.nexusplatform.com) · [Documentación](./docs) · [Reportar Bug](https://github.com/tu-usuario/nexus-enterprise/issues)

</div>

---

## 📋 Descripción

Sistema profesional de gestión multi-organizacional con arquitectura Snowflake, donde las empresas pueden gestionar equipos, tareas, comunicación interna y analytics de rendimiento. Producto white-label comercializable.

### ✨ Características Principales

- 🏢 **Gestión Organizacional**: Multi-tenant con aislamiento total de datos
- 👥 **Gestión de Usuarios**: 5 roles con control de acceso granular (RLS)
- ✅ **Sistema de Tareas**: Tracking automático con semáforo (verde/amarillo/rojo)
- 💬 **Mensajería Interna**: Chat 1:1 y grupal con real-time
- 📊 **Analytics**: Métricas de productividad y reportes exportables
- 🔐 **Seguridad Enterprise**: 2FA, encriptación, auditoría completa
- 🎨 **White-Label**: Branding personalizable por cliente
- 🔌 **API REST**: Completa para integraciones

---

## 🛠 Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router) + React 18
- **Lenguaje**: TypeScript 5+ (strict mode)
- **Estilos**: Tailwind CSS 3.4 + Shadcn/ui
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod

### Backend
- **BaaS**: Supabase (PostgreSQL 15+ + Auth + Storage + Realtime)
- **API**: Next.js API Routes + Server Actions
- **Email**: Resend / SendGrid

### Infraestructura
- **Hosting**: Vercel (Serverless)
- **Database**: Supabase Cloud
- **CDN**: Vercel Edge Network
- **Monitoring**: Sentry + Better Stack

---

## 🚀 Quick Start

### Prerequisitos

```bash
Node.js 18+ LTS
npm o yarn o pnpm
Cuenta de Supabase
Cuenta de Vercel (opcional para deploy)
```

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/nexus-enterprise.git
cd nexus-enterprise
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email
RESEND_API_KEY=tu_resend_key

# Encryption
ENCRYPTION_KEY=tu_encryption_key_32_bytes_hex
```

4. **Setup de base de datos**
- Ir a Supabase Dashboard → SQL Editor
- Ejecutar el archivo: `docs/DATABASE_SCHEMA.sql`

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```
nexus-enterprise/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/         # Dashboard principal
│   │   ├── tasks/
│   │   ├── messages/
│   │   ├── team/
│   │   └── analytics/
│   ├── admin/             # Panel Super Admin
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Shadcn)
│   └── features/         # Componentes de features
├── lib/                   # Lógica de negocio
│   ├── auth/             # Autenticación y permisos
│   ├── hooks/            # Custom hooks
│   ├── supabase/         # Cliente Supabase
│   └── utils/            # Utilidades
├── docs/                  # Documentación completa
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.sql
│   ├── DESIGN_SYSTEM.md
│   ├── ROLES_PERMISSIONS.md
│   └── ...
├── public/                # Assets estáticos
└── tests/                 # Tests
```

---

## 📚 Documentación

Documentación completa disponible en la carpeta `/docs`:

- [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) - Arquitectura técnica detallada
- [**DATABASE_SCHEMA.sql**](./docs/DATABASE_SCHEMA.sql) - Esquema completo de BD
- [**DESIGN_SYSTEM.md**](./docs/DESIGN_SYSTEM.md) - Sistema de diseño y UI
- [**ROLES_PERMISSIONS.md**](./docs/ROLES_PERMISSIONS.md) - Roles y permisos
- [**MODULES.md**](./docs/MODULES.md) - Módulos funcionales
- [**SECURITY.md**](./docs/SECURITY.md) - Seguridad y compliance
- [**API_DOCUMENTATION.md**](./docs/API_DOCUMENTATION.md) - API pública
- [**ROADMAP.md**](./docs/ROADMAP.md) - Plan de implementación
- [**DEPLOYMENT.md**](./docs/DEPLOYMENT.md) - Guía de deployment

---

## 🔑 Roles del Sistema

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Super Admin** | Control total del sistema | Gestiona todos los tenants y organizaciones |
| **Owner** | Dueño de organización | Control total de su organización |
| **Admin** | Administrador | Gestión operativa, sin config críticas |
| **Manager** | Líder de equipo | Gestiona su equipo directo |
| **Member** | Usuario base | Ve sus tareas y actualiza progreso |

---

## 🎨 Paleta de Colores

```css
/* Primario - Naranja */
--primary-500: #F97316;

/* Secundario - Teal */
--secondary-500: #14B8A6;

/* Semánticos */
--success: #22C55E;
--warning: #F59E0B;
--danger: #EF4444;
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🚢 Deployment

### Vercel (Recomendado)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Ver guía completa: [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

## 📊 Roadmap

- [x] **Fase 1**: Fundamentos (Semanas 1-4) ✅
- [ ] **Fase 2**: Core Features (Semanas 5-10) 🚧
- [ ] **Fase 3**: Features Avanzadas (Semanas 11-16)
- [ ] **Fase 4**: White-Label & Admin (Semanas 17-19)
- [ ] **Fase 5**: Testing & Launch (Semanas 20-21)

Ver roadmap completo: [ROADMAP.md](./docs/ROADMAP.md)

---

## 🤝 Contribución

Este es un proyecto privado/comercial. Las contribuciones están limitadas al equipo interno.

### Workflow de Desarrollo

1. Crear branch desde `develop`: `git checkout -b feature/nueva-feature`
2. Commits siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
3. Push y crear Pull Request
4. Code review requerido
5. Merge a `develop`
6. Deploy a staging para testing
7. Merge a `main` para producción

---

## 📄 Licencia

Propiedad privada. Todos los derechos reservados.

---

## 📧 Contacto

- **Email**: support@nexusplatform.com
- **Website**: https://nexusplatform.com
- **Docs**: https://docs.nexusplatform.com

---

<div align="center">

**Construido con ❤️ para empresas modernas**

⭐ Si te gusta el proyecto, danos una estrella

</div>

---

## 📝 Changelog

### v1.0.0 (2024-11-19)
- 🎉 Initial release
- ✅ Autenticación completa
- ✅ Sistema de roles y permisos
- ✅ Gestión de usuarios
- ✅ Sistema de invitaciones

---

## 🔒 Seguridad

Si encuentras una vulnerabilidad de seguridad, por favor envía un email a security@nexusplatform.com en lugar de usar el issue tracker.

---

## 💡 Tips para Desarrollo

```bash
# Limpiar cache
npm run clean

# Rebuild
npm run build

# Analizar bundle
npm run analyze

# Format code
npm run format

# Lint
npm run lint
```

---

**Última actualización**: Noviembre 2024  
**Versión**: 1.0.0
