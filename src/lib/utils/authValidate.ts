import { z } from 'zod';

/**
 * zod를 이용한 유효성 검사 스키마입니다.
 * email, password, confirm password, nickname의 유효값을 정의합니다.
 * confirm password와 password가 일치하지 않을 때의 오류 메시지가 별도로 지정되어 있습니다.
 * z.infer로 스키마에서 타입을 자동 추론합니다.
 */
export const signupSchema = z
  .object({
    email: z.string({ required_error: '이메일을 입력해주세요.' }).email('유효한 이메일을 입력하세요.'),
    password: z.string({ required_error: '비밀번호를 입력해주세요.' }).min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
    confirmPassword: z
      .string({ required_error: '비밀번호 확인을 입력해주세요.' })
      .min(6, '비밀번호 확인은 최소 6자 이상이어야 합니다.'),
    nickname: z
      .string({ required_error: '닉네임을 입력해주세요.' })
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
      .max(10, '닉네임은 10자 이하여야 합니다.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });

export type SignupFormData = z.infer<typeof signupSchema>;
