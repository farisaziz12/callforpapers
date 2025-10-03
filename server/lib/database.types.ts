export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type CfpFormat = 'conference' | 'workshop' | 'meetup' | 'online'
export type ModerationStatus = 'pending' | 'approved' | 'rejected'

export interface Database {
  public: {
    Tables: {
      cfps: {
        Row: {
          id: string
          slug: string
          title: string
          city: string
          country: string
          topics: string[]
          closes_at: string
          format: CfpFormat
          perks_travel: boolean
          perks_hotel: boolean
          perks_honorarium: boolean
          website_url: string
          cfp_url: string
          timeline_opens_at: string | null
          timeline_closes_at: string
          platform: string | null
          notes: string | null
          last_updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          city: string
          country: string
          topics?: string[]
          closes_at: string
          format: CfpFormat
          perks_travel?: boolean
          perks_hotel?: boolean
          perks_honorarium?: boolean
          website_url: string
          cfp_url: string
          timeline_opens_at?: string | null
          timeline_closes_at: string
          platform?: string | null
          notes?: string | null
          last_updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          city?: string
          country?: string
          topics?: string[]
          closes_at?: string
          format?: CfpFormat
          perks_travel?: boolean
          perks_hotel?: boolean
          perks_honorarium?: boolean
          website_url?: string
          cfp_url?: string
          timeline_opens_at?: string | null
          timeline_closes_at?: string
          platform?: string | null
          notes?: string | null
          last_updated_at?: string
          created_at?: string
        }
        Relationships: []
      }
      moderation_queue: {
        Row: {
          id: string
          submitted_at: string
          status: ModerationStatus
          conference_name: string
          conference_website_url: string
          conference_city: string
          conference_country: string
          conference_platform: string | null
          cfp_title: string
          cfp_url: string
          cfp_topics: string[]
          cfp_format: CfpFormat
          cfp_opens_at: string | null
          cfp_closes_at: string
          cfp_perks_travel: boolean
          cfp_perks_hotel: boolean
          cfp_perks_honorarium: boolean
          cfp_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          submitted_at?: string
          status?: ModerationStatus
          conference_name: string
          conference_website_url: string
          conference_city: string
          conference_country: string
          conference_platform?: string | null
          cfp_title: string
          cfp_url: string
          cfp_topics?: string[]
          cfp_format: CfpFormat
          cfp_opens_at?: string | null
          cfp_closes_at: string
          cfp_perks_travel?: boolean
          cfp_perks_hotel?: boolean
          cfp_perks_honorarium?: boolean
          cfp_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          submitted_at?: string
          status?: ModerationStatus
          conference_name?: string
          conference_website_url?: string
          conference_city?: string
          conference_country?: string
          conference_platform?: string | null
          cfp_title?: string
          cfp_url?: string
          cfp_topics?: string[]
          cfp_format?: CfpFormat
          cfp_opens_at?: string | null
          cfp_closes_at?: string
          cfp_perks_travel?: boolean
          cfp_perks_hotel?: boolean
          cfp_perks_honorarium?: boolean
          cfp_notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          id: string
          user_id: string
          name: string
          filter_query: string | null
          filter_country: string | null
          filter_topic: string | null
          filter_format: CfpFormat | null
          filter_closes_before: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          filter_query?: string | null
          filter_country?: string | null
          filter_topic?: string | null
          filter_format?: CfpFormat | null
          filter_closes_before?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          filter_query?: string | null
          filter_country?: string | null
          filter_topic?: string | null
          filter_format?: CfpFormat | null
          filter_closes_before?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cfp_format: CfpFormat
      moderation_status: ModerationStatus
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
