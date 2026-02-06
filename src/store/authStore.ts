import { create } from "zustand";
import { User } from "../types/auth.types";
import { supabase } from "../config/supabase";
import { authService } from "../services/authService";

interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

/**
 * 인증 상태 관리 스토어 (Zustand)
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setSession: (session) => set({ session }),

  /**
   * 로그인
   */
  signIn: async (email, password) => {
    try {
      set({ isLoading: true });
      const { user, session } = await authService.signIn(email, password);
      set({
        user,
        session,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * 회원가입
   */
  signUp: async (email, password, name) => {
    try {
      set({ isLoading: true });
      const { user, session } = await authService.signUp(email, password, name);
      set({
        user,
        session,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * 로그아웃
   */
  signOut: async () => {
    try {
      await authService.signOut();
      set({
        user: null,
        session: null,
        isAuthenticated: false,
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  /**
   * 앱 시작 시 세션 초기화
   */
  initialize: async () => {
    try {
      set({ isLoading: true });

      // 현재 세션 확인
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name,
          avatar: session.user.user_metadata?.avatar_url,
          created_at: session.user.created_at,
        };

        set({
          user,
          session,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }

      // 인증 상태 변경 리스너
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
            avatar: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
          };
          set({ user, session, isAuthenticated: true });
        } else {
          set({ user: null, session: null, isAuthenticated: false });
        }
      });
    } catch (error) {
      console.error("Initialize error:", error);
      set({ isLoading: false });
    }
  },
}));
