import { Tables } from '../supabase';

export interface EditFormData {
  nickname: string;
  profile_image_file: FileList | null;
  profile_image: string;
}

export interface InitProfile {
  initProfile: Tables<'users'>;
}
