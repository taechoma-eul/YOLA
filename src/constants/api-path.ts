export const NEXT_SERVER_BASE_URL = process.env.VERCEL_URL ?? 'http://localhost:3000'; // 버셀에선 배포 주소, 로컬에선 로컬 주소

export const API = {
  SOCIAL_LOGIN_CALL_BACK: '/api/auth/callback',
  GOOGLE_LOGIN: '/api/auth/google',
  KAKAO_LOGIN: '/api/auth/kakao',
  DUPLICATE: '/api/auth/check-duplicate'
};
