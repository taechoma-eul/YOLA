export const MSG = {
  NEED_LOGIN: '로그인이 필요합니다',
  LOGIN_BEFORE_POST_MISSION_CLEAR: '미션을 진행하려면 먼저 로그인하세요.',
  ALREADY_CLEAR: '이미 인증했습니다.',
  ALREADY_CLEAR_CHOOSE_OTHER: '완료한 미션입니다. 다른 미션에 도전해 보세요!',
  INVALID_MISSION_TYPE: '유효하지 않은 미션 이름입니다',
  NOTFOUND_MISSION_INFO: '해당 미션 정보를 찾을 수 없습니다.'
};

export const SUCCESS = {
  CHECK: '사용 가능한',
  UPDATE_PROFILE: '프로필 변경이 완료되었습니다.',
  LOGIN: '로그인이 완료되었습니다.',
  SIGNUP: '회원가입이 완료되었습니다. 자동 로그인 됩니다.'
} as const;

export const FAIL = {
  LOGOUT: '로그아웃에 실패했습니다. 다시 시도해주세요.',
  SOCIAL_LOGIN: '소셜 로그인에 실패했습니다. 다시 시도해주세요.',
  UPDATE_PROFILE: '사용자 정보 변경에 실패했습니다.',
  LOGIN: '이메일 또는 비밀번호 오류입니다.',
  SESSION: '사용자 세션 정보가 존재하지 않습니다.',
  GET_PROFILE: '사용자 프로필 정보를 받아오는 데 실패했습니다.'
} as const;

export const AUTH_ERROR = {
  EMAIL_CHECK: '이메일 중복확인을 해주세요.',
  NICKNAME_CHECK: '닉네임 중복확인을 해주세요.',
  FIELD_CHECK: '모든 정보를 올바르게 입력해주세요.',
  CHECK_NICKNAME_FAIL: '이미 사용 중인 닉네임입니다.',
  NONE_NICKNAME: '닉네임을 먼저 입력해주세요.',
  CHECK_EMAIL_FAIL: '이미 사용 중인 이메일입니다.',
  NONE_EMAIL: '이메일을 먼저 입력해주세요.'
} as const;
