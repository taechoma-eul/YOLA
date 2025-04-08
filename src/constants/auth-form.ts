export const AUTH = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  PASSWORD: 'password',
  CHECK_PASSWORD: 'checkPassword',
  NICKNAME: 'nickname',
  EMAIL: 'email'
} as const;

export const LABEL = {
  NICKNAME: '닉네임',
  EMAIL: '이메일'
} as const;

export const PLACEHOLDER = {
  PASSWORD: '비밀번호를 입력하세요.',
  CHECK_PASSWORD: '비밀번호를 한번 더 입력하세요.',
  NICKNAME: '닉네임을 입력하세요.',
  EMAIL: '이메일을 입력하세요.'
} as const;
