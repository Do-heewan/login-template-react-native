import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Supabase 프로젝트 설정
// .env 파일의 값을 여기에 직접 입력하세요
const SUPABASE_URL = "https://mfyimuejomlddbtiozqg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FjUZ4YSZkymmG7bf6IS0Pg_GyY4plm7";

/**
 * Supabase 클라이언트 인스턴스
 * AsyncStorage를 사용하여 세션을 로컬에 저장합니다.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
