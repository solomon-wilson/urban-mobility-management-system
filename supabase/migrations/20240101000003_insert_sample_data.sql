-- Insert sample admin user (this would typically be done through auth, but for demo purposes)
-- Note: In production, users should be created through Supabase Auth

-- Insert sample operators
INSERT INTO public.operators (id, operator_name, license_number, license_status, license_issue_date, license_expiry_date, contact_email, contact_phone, address, compliance_score) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sierra Transport Ltd', 'PTL-2023-0042', 'active', '2023-01-15', '2024-12-31', 'contact@sierratransport.com', '+232-76-123456', '15 Wilkinson Road, Freetown', 87),
('550e8400-e29b-41d4-a716-446655440002', 'Mountain Express Services', 'PTL-2023-0043', 'active', '2023-02-20', '2024-11-30', 'info@mountainexpress.sl', '+232-77-234567', '22 Kissy Street, Freetown', 92),
('550e8400-e29b-41d4-a716-446655440003', 'Coastal Bus Company', 'PTL-2023-0044', 'pending', '2023-03-10', '2024-10-15', 'admin@coastalbus.sl', '+232-78-345678', '8 Lumley Beach Road, Freetown', 65);

-- Insert sample vehicles
INSERT INTO public.vehicles (operator_id, vehicle_registration, vehicle_type, make, model, year, capacity, status, last_inspection_date, next_inspection_due) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'SL-FT-1234', 'Bus', 'Mercedes-Benz', 'Sprinter', 2020, 25, 'active', '2024-05-15', '2024-11-15'),
('550e8400-e29b-41d4-a716-446655440001', 'SL-FT-1235', 'Bus', 'Toyota', 'Coaster', 2019, 30, 'active', '2024-04-20', '2024-10-20'),
('550e8400-e29b-41d4-a716-446655440001', 'SL-FT-1236', 'Minibus', 'Nissan', 'Urvan', 2021, 14, 'maintenance', '2024-03-10', '2024-09-10'),
('550e8400-e29b-41d4-a716-446655440002', 'SL-FT-2001', 'Bus', 'Isuzu', 'NPR', 2022, 35, 'active', '2024-06-01', '2024-12-01'),
('550e8400-e29b-41d4-a716-446655440002', 'SL-FT-2002', 'Bus', 'Mercedes-Benz', 'Atego', 2020, 40, 'active', '2024-05-25', '2024-11-25');

-- Insert sample inspections
INSERT INTO public.inspections (inspection_number, operator_id, vehicle_id, inspection_type, inspection_date, status, notes) VALUES
('INS-2024-001', '550e8400-e29b-41d4-a716-446655440001', (SELECT id FROM public.vehicles WHERE vehicle_registration = 'SL-FT-1234'), 'Safety Compliance', '2024-06-15', 'passed', 'All safety systems functioning properly'),
('INS-2024-002', '550e8400-e29b-41d4-a716-446655440002', (SELECT id FROM public.vehicles WHERE vehicle_registration = 'SL-FT-2001'), 'Environmental Standards', '2024-05-22', 'failed', 'Emissions levels exceed permitted limits'),
('INS-2024-003', '550e8400-e29b-41d4-a716-446655440001', (SELECT id FROM public.vehicles WHERE vehicle_registration = 'SL-FT-1235'), 'Operational Review', '2024-04-10', 'passed', 'Vehicle meets operational standards');

-- Insert sample violations
INSERT INTO public.violations (violation_number, operator_id, vehicle_id, violation_type, description, severity, status, violation_date) VALUES
('VIO-2024-001', '550e8400-e29b-41d4-a716-446655440001', (SELECT id FROM public.vehicles WHERE vehicle_registration = 'SL-FT-1234'), 'Expired License', 'Vehicle operating with expired registration', 'high', 'resolved', '2024-04-10'),
('VIO-2024-002', '550e8400-e29b-41d4-a716-446655440002', (SELECT id FROM public.vehicles WHERE vehicle_registration = 'SL-FT-2001'), 'Missing Documentation', 'Insurance certificate not available during inspection', 'medium', 'in_review', '2024-05-22'),
('VIO-2024-003', '550e8400-e29b-41d4-a716-446655440003', NULL, 'Safety Violation', 'Driver operating without valid license', 'critical', 'unresolved', '2024-06-15');

-- Insert sample penalties
INSERT INTO public.penalties (penalty_number, violation_id, operator_id, amount, issue_date, due_date, status) VALUES
('PEN-2024-001', (SELECT id FROM public.violations WHERE violation_number = 'VIO-2024-001'), '550e8400-e29b-41d4-a716-446655440001', 500.00, '2024-04-15', '2024-05-15', 'paid'),
('PEN-2024-002', (SELECT id FROM public.violations WHERE violation_number = 'VIO-2024-002'), '550e8400-e29b-41d4-a716-446655440002', 250.00, '2024-05-25', '2024-06-25', 'overdue'),
('PEN-2024-003', (SELECT id FROM public.violations WHERE violation_number = 'VIO-2024-003'), '550e8400-e29b-41d4-a716-446655440003', 1000.00, '2024-06-20', '2024-07-20', 'pending');

-- Insert sample assets (transport infrastructure)
INSERT INTO public.assets (asset_name, asset_type, latitude, longitude, address, description, capacity, operational_status) VALUES
('Freetown Central Bus Terminal', 'terminal', 8.4840, -13.2299, 'Siaka Stevens Street, Freetown', 'Main bus terminal serving central Freetown routes', 200, true),
('Kissy Bus Stop', 'bus_stop', 8.4656, -13.2317, 'Kissy Street, Freetown', 'Major bus stop in Kissy area', 50, true),
('Lumley Beach Bus Stop', 'bus_stop', 8.4200, -13.2800, 'Lumley Beach Road, Freetown', 'Bus stop serving beach area', 30, true),
('Mountain Transport Depot', 'depot', 8.5000, -13.2000, 'Hill Station Road, Freetown', 'Vehicle maintenance and storage facility', 100, true),
('Fuel Station - Wellington', 'fuel_station', 8.4500, -13.1800, 'Wellington Road, Freetown', 'Fuel station for public transport vehicles', 20, true);

-- Insert sample notifications
INSERT INTO public.notifications (operator_id, title, description, priority, due_date) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'License Renewal', 'Your operator license will expire in 45 days', 'medium', '2024-12-31'),
('550e8400-e29b-41d4-a716-446655440001', 'Vehicle Inspection Due', '5 vehicles require annual safety inspection', 'high', '2024-08-15'),
('550e8400-e29b-41d4-a716-446655440002', 'Insurance Renewal', 'Fleet insurance policy renewal', 'medium', '2024-09-30'),
('550e8400-e29b-41d4-a716-446655440003', 'Penalty Payment', 'Outstanding penalty payment due', 'high', '2024-07-20');
