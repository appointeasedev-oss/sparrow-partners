import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          avatar: string | null;
          color: string;
          password: string | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          name: string;
          avatar?: string | null;
          color?: string;
          password?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          avatar?: string | null;
          color?: string;
          password?: string | null;
          created_at?: string | null;
        };
      };
      groups: {
        Row: {
          id: string;
          name: string;
          created_at: string | null;
        };
        Insert: {
          id: string;
          name: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string | null;
        };
      };
      user_groups: {
        Row: {
          id: string;
          user_id: string;
          group_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          group_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          group_id?: string;
          created_at?: string | null;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          message: string;
          read: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          message: string;
          read?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          message?: string;
          read?: boolean | null;
          created_at?: string | null;
        };
      };
    };
  };
};