-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.penalties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
    RETURN (SELECT role FROM public.users WHERE id = user_uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user's operator_id
CREATE OR REPLACE FUNCTION get_user_operator_id(user_uuid UUID)
RETURNS UUID AS $$
BEGIN
    RETURN (SELECT id FROM public.operators WHERE user_id = user_uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- USERS table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users"
ON public.users FOR SELECT
USING (get_user_role(auth.uid()) = 'admin');

DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
CREATE POLICY "Admins can manage all users"
ON public.users FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- OPERATORS table policies
DROP POLICY IF EXISTS "Operators can view their own data" ON public.operators;
CREATE POLICY "Operators can view their own data"
ON public.operators FOR SELECT
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Operators can update their own data" ON public.operators;
CREATE POLICY "Operators can update their own data"
ON public.operators FOR UPDATE
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins and inspectors can view all operators" ON public.operators;
CREATE POLICY "Admins and inspectors can view all operators"
ON public.operators FOR SELECT
USING (get_user_role(auth.uid()) IN ('admin', 'inspector'));

DROP POLICY IF EXISTS "Admins can manage all operators" ON public.operators;
CREATE POLICY "Admins can manage all operators"
ON public.operators FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- VEHICLES table policies
DROP POLICY IF EXISTS "Operators can view their own vehicles" ON public.vehicles;
CREATE POLICY "Operators can view their own vehicles"
ON public.vehicles FOR SELECT
USING (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Operators can manage their own vehicles" ON public.vehicles;
CREATE POLICY "Operators can manage their own vehicles"
ON public.vehicles FOR ALL
USING (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Admins and inspectors can view all vehicles" ON public.vehicles;
CREATE POLICY "Admins and inspectors can view all vehicles"
ON public.vehicles FOR SELECT
USING (get_user_role(auth.uid()) IN ('admin', 'inspector'));

DROP POLICY IF EXISTS "Admins can manage all vehicles" ON public.vehicles;
CREATE POLICY "Admins can manage all vehicles"
ON public.vehicles FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- INSPECTIONS table policies
DROP POLICY IF EXISTS "Operators can view their own inspections" ON public.inspections;
CREATE POLICY "Operators can view their own inspections"
ON public.inspections FOR SELECT
USING (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Inspectors can view all inspections" ON public.inspections;
CREATE POLICY "Inspectors can view all inspections"
ON public.inspections FOR SELECT
USING (get_user_role(auth.uid()) = 'inspector');

DROP POLICY IF EXISTS "Inspectors can create and update inspections" ON public.inspections;
CREATE POLICY "Inspectors can create and update inspections"
ON public.inspections FOR ALL
USING (get_user_role(auth.uid()) = 'inspector');

DROP POLICY IF EXISTS "Admins can manage all inspections" ON public.inspections;
CREATE POLICY "Admins can manage all inspections"
ON public.inspections FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- VIOLATIONS table policies
DROP POLICY IF EXISTS "Operators can view their own violations" ON public.violations;
CREATE POLICY "Operators can view their own violations"
ON public.violations FOR SELECT
USING (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Inspectors can view and create violations" ON public.violations;
CREATE POLICY "Inspectors can view and create violations"
ON public.violations FOR ALL
USING (get_user_role(auth.uid()) = 'inspector');

DROP POLICY IF EXISTS "Admins can manage all violations" ON public.violations;
CREATE POLICY "Admins can manage all violations"
ON public.violations FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- PENALTIES table policies
DROP POLICY IF EXISTS "Operators can view their own penalties" ON public.penalties;
CREATE POLICY "Operators can view their own penalties"
ON public.penalties FOR SELECT
USING (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Operators can update penalty payment status" ON public.penalties;
CREATE POLICY "Operators can update penalty payment status"
ON public.penalties FOR UPDATE
USING (operator_id = get_user_operator_id(auth.uid()))
WITH CHECK (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Admins and inspectors can manage penalties" ON public.penalties;
CREATE POLICY "Admins and inspectors can manage penalties"
ON public.penalties FOR ALL
USING (get_user_role(auth.uid()) IN ('admin', 'inspector'));

-- DOCUMENTS table policies
DROP POLICY IF EXISTS "Operators can view their own documents" ON public.documents;
CREATE POLICY "Operators can view their own documents"
ON public.documents FOR SELECT
USING (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Operators can upload documents" ON public.documents;
CREATE POLICY "Operators can upload documents"
ON public.documents FOR INSERT
WITH CHECK (operator_id = get_user_operator_id(auth.uid()));

DROP POLICY IF EXISTS "Admins and inspectors can view all documents" ON public.documents;
CREATE POLICY "Admins and inspectors can view all documents"
ON public.documents FOR SELECT
USING (get_user_role(auth.uid()) IN ('admin', 'inspector'));

DROP POLICY IF EXISTS "Admins and inspectors can manage documents" ON public.documents;
CREATE POLICY "Admins and inspectors can manage documents"
ON public.documents FOR ALL
USING (get_user_role(auth.uid()) IN ('admin', 'inspector'));

-- ASSETS table policies
DROP POLICY IF EXISTS "All authenticated users can view assets" ON public.assets;
CREATE POLICY "All authenticated users can view assets"
ON public.assets FOR SELECT
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Operators can view assets" ON public.assets;
CREATE POLICY "Operators can view assets"
ON public.assets FOR SELECT
USING (get_user_role(auth.uid()) = 'operator');

DROP POLICY IF EXISTS "Admins can manage all assets" ON public.assets;
CREATE POLICY "Admins can manage all assets"
ON public.assets FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- NOTIFICATIONS table policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all notifications" ON public.notifications;
CREATE POLICY "Admins can manage all notifications"
ON public.notifications FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- AUDIT_LOGS table policies
DROP POLICY IF EXISTS "Only admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (get_user_role(auth.uid()) = 'admin');

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (true);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO public.audit_logs (user_id, table_name, record_id, action, old_values)
        VALUES (auth.uid(), TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO public.audit_logs (user_id, table_name, record_id, action, old_values, new_values)
        VALUES (auth.uid(), TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO public.audit_logs (user_id, table_name, record_id, action, new_values)
        VALUES (auth.uid(), TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers for important tables
CREATE TRIGGER audit_operators_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.operators
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_vehicles_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.vehicles
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_inspections_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.inspections
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_violations_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.violations
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_penalties_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.penalties
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
