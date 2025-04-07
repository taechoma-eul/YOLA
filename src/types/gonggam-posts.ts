import { Tables } from '@/types/supabase';

export interface GonggamPost extends Tables<'gonggam_posts'> {
  likes: Tables<'likes'>[];
  comments: Tables<'comments'>[];
}
