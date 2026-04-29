export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          date: string;
          time: string | null;
          location: string | null;
          color: string;
          is_sold_out: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          date: string;
          time?: string | null;
          location?: string | null;
          color?: string;
          is_sold_out?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          date?: string;
          time?: string | null;
          location?: string | null;
          color?: string;
          is_sold_out?: boolean;
          created_at?: string;
        };
      };
      programs: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          tag: string | null;
          icon: string | null;
          color: string | null;
          slug: string | null;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          tag?: string | null;
          icon?: string | null;
          color?: string | null;
          slug?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          tag?: string | null;
          icon?: string | null;
          color?: string | null;
          slug?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string | null;
          category: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          bio?: string | null;
          category?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          bio?: string | null;
          category?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          type: string;
          name: string;
          email: string;
          phone: string | null;
          message: string | null;
          metadata: Record<string, unknown>;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          name: string;
          email: string;
          phone?: string | null;
          message?: string | null;
          metadata?: Record<string, unknown>;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string | null;
          metadata?: Record<string, unknown>;
          is_read?: boolean;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          phone: string | null;
          email: string | null;
          address: string | null;
          facebook: string | null;
          instagram: string | null;
          youtube: string | null;
          x_twitter: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          youtube?: string | null;
          x_twitter?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          youtube?: string | null;
          x_twitter?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
};

// Convenience type aliases
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type Program = Database["public"]["Tables"]["programs"]["Row"];
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
export type FormSubmission = Database["public"]["Tables"]["form_submissions"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
