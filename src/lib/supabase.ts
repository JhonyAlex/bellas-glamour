import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gebctgzmugrupzngqggp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYmN0Z3ptdWdydXB6bmdxZ2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMjA4MjYsImV4cCI6MjA4NTc5NjgyNn0.jTAe971tOJq_KjskwLGc0tR-7guzJP_hOPqtvhprQiw';

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
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  age?: number;
  nationality: string;
  location: string;
  height_cm?: number;
  measurements: {
    bust: number;
    waist: number;
    hips: number;
  };
  hair_color?: string;
  eye_color?: string;
  skin_tone?: string;
  special_features?: string[];
  languages?: string[];
  experience_years?: number;
  about?: string;
  availability: {
    weekdays: boolean;
    weekends: boolean;
    travel: boolean;
  };
  social_media?: any;
  is_verified: boolean;
  is_featured: boolean;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  industry: string;
  company_size?: 'startup' | 'small' | 'medium' | 'large';
  location: string;
  website?: string;
  social_media?: any;
  about?: string;
  is_verified: boolean;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface ModelPhoto {
  id: string;
  model_id: string;
  photo_url: string;
  thumbnail_url?: string;
  category?: 'headshot' | 'full_body' | 'portrait' | 'editorial' | 'swimwear' | 'lingerie' | 'commercial';
  is_primary: boolean;
  is_approved: boolean;
  uploaded_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  content: string;
  is_read: boolean;
  is_important: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  client_id: string;
  model_id: string;
  created_at: string;
}

// Funciones de utilidad
export const formatModelForDisplay = (model: Model & { model_photos?: ModelPhoto[] }) => {
  return {
    ...model,
    mainPhoto: model.model_photos?.find(p => p.is_approved && p.is_primary)?.photo_url || 
               model.model_photos?.find(p => p.is_approved)?.photo_url || null,
    allPhotos: model.model_photos?.filter(p => p.is_approved) || [],
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
        model_photos!inner(photo_url, is_approved, is_primary, category)
      `)
      .eq('status', 'active')
      .eq('is_verified', true)
      .eq('model_photos.is_approved', true)
      .limit(limit)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getVerifiedClients = async (limit: number = 20, offset: number = 0) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select(`*`)
      .eq('status', 'active')
      .eq('is_verified', true)
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
        model_photos!inner(photo_url, is_approved, is_primary, category)
      `)
      .eq('status', 'active')
      .eq('is_verified', true)
      .eq('model_photos.is_approved', true);

    // Búsqueda de texto completo (crearemos un índice tsvector después)
    if (query) {
      supabaseQuery = supabaseQuery.or(`artistic_name.ilike.%${query}%,nationality.ilike.%${query}%`);
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
      if (filters.age_min) {
        supabaseQuery = supabaseQuery.gte('age', filters.age_min);
      }
      if (filters.age_max) {
        supabaseQuery = supabaseQuery.lte('age', filters.age_max);
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

export const uploadPhoto = async (file: File, modelId: string, category: string = 'portrait') => {
  try {
    const fileName = `${modelId}/${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('model-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Crear registro en la tabla model_photos
    const { data: photoData, error: photoError } = await supabase
      .from('model_photos')
      .insert({
        model_id: modelId,
        photo_url: data.path,
        category: category,
        is_approved: false,
      });

    if (photoError) throw photoError;

    return { data: photoData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const sendMessage = async (senderId: string, receiverId: string, subject: string, content: string) => {
  try {
    // Verificar suscripción activa (rate limiting)
    const { data: existingMessages, error: checkError } = await supabase
      .from('messages')
      .select('created_at')
      .eq('sender_id', senderId)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString()) // Última hora
      .limit(5);

    if (checkError) throw checkError;

    if (existingMessages && existingMessages.length >= 5) {
      throw new Error('Has alcanzado el límite de mensajes por hora');
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        subject,
        content,
        is_read: false,
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const addFavorite = async (clientId: string, modelId: string) => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        client_id: clientId,
        model_id: modelId,
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const removeFavorite = async (clientId: string, modelId: string) => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('client_id', clientId)
      .eq('model_id', modelId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getFavoritesByClient = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        models!inner(*, model_photos!inner(photo_url, is_approved, is_primary))
      `)
      .eq('client_id', clientId)
      .eq('models.is_verified', true)
      .eq('model_photos.is_approved', true);

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
        model_photos(photo_url, is_approved, is_primary, category)
      `)
      .eq('is_verified', false)
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
      .update({ is_verified: true })
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
      .update({ status: 'suspended' })
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
      .from('model_photos')
      .update({ is_approved: true })
      .eq('id', photoId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};