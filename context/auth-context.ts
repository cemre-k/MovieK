import { createContext } from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

export type AuthContextValue = {
  supabase: SupabaseClient;
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
