import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, UserActions, User } from '@/types/store';

interface UserStore extends UserState, UserActions {}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call - replace with actual authentication logic
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock user data - replace with actual API response
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
            isLoggedIn: true,
          };

          set({
            user,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isLoading: false,
          error: null,
        });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
