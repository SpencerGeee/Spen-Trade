import { create } from 'zustand';

interface UserState {
    user: any | null; // Replace 'any' with proper User type from Prisma
    setUser: (user: any) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
