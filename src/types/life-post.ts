export interface LifePost {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
  mission_id: string | null;
}
export interface SoloLifeCardType {
  id: string;
  date: string;
  title: string;
  content: string;
  img: string;
  isMission: boolean;
}
