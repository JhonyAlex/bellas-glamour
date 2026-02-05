-- Otorgar permisos a roles anon y authenticated
-- Modelos
GRANT SELECT ON models TO anon;
GRANT ALL ON models TO authenticated;

-- Clientes
GRANT SELECT ON clients TO anon;
GRANT ALL ON clients TO authenticated;

-- Fotos de modelos
GRANT SELECT ON model_photos TO anon;
GRANT ALL ON model_photos TO authenticated;

-- Mensajes
GRANT SELECT ON messages TO anon;
GRANT ALL ON messages TO authenticated;

-- Favoritos
GRANT SELECT ON favorites TO anon;
GRANT ALL ON favorites TO authenticated;

-- Verificar permisos actuales
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND grantee IN ('anon', 'authenticated') 
ORDER BY table_name, grantee;