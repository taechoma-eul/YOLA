// 한국 시간 기준 ISO 문자열로 변환
export const toKoreanISOString = (date: Date) => {
  const offset = 9 * 60; // KST는 UTC+9
  const local = new Date(date.getTime() + offset * 60 * 1000);
  return local.toISOString().slice(0, 10); // 'YYYY-MM-DD'
};
