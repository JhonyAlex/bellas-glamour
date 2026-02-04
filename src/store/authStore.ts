import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, getCurrentUser, signIn, signOut, signUp } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, additionalData?: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await signIn(email, password);
          
          if (error) {
            throw error;
          }
          
          if (data?.user) {
            // Obtener información adicional del usuario desde la tabla users
            const { data: userData } = await import('../lib/supabase').then(({ supabase }) => 
              supabase
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single()
            );
            
            set({ 
              user: userData as User, 
              isLoading: false,
              error: null 
            });
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Error al iniciar sesión',
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (email: string, password: string, role: UserRole, additionalData?: any) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await signUp(email, password, role, additionalData);
          
          if (error) {
            throw error;
          }
          
          if (data?.user) {
            // Crear registro en la tabla users
            const { error: userError } = await import('../lib/supabase').then(({ supabase }) =>
              supabase
                .from('users')
                .insert({
                  id: data.user.id,
                  email: data.user.email,
                  role: role,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })
            );
            
            if (userError) {
              throw userError;
            }
            
            set({ 
              user: {
                id: data.user.id,
                email: data.user.email!,
                role: role,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              isLoading: false,
              error: null 
            });
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Error al registrar usuario',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          const { error } = await signOut();
          
          if (error) {
            throw error;
          }
          
          set({ 
            user: null, 
            isLoading: false,
            error: null 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Error al cerrar sesión',
            isLoading: false 
          });
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          const { user, error } = await getCurrentUser();
          
          if (error) {
            throw error;
          }
          
          if (user) {
            // Obtener información del usuario desde la tabla users
            const { data: userData } = await import('../lib/supabase').then(({ supabase }) =>
              supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single()
            );
            
            set({ 
              user: userData as User, 
              isLoading: false,
              error: null 
            });
          } else {
            set({ 
              user: null, 
              isLoading: false,
              error: null 
            });
          }
        } catch (error) {
          set({ 
            user: null, 
            isLoading: false,
            error: null 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user 
      }),
    }
  )
);