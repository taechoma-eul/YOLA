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
          nickname: string;
          profile_image: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          nickname: string;
          profile_image?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string;
          profile_image?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_popular_posts: {
        Args: { limit_count: number };
        Returns: {
          id: number;
          category: Enums<'categorys'>;
          content: string;
          created_at: string;
          title: string;
          updated_at: string;
          user_id: string;
          likes_count: number;
          comments_count: number;
          total_interactions: number;
          likes: Tables<'likes'>[];
          comments: Tables<'comments'>[];
        }[];
      };
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

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      categorys: ['일상공유', '꿀팁공유', '여기추천', '밋업'],
      level: ['1', '2', '3', '4', '5', 'master'],
      tags: ['혼밥', '혼자여행', '갓생', '혼놀', '청소', '공감해죠', '칭찬해죠', '힘들어']
    }
  }
} as const;
