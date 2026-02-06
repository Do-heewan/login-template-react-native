import { supabase } from '../config/supabase';
import { User, AuthError } from '../types/auth.types';

/**
 * Supabase 인증 서비스
 */
class AuthService {
  /**
   * 로그인
   */
  async signIn(email: string, password: string): Promise<{ user: User; session: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw this.handleError(error);
    }

    if (!data.user || !data.session) {
      throw new Error('로그인에 실패했습니다.');
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      avatar: data.user.user_metadata?.avatar_url,
      created_at: data.user.created_at,
    };

    return { user, session: data.session };
  }

  /**
   * 회원가입
   */
  async signUp(email: string, password: string, name?: string): Promise<{ user: User; session: any }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        },
      },
    });

    if (error) {
      throw this.handleError(error);
    }

    if (!data.user) {
      throw new Error('회원가입에 실패했습니다.');
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: name,
      created_at: data.user.created_at,
    };

    return { user, session: data.session };
  }

  /**
   * 로그아웃
   */
  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 비밀번호 재설정 이메일 전송
   */
  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 현재 사용자 정보 가져오기
   */
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name,
      avatar: user.user_metadata?.avatar_url,
      created_at: user.created_at,
    };
  }

  /**
   * 에러 처리
   */
  private handleError(error: any): AuthError {
    console.error('Auth error:', error);

    const errorMessages: Record<string, string> = {
      'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
      'User already registered': '이미 등록된 이메일입니다.',
      'Email not confirmed': '이메일 인증이 필요합니다.',
      'Invalid email': '유효하지 않은 이메일 주소입니다.',
    };

    return {
      message: errorMessages[error.message] || error.message,
      code: error.code,
    };
  }
}

export const authService = new AuthService();
