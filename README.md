# EngWordBook - React Native App

Supabase 인증이 적용된 React Native (Expo) 프로젝트입니다.

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn
- Expo Go 앱 (모바일 테스트용)

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm start

# 3. 앱 실행
# - iOS: i 키 입력
# - Android: a 키 입력
# - 웹: w 키 입력
```

## 📁 프로젝트 구조

```
my-app/
├── src/
│   ├── config/
│   │   └── supabase.ts          # Supabase 클라이언트 설정
│   ├── constants/
│   │   └── colors.ts            # 색상 상수
│   ├── navigation/
│   │   ├── AppNavigator.tsx     # 메인 네비게이터
│   │   └── types.ts             # 네비게이션 타입
│   ├── screens/
│   │   ├── HomeScreen.tsx       # 홈 화면
│   │   ├── LoginScreen.tsx      # 로그인 화면
│   │   ├── SignUpScreen.tsx     # 회원가입 화면
│   │   └── ProfileScreen.tsx    # 프로필 화면
│   ├── services/
│   │   └── authService.ts       # 인증 API 서비스
│   ├── store/
│   │   └── authStore.ts         # 인증 상태 관리 (Zustand)
│   └── types/
│       └── auth.types.ts        # 인증 타입 정의
├── .env                         # 환경 변수
├── App.js                       # 앱 진입점
└── package.json
```

## 🔐 인증 기능

### 구현된 기능
- ✅ 이메일/비밀번호 회원가입
- ✅ 이메일/비밀번호 로그인
- ✅ 로그아웃
- ✅ 세션 자동 저장 및 복원
- ✅ Protected Routes (인증 필요 화면)
- ✅ 프로필 화면

### Supabase 설정

✅ **이미 설정 완료!** Supabase 프로젝트가 연결되었습니다.
- URL: `https://mfyimuejomlddbtiozqg.supabase.co`
- 설정 파일: `src/config/supabase.ts`

## 📱 화면 구조

### 인증 전 (Auth Flow)
- **LoginScreen**: 로그인 화면
- **SignUpScreen**: 회원가입 화면

### 인증 후 (Main Flow)
- **HomeScreen**: 홈 화면 (환영 메시지, 프로필 이동, 로그아웃)
- **ProfileScreen**: 프로필 정보 표시

## 🛠️ 기술 스택

- **React Native**: 크로스 플랫폼 모바일 프레임워크
- **Expo**: React Native 개발 플랫폼
- **TypeScript**: 정적 타입 언어
- **Supabase**: 백엔드 서비스 (인증, 데이터베이스)
- **Zustand**: 경량 상태 관리
- **React Navigation**: 네비게이션 라이브러리
- **AsyncStorage**: 로컬 데이터 저장

## 🧪 테스트 방법

1. **회원가입 테스트**
   ```
   앱 실행 → "회원가입" 버튼 → 정보 입력 → 가입 완료
   ```

2. **로그인 테스트**
   ```
   이메일/비밀번호 입력 → "로그인" 버튼 → 홈 화면 이동
   ```

3. **세션 유지 확인**
   ```
   로그인 → 앱 종료 → 앱 재실행 → 자동 로그인 확인
   ```

4. **로그아웃 테스트**
   ```
   홈 화면 → "로그아웃" 버튼 → 로그인 화면으로 이동
   ```

## 📝 다음 단계

### 추가 기능 구현
- [ ] 비밀번호 재설정
- [ ] 소셜 로그인 (Google, Apple)
- [ ] 프로필 편집
- [ ] 이미지 업로드
- [ ] 다크 모드

### 데이터베이스 확장
```sql
-- profiles 테이블 생성
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS 활성화
alter table public.profiles enable row level security;
```

## 🐛 문제 해결

### 세션이 유지되지 않음
- AsyncStorage가 제대로 설치되었는지 확인
- `npx expo install @react-native-async-storage/async-storage`

### 이메일이 전송되지 않음
- Supabase → Settings → Email Templates 확인
- SMTP 설정 확인

### 네비게이션 에러
- 모든 네비게이션 패키지가 설치되었는지 확인
- `npm install @react-navigation/native @react-navigation/native-stack`

## 📚 참고 문서

- [Expo 공식 문서](https://docs.expo.dev/)
- [Supabase 공식 문서](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## 👥 기여

이슈나 풀 리퀘스트는 언제든 환영합니다!

## 📄 라이선스

MIT License
