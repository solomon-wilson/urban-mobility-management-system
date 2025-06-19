-- Create custom types
CREATE TYPE user_role AS ENUM ('operator', 'admin', 'inspector');
CREATE TYPE license_status AS ENUM ('active', 'pending', 'expired', 'suspended');
CREATE TYPE inspection_status AS ENUM ('passed', 'failed', 'pending');
CREATE TYPE violation_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE violation_status AS ENUM ('unresolved', 'in_review', 'resolved');
CREATE TYPE penalty_status AS ENUM ('pending', 'paid', 'overdue', 'waived');
CREATE TYPE document_status AS ENUM ('pending_review', 'approved', 'rejected');
CREATE TYPE asset_type AS ENUM ('bus_stop', 'terminal', 'depot', 'maintenance_facility', 'fuel_station');
CREATE TYPE vehicle_status AS ENUM ('active', 'maintenance', 'out_of_service', 'decommissioned');

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role NOT NULL DEFAULT 'operator',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create operators table
CREATE TABLE IF NOT EXISTS public.operators (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    operator_name TEXT NOT NULL,
    license_number TEXT UNIQUE NOT NULL,
    license_status license_status DEFAULT 'pending',
    license_issue_date DATE,
    license_expiry_date DATE,
    contact_email TEXT,
    contact_phone TEXT,
    address TEXT,
    compliance_score INTEGER DEFAULT 0 CHECK (compliance_score >= 0 AND compliance_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    vehicle_registration TEXT UNIQUE NOT NULL,
    vehicle_type TEXT NOT NULL,
    make TEXT,
    model TEXT,
    year INTEGER,
    capacity INTEGER,
    status vehicle_status DEFAULT 'active',
    last_inspection_date DATE,
    next_inspection_due DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inspections table
CREATE TABLE IF NOT EXISTS public.inspections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    inspection_number TEXT UNIQUE NOT NULL,
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    inspector_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    inspection_type TEXT NOT NULL,
    inspection_date DATE NOT NULL,
    status inspection_status DEFAULT 'pending',
    checklist_items JSONB DEFAULT '[]',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create violations table
CREATE TABLE IF NOT EXISTS public.violations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    violation_number TEXT UNIQUE NOT NULL,
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    inspection_id UUID REFERENCES public.inspections(id) ON DELETE SET NULL,
    violation_type TEXT NOT NULL,
    description TEXT,
    severity violation_severity NOT NULL,
    status violation_status DEFAULT 'unresolved',
    violation_date DATE NOT NULL,
    resolution_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create penalties table
CREATE TABLE IF NOT EXISTS public.penalties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    penalty_number TEXT UNIQUE NOT NULL,
    violation_id UUID REFERENCES public.violations(id) ON DELETE CASCADE,
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    status penalty_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    inspection_id UUID REFERENCES public.inspections(id) ON DELETE SET NULL,
    violation_id UUID REFERENCES public.violations(id) ON DELETE SET NULL,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_path TEXT,
    file_size INTEGER,
    mime_type TEXT,
    status document_status DEFAULT 'pending_review',
    uploaded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table (for mapping system)
CREATE TABLE IF NOT EXISTS public.assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    asset_name TEXT NOT NULL,
    asset_type asset_type NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    description TEXT,
    capacity INTEGER,
    operational_status BOOLEAN DEFAULT true,
    operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    due_date DATE,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for all tables
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table operators;
alter publication supabase_realtime add table vehicles;
alter publication supabase_realtime add table inspections;
alter publication supabase_realtime add table violations;
alter publication supabase_realtime add table penalties;
alter publication supabase_realtime add table documents;
alter publication supabase_realtime add table assets;
alter publication supabase_realtime add table notifications;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_operators_user_id ON public.operators(user_id);
CREATE INDEX IF NOT EXISTS idx_operators_license_number ON public.operators(license_number);
CREATE INDEX IF NOT EXISTS idx_vehicles_operator_id ON public.vehicles(operator_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_registration ON public.vehicles(vehicle_registration);
CREATE INDEX IF NOT EXISTS idx_inspections_operator_id ON public.inspections(operator_id);
CREATE INDEX IF NOT EXISTS idx_inspections_vehicle_id ON public.inspections(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_violations_operator_id ON public.violations(operator_id);
CREATE INDEX IF NOT EXISTS idx_penalties_operator_id ON public.penalties(operator_id);
CREATE INDEX IF NOT EXISTS idx_documents_operator_id ON public.documents(operator_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_assets_location ON public.assets(latitude, longitude);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON public.operators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspections_updated_at BEFORE UPDATE ON public.inspections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_violations_updated_at BEFORE UPDATE ON public.violations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_penalties_updated_at BEFORE UPDATE ON public.penalties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON public.assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
