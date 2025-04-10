// 한국 시간 기준 ISO 문자열로 변환 (KST 기준 날짜 문자열 ('YYYY-MM-DD'))
export const toKoreanISOString = (date: Date) => {
  const offset = 9 * 60; // KST는 UTC+9
  const local = new Date(date.getTime() + offset * 60 * 1000);
  return local.toISOString().slice(0, 10); // 'YYYY-MM-DD'
};

/**
 * getKoreanDate
 * 주어진 날짜 또는 현재 시간을 KST 기준으로 보정한 Date 객체 반환
 *
 * @param date - 기준 날짜 (기본값: 현재 시간)
 * @returns KST 기준 Date 객체
 */
export const getKoreanDate = (date: Date = new Date()): Date => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + 9 * 60 * 60 * 1000); // KST = UTC+9
};
