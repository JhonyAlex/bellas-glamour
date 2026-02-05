-- Insertar datos de ejemplo para modelos (sin user_id para demo)
INSERT INTO models (
  artistic_name, first_name, last_name, email, age, nationality, location, 
  height_cm, measurements, hair_color, eye_color, skin_tone, special_features, 
  languages, experience_years, about, availability, is_verified, is_featured, status
) VALUES 
(
  'Valentina Rouge',
  'Valentina', 
  'Rodriguez',
  'valentina@bellasglamour.com',
  24,
  'Española',
  'Madrid, España',
  178,
  '{"bust": 90, "waist": 62, "hips": 92}',
  'Castaño',
  'Marrón',
  'Media',
  '{"Labios carnosos", "Pómulos altos"}',
  '{"Español", "Inglés", "Francés"}',
  3,
  'Modelo profesional con experiencia en pasarelas internacionales. Especializada en moda alta costura y editoriales de lujo.',
  '{"weekdays": true, "weekends": true, "travel": true}',
  true,
  true,
  'active'
),
(
  'Sofia Noche',
  'Sofia',
  'Garcia',
  'sofia@bellasglamour.com',
  22,
  'Española',
  'Barcelona, España',
  175,
  '{"bust": 88, "waist": 60, "hips": 90}',
  'Rubio',
  'Azul',
  'Clara',
  '{"Ojos grandes", "Cabello largo"}',
  '{"Español", "Inglés", "Italiano"}',
  2,
  'Modelo joven con presencia fresca y natural. Experiencia en publicidad y comerciales de belleza.',
  '{"weekdays": true, "weekends": false, "travel": false}',
  true,
  false,
  'active'
),
(
  'Isabella Luna',
  'Isabella',
  'Martinez',
  'isabella@bellasglamour.com',
  26,
  'Mexicana',
  'Ciudad de México, México',
  172,
  '{"bust": 85, "waist": 58, "hips": 88}',
  'Negro',
  'Verde',
  'Morena',
  '{"Piel radiante", "Cabello lustroso"}',
  '{"Español", "Inglés", "Portugués"}',
  4,
  'Modelo internacional con base en México. Experiencia en moda latina y mercados emergentes.',
  '{"weekdays": true, "weekends": true, "travel": true}',
  true,
  true,
  'active'
),
(
  'Carmen Estrella',
  'Carmen',
  'Lopez',
  'carmen@bellasglamour.com',
  28,
  'Argentina',
  'Buenos Aires, Argentina',
  180,
  '{"bust": 92, "waist": 64, "hips": 94}',
  'Castaño Oscuro',
  'Marrón Oscuro',
  'Bronceada',
  '{"Estatura imponente", "Presencia escénica"}',
  '{"Español", "Inglés", "Italiano"}',
  6,
  'Top model argentina con experiencia en París y Milán. Especializada en alta costura y desfiles internacionales.',
  '{"weekdays": true, "weekends": false, "travel": true}',
  true,
  false,
  'active'
),
(
  'Valeria Sol',
  'Valeria',
  'Hernandez',
  'valeria@bellasglamour.com',
  25,
  'Colombiana',
  'Medellín, Colombia',
  176,
  '{"bust": 89, "waist": 61, "hips": 91}',
  'Rubio Dorado',
  'Avellana',
  'Dorada',
  '{"Sonrisa radiante", "Energía vibrante"}',
  '{"Español", "Inglés"}',
  3,
  'Modelo colombiana con ascendencia europea. Combinación perfecta de belleza latina y estilo internacional.',
  '{"weekdays": true, "weekends": true, "travel": false}',
  true,
  true,
  'active'
);

-- Insertar datos de ejemplo para clientes (sin user_id para demo)
INSERT INTO clients (
  company_name, contact_name, email, phone, industry, company_size, 
  location, website, about, is_verified, status
) VALUES 
(
  'Elite Fashion Agency',
  'Carlos Rodriguez',
  'carlos@elitefashion.com',
  '+34 91 234 5678',
  'Agencia de Modelos',
  'medium',
  'Madrid, España',
  'https://elitefashion.com',
  'Agencia de modelos líder en España, representando talento internacional para campañas de lujo y pasarelas.',
  true,
  'active'
),
(
  'Luxury Brands International',
  'Maria Gonzalez',
  'maria@luxurybrands.com',
  '+34 93 876 5432',
  'Publicidad y Marketing',
  'large',
  'Barcelona, España',
  'https://luxurybrands.com',
  'Empresa internacional especializada en campañas publicitarias para marcas de lujo y lifestyle.',
  true,
  'active'
),
(
  'Vogue Productions',
  'Ana Martinez',
  'ana@vogueproductions.com',
  '+1 555 123 4567',
  'Producción Editorial',
  'small',
  'Nueva York, USA',
  'https://vogueproductions.com',
  'Productora especializada en editoriales de moda y contenido visual de alta gama.',
  true,
  'active'
);

-- Insertar fotos de ejemplo para los modelos
INSERT INTO model_photos (model_id, photo_url, thumbnail_url, category, is_primary, is_approved) VALUES
(
  (SELECT id FROM models WHERE artistic_name = 'Valentina Rouge'),
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'portrait',
  true,
  true
),
(
  (SELECT id FROM models WHERE artistic_name = 'Valentina Rouge'),
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'full_body',
  false,
  true
),
(
  (SELECT id FROM models WHERE artistic_name = 'Sofia Noche'),
  'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'portrait',
  true,
  true
),
(
  (SELECT id FROM models WHERE artistic_name = 'Isabella Luna'),
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'portrait',
  true,
  true
),
(
  (SELECT id FROM models WHERE artistic_name = 'Carmen Estrella'),
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'portrait',
  true,
  true
),
(
  (SELECT id FROM models WHERE artistic_name = 'Valeria Sol'),
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'portrait',
  true,
  true
);