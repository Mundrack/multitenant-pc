-- ============================================
-- SCRIPT: Agregar Sub-Organizaciones
-- ============================================

-- PASO 1: Crear tabla de sub-organizaciones si no existe
CREATE TABLE IF NOT EXISTS dim_sub_organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_organization_id UUID NOT NULL REFERENCES dim_organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    level INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    manager_id UUID REFERENCES dim_users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(parent_organization_id, name)
);

-- PASO 2: Agregar índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_sub_orgs_parent ON dim_sub_organizations(parent_organization_id);
CREATE INDEX IF NOT EXISTS idx_sub_orgs_manager ON dim_sub_organizations(manager_id);
CREATE INDEX IF NOT EXISTS idx_sub_orgs_active ON dim_sub_organizations(is_active);

-- PASO 3: Agregar sub_organization_id a fact_tasks si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'fact_tasks' AND column_name = 'sub_organization_id'
    ) THEN
        ALTER TABLE fact_tasks 
        ADD COLUMN sub_organization_id UUID REFERENCES dim_sub_organizations(id);
        
        CREATE INDEX idx_tasks_sub_org ON fact_tasks(sub_organization_id);
    END IF;
END $$;

-- PASO 4: Agregar sub_organization_id a fact_memberships si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'fact_memberships' AND column_name = 'sub_organization_id'
    ) THEN
        ALTER TABLE fact_memberships 
        ADD COLUMN sub_organization_id UUID REFERENCES dim_sub_organizations(id);
        
        CREATE INDEX idx_memberships_sub_org ON fact_memberships(sub_organization_id);
    END IF;
END $$;

-- PASO 5: Función para obtener jerarquía completa
CREATE OR REPLACE FUNCTION get_organization_hierarchy(org_id UUID)
RETURNS TABLE(
    id UUID,
    name VARCHAR,
    level INTEGER,
    parent_id UUID,
    path TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE org_tree AS (
        -- Organización raíz
        SELECT 
            o.id,
            o.name::VARCHAR,
            0 as level,
            NULL::UUID as parent_id,
            o.name::TEXT as path
        FROM dim_organizations o
        WHERE o.id = org_id
        
        UNION ALL
        
        -- Sub-organizaciones
        SELECT 
            s.id,
            s.name::VARCHAR,
            s.level,
            s.parent_organization_id as parent_id,
            (ot.path || ' > ' || s.name)::TEXT as path
        FROM dim_sub_organizations s
        INNER JOIN org_tree ot ON s.parent_organization_id = ot.id OR ot.id = org_id
        WHERE s.is_active = true
    )
    SELECT * FROM org_tree ORDER BY level, name;
END;
$$ LANGUAGE plpgsql;

-- PASO 6: Verificar estructura
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'dim_sub_organizations'
ORDER BY ordinal_position;

-- Mensaje de éxito
DO $$
BEGIN
    RAISE NOTICE '✅ Sub-organizaciones configuradas correctamente';
END $$;
