-- Habilitar RLS en todas las tablas
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para tabla models
-- Permitir lectura pública de modelos activos y verificados
CREATE POLICY "Models can be viewed by everyone" ON models
    FOR SELECT USING (status = 'active' AND is_verified = true);

-- Permitir a los modelos ver y actualizar su propio perfil
CREATE POLICY "Models can view own profile" ON models
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Models can update own profile" ON models
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Models can insert own profile" ON models
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para tabla clients
-- Permitir lectura pública de clientes verificados
CREATE POLICY "Clients can be viewed by everyone" ON clients
    FOR SELECT USING (status = 'active' AND is_verified = true);

-- Permitir a los clientes ver y actualizar su propio perfil
CREATE POLICY "Clients can view own profile" ON clients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clients can update own profile" ON clients
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Clients can insert own profile" ON clients
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para tabla model_photos
-- Permitir lectura pública de fotos aprobadas
CREATE POLICY "Approved photos can be viewed by everyone" ON model_photos
    FOR SELECT USING (is_approved = true);

-- Permitir a los modelos ver sus propias fotos
CREATE POLICY "Models can view own photos" ON model_photos
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM models 
        WHERE models.id = model_photos.model_id 
        AND models.user_id = auth.uid()
    ));

-- Permitir a los modelos insertar fotos de su perfil
CREATE POLICY "Models can insert own photos" ON model_photos
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM models 
        WHERE models.id = model_photos.model_id 
        AND models.user_id = auth.uid()
    ));

-- Permitir a los modelos actualizar sus propias fotos
CREATE POLICY "Models can update own photos" ON model_photos
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM models 
        WHERE models.id = model_photos.model_id 
        AND models.user_id = auth.uid()
    ));

-- Políticas para tabla messages
-- Permitir a los usuarios ver sus mensajes enviados y recibidos
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Permitir a los usuarios enviar mensajes
CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Permitir a los usuarios actualizar el estado de lectura de mensajes recibidos
CREATE POLICY "Users can update message read status" ON messages
    FOR UPDATE USING (auth.uid() = receiver_id)
    WITH CHECK (is_read IS NOT NULL);

-- Políticas para tabla favorites
-- Permitir a los clientes ver sus favoritos
CREATE POLICY "Clients can view own favorites" ON favorites
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM clients 
        WHERE clients.id = favorites.client_id 
        AND clients.user_id = auth.uid()
    ));

-- Permitir a los clientes agregar favoritos
CREATE POLICY "Clients can add favorites" ON favorites
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM clients 
        WHERE clients.id = favorites.client_id 
        AND clients.user_id = auth.uid()
    ));

-- Permitir a los clientes eliminar sus favoritos
CREATE POLICY "Clients can remove own favorites" ON favorites
    FOR DELETE USING (EXISTS (
        SELECT 1 FROM clients 
        WHERE clients.id = favorites.client_id 
        AND clients.user_id = auth.uid()
    ));