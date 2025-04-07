export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string;
          created_at: string;
          id: number;
          post_id: number;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: number;
          post_id: number;
          user_id?: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'gonggam_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      gonggam_post_image_path: {
        Row: {
          id: number;
          image_url: string;
          post_id: number;
        };
        Insert: {
          id?: number;
          image_url: string;
          post_id: number;
        };
        Update: {
          id?: number;
          image_url?: string;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'gonggam_post_image_path_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'gonggam_posts';
            referencedColumns: ['id'];
          }
        ];
      };
      gonggam_post_tags: {
        Row: {
          id: number;
          post_id: number;
          selected_tags: Database['public']['Enums']['tags'];
        };
        Insert: {
          id?: number;
          post_id: number;
          selected_tags: Database['public']['Enums']['tags'];
        };
        Update: {
          id?: number;
          post_id?: number;
          selected_tags?: Database['public']['Enums']['tags'];
        };
        Relationships: [
          {
            foreignKeyName: 'gonggam_post_tags_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'gonggam_posts';
            referencedColumns: ['id'];
          }
        ];
      };
      gonggam_posts: {
        Row: {
          category: Database['public']['Enums']['categorys'];
          content: string;
          created_at: string;
          id: number;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          category: Database['public']['Enums']['categorys'];
          content: string;
          created_at?: string;
          id?: number;
          title: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          category?: Database['public']['Enums']['categorys'];
          content?: string;
          created_at?: string;
          id?: number;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'gonggam_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      life_post_image_path: {
        Row: {
          id: number;
          image_url: string;
          life_post_id: number;
        };
        Insert: {
          id?: number;
          image_url: string;
          life_post_id: number;
        };
        Update: {
          id?: number;
          image_url?: string;
          life_post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'life_post_image_path_life_post_id_fkey';
            columns: ['life_post_id'];
            isOneToOne: false;
            referencedRelation: 'life_posts';
            referencedColumns: ['id'];
          }
        ];
      };
      life_posts: {
        Row: {
          content: string;
          created_at: string;
          date: string;
          id: number;
          mission_id: number | null;
          tags: string[] | null;
          title: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          date: string;
          id?: number;
          mission_id?: number | null;
          tags?: string[] | null;
          title: string;
          user_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          date?: string;
          id?: number;
          mission_id?: number | null;
          tags?: string[] | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'life_posts_mission_id_fkey';
            columns: ['mission_id'];
            isOneToOne: false;
            referencedRelation: 'mission_list';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'life_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'gonggam_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      mission_list: {
        Row: {
          content: string;
          id: number;
          level: Database['public']['Enums']['level'];
          type: Database['public']['Enums']['tags'];
        };
        Insert: {
          content: string;
          id?: number;
          level: Database['public']['Enums']['level'];
          type: Database['public']['Enums']['tags'];
        };
        Update: {
          content?: string;
          id?: number;
          level?: Database['public']['Enums']['level'];
          type?: Database['public']['Enums']['tags'];
        };
        Relationships: [];
      };
      user_level: {
        Row: {
          clean: string;
          goat: string;
          id: number;
          meal: string;
          play: string;
          travel: string;
          user_id: string;
        };
        Insert: {
          clean?: string;
          goat?: string;
          id?: number;
          meal?: string;
          play?: string;
          travel?: string;
          user_id?: string;
        };
        Update: {
          clean?: string;
          goat?: string;
          id?: number;
          meal?: string;
          play?: string;
          travel?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_level_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_mission: {
        Row: {
          completed_id: number;
          created_at: string;
          id: number;
          user_id: string;
        };
        Insert: {
          completed_id: number;
          created_at?: string;
          id?: number;
          user_id?: string;
        };
        Update: {
          completed_id?: number;
          created_at?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_mission_completed_id_fkey';
            columns: ['completed_id'];
            isOneToOne: false;
            referencedRelation: 'mission_list';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_mission_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          nickname: string | null;
          profile_image: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          nickname?: string | null;
          profile_image?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string | null;
          profile_image?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      categorys: '일상공유' | '꿀팁공유' | '여기추천' | '밋업';
      level: '1' | '2' | '3' | '4' | '5' | 'master';
      tags: '혼밥' | '혼자여행' | '갓생' | '혼놀' | '청소' | '공감해죠' | '칭찬해죠' | '힘들어';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
