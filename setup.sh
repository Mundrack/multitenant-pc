#!/bin/bash

# ============================================
# NEXUS ENTERPRISE PLATFORM - Setup Script
# ============================================

echo "🚀 Iniciando setup de Nexus Enterprise Platform..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Crear estructura de carpetas
echo -e "${BLUE}📁 Creando estructura de carpetas...${NC}"

mkdir -p app/{(auth)/{login,register,forgot-password,reset-password,confirm-email},dashboard/{tasks,messages,team,analytics,organization,profile},admin,api/{auth,users,tasks,messages,organizations,analytics}}
mkdir -p components/{ui,features/{auth,tasks,messages,team,analytics,dashboard}}
mkdir -p lib/{auth,supabase,hooks,utils,types,security}
mkdir -p public/{images,icons}
mkdir -p docs
mkdir -p tests/{unit,integration,e2e}
mkdir -p types
mkdir -p config
mkdir -p hooks

echo -e "${GREEN}✅ Estructura de carpetas creada${NC}"

# Crear archivos esenciales
echo -e "${BLUE}📝 Creando archivos esenciales...${NC}"

# Global CSS
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24.6 95% 53.1%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 172.5 66% 50.4%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
EOF

# Root layout
cat > app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexus Enterprise Platform',
  description: 'Plataforma SaaS Multi-Tenant para gestión organizacional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
EOF

# Root page
cat > app/page.tsx << 'EOF'
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
}
EOF

# Lib utils
cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# Supabase client
cat > lib/supabase/client.ts << 'EOF'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();
EOF

echo -e "${GREEN}✅ Archivos esenciales creados${NC}"

# Crear .env.local desde .env.example
echo -e "${BLUE}🔐 Creando .env.local...${NC}"
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo -e "${YELLOW}⚠️  Recuerda configurar tus variables de entorno en .env.local${NC}"
else
  echo -e "${YELLOW}⚠️  .env.local ya existe, no se sobrescribió${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup completado!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos pasos:${NC}"
echo "1. npm install - Instalar dependencias"
echo "2. Configurar .env.local con tus credenciales de Supabase"
echo "3. Ejecutar el schema SQL en Supabase Dashboard"
echo "4. npm run dev - Iniciar servidor de desarrollo"
echo ""
echo -e "${GREEN}🚀 ¡Listo para desarrollar!${NC}"
