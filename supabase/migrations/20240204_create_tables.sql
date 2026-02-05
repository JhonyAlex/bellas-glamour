-- Tabla de modelos
CREATE TABLE models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    artistic_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    age INTEGER CHECK (age >= 18 AND age <= 65),
    nationality VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    height_cm INTEGER CHECK (height_cm >= 150 AND height_cm <= 220),
    measurements JSONB DEFAULT '{"bust": 0, "waist": 0, "hips": 0}',
    hair_color VARCHAR(30),
    eye_color VARCHAR(30),
    skin_tone VARCHAR(30),
    special_features TEXT[],
    languages TEXT[],
    experience_years INTEGER DEFAULT 0,
    about TEXT,
    availability JSONB DEFAULT '{"weekdays": true, "weekends": false, "travel": false}',
    social_media JSONB,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de clientes/empresas
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    industry VARCHAR(100) NOT NULL,
    company_size VARCHAR(20) CHECK (company_size IN ('startup', 'small', 'medium', 'large')),
    location VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    social_media JSONB,
    about TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de fotos de modelos
CREATE TABLE model_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID REFERENCES models(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(30) CHECK (category IN ('headshot', 'full_body', 'portrait', 'editorial', 'swimwear', 'lingerie', 'commercial')),
    is_primary BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes/contacto
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT different_users CHECK (sender_id != receiver_id)
);

-- Tabla de favoritos
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    model_id UUID REFERENCES models(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, model_id)
);

-- Índices para búsquedas optimizadas
CREATE INDEX idx_models_age ON models(age);
CREATE INDEX idx_models_height ON models(height_cm);
CREATE INDEX idx_models_nationality ON models(nationality);
CREATE INDEX idx_models_location ON models(location);
CREATE INDEX idx_models_status ON models(status);
CREATE INDEX idx_models_featured ON models(is_featured);
CREATE INDEX idx_models_verified ON models(is_verified);
CREATE INDEX idx_model_photos_model ON model_photos(model_id);
CREATE INDEX idx_model_photos_category ON model_photos(category);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_favorites_client ON favorites(client_id);
CREATE INDEX idx_favorites_model ON favorites(model_id);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON models
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();