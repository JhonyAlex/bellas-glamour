import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-application-name': 'bellas-glamour',
    },
  },
});

// Tipos de datos
export type UserRole = 'model' | 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Model {
  id: string;
  user_id: string;
  artistic_name: string;
  birth_date: string;
  nationality: string;
  height_cm: number;
  bust_cm: number;
  waist_cm: number;
  hips_cm: number;
  dress_size: string;
  shoe_size: number;
  eye_color: string;
  hair_color: string;
  distinctive_features: string;
  biography: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  search_vector?: string;
}

export interface Photo {
  id: string;
  model_id: string;
  user_id: string;
  url: string;
  is_approved: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  sender_id: string;
  recipient_model_id: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Funciones de utilidad
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const formatModelForDisplay = (model: Model & { photos?: Photo[] }) => {
  return {
    ...model,
    age: calculateAge(model.birth_date),
    mainPhoto: model.photos?.find(p => p.is_approved)?.url || null,
    allPhotos: model.photos?.filter(p => p.is_approved) || [],
  };
};

// Funciones de autenticación
export const signUp = async (email: string, password: string, role: UserRole, additionalData?: Partial<User>) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          ...additionalData,
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

// Funciones de base de datos
export const getApprovedModels = async (limit: number = 20, offset: number = 0) => {
  try {
    const { data, error } = await supabase
      .from('models')
      .select(`
        *,
        photos!inner(url, is_approved)
      `)
      .eq('status', 'approved')
      .eq('photos.is_approved', true)
      .limit(limit)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const searchModels = async (query: string, filters?: {
  age_min?: number;
  age_max?: number;
  height_min?: number;
  height_max?: number;
  nationality?: string;
  eye_color?: string;
  hair_color?: string;
}) => {
  try {
    let supabaseQuery = supabase
      .from('models')
      .select(`
        *,
        photos!inner(url, is_approved)
      `)
      .eq('status', 'approved')
      .eq('photos.is_approved', true);

    // Búsqueda de texto completo
    if (query) {
      supabaseQuery = supabaseQuery.textSearch('search_vector', query);
    }

    // Filtros adicionales
    if (filters) {
      if (filters.nationality) {
        supabaseQuery = supabaseQuery.eq('nationality', filters.nationality);
      }
      if (filters.eye_color) {
        supabaseQuery = supabaseQuery.eq('eye_color', filters.eye_color);
      }
      if (filters.hair_color) {
        supabaseQuery = supabaseQuery.eq('hair_color', filters.hair_color);
      }
      if (filters.age_min || filters.age_max) {
        // Para filtrar por edad, necesitamos calcular las fechas de nacimiento
        const today = new Date();
        if (filters.age_min) {
          const maxBirthDate = new Date(today.getFullYear() - filters.age_min, today.getMonth(), today.getDate());
          supabaseQuery = supabaseQuery.lte('birth_date', maxBirthDate.toISOString());
        }
        if (filters.age_max) {
          const minBirthDate = new Date(today.getFullYear() - filters.age_max - 1, today.getMonth(), today.getDate());
          supabaseQuery = supabaseQuery.gte('birth_date', minBirthDate.toISOString());
        }
      }
      if (filters.height_min) {
        supabaseQuery = supabaseQuery.gte('height_cm', filters.height_min);
      }
      if (filters.height_max) {
        supabaseQuery = supabaseQuery.lte('height_cm', filters.height_max);
      }
    }

    const { data, error } = await supabaseQuery.limit(50);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const uploadPhoto = async (file: File, modelId: string, userId: string) => {
  try {
    const fileName = `${modelId}/${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('model-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Crear registro en la tabla photos
    const { data: photoData, error: photoError } = await supabase
      .from('photos')
      .insert({
        model_id: modelId,
        user_id: userId,
        url: data.path,
        is_approved: false,
      });

    if (photoError) throw photoError;

    return { data: photoData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const sendContactMessage = async (senderId: string, recipientModelId: string, subject: string, message: string) => {
  try {
    // Verificar suscripción activa (rate limiting)
    const { data: existingMessages, error: checkError } = await supabase
      .from('contact_messages')
      .select('created_at')
      .eq('sender_id', senderId)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString()) // Última hora
      .limit(5);

    if (checkError) throw checkError;

    if (existingMessages && existingMessages.length >= 5) {
      throw new Error('Has alcanzado el límite de mensajes por hora');
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        sender_id: senderId,
        recipient_model_id: recipientModelId,
        subject,
        message,
        is_read: false,
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Funciones de administración
export const getPendingModels = async () => {
  try {
    const { data, error } = await supabase
      .from('models')
      .select(`
        *,
        photos(url, is_approved),
        users(email)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const approveModel = async (modelId: string) => {
  try {
    const { data, error } = await supabase
      .from('models')
      .update({ status: 'approved' })
      .eq('id', modelId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const rejectModel = async (modelId: string) => {
  try {
    const { data, error } = await supabase
      .from('models')
      .update({ status: 'rejected' })
      .eq('id', modelId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const approvePhoto = async (photoId: string) => {
  try {
    const { data, error } = await supabase
      .from('photos')
      .update({ is_approved: true })
      .eq('id', photoId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};