// Supabase에서 받아오는 원본 타입
export interface SoloLifeRaw {
  id: number;
  created_at: string;
  user_id: string;
  content: string;
  mission_id: number | null;
}

// 카드 컴포넌트에서 사용하는 가공된 타입
export interface SoloLifeCardType {
  id: string;
  date: string;
  title: string;
  content: string;
  img: string;
  isMission: boolean;
}
