export const AUTH = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  PASSWORD: 'password',
  CHECK_PASSWORD: 'checkPassword',
  NICKNAME: 'nickname',
  EMAIL: 'email',
  PROFILE_IMAGE: 'profile_image',
  PROFILE_IMAGE_FILE: 'profile_image_file'
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

export const ERROR_MESSAGE = {
  EMAIL_CHECK: '이메일 중복확인을 해주세요.',
  NICKNAME_CHECK: '닉네임 중복확인을 해주세요.',
  FIELD_CHECK: '모든 정보를 올바르게 입력해주세요.',
  CHECK_NICKNAME_FAIL: '이미 사용 중인 닉네임입니다.',
  NONE_NICKNAME: '닉네임을 먼저 입력해주세요.',
  CHECK_EMAIL_FAIL: '이미 사용 중인 이메일입니다.',
  NONE_EMAIL: '이메일을 먼저 입력해주세요.'
} as const;

export const SUCCESS_MESSAGE = '사용 가능합니다.';
