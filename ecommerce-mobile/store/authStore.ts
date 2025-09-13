import AsyncStorage from '@react-native-async-storage/async-storage';
import { Zap } from 'lucide-react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
