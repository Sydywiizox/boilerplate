// src/store/user.ts
import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUser = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
