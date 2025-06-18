export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          address: string | null
          asset_name: string
          asset_type: Database["public"]["Enums"]["asset_type"]
          capacity: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          operational_status: boolean | null
          operator_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          asset_name: string
          asset_type: Database["public"]["Enums"]["asset_type"]
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          operational_status?: boolean | null
          operator_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          asset_name?: string
          asset_type?: Database["public"]["Enums"]["asset_type"]
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          operational_status?: boolean | null
          operator_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          document_name: string
          document_type: string
          file_path: string | null
          file_size: number | null
          id: string
          inspection_id: string | null
          mime_type: string | null
          notes: string | null
          operator_id: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          updated_at: string | null
          uploaded_by: string | null
          vehicle_id: string | null
          violation_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_name: string
          document_type: string
          file_path?: string | null
          file_size?: number | null
          id?: string
          inspection_id?: string | null
          mime_type?: string | null
          notes?: string | null
          operator_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          updated_at?: string | null
          uploaded_by?: string | null
          vehicle_id?: string | null
          violation_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_name?: string
          document_type?: string
          file_path?: string | null
          file_size?: number | null
          id?: string
          inspection_id?: string | null
          mime_type?: string | null
          notes?: string | null
          operator_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          updated_at?: string | null
          uploaded_by?: string | null
          vehicle_id?: string | null
          violation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_inspection_id_fkey"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "inspections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_violation_id_fkey"
            columns: ["violation_id"]
            isOneToOne: false
            referencedRelation: "violations"
            referencedColumns: ["id"]
          },
        ]
      }
      inspections: {
        Row: {
          checklist_items: Json | null
          created_at: string | null
          id: string
          inspection_date: string
          inspection_number: string
          inspection_type: string
          inspector_id: string | null
          notes: string | null
          operator_id: string | null
          status: Database["public"]["Enums"]["inspection_status"] | null
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          checklist_items?: Json | null
          created_at?: string | null
          id?: string
          inspection_date: string
          inspection_number: string
          inspection_type: string
          inspector_id?: string | null
          notes?: string | null
          operator_id?: string | null
          status?: Database["public"]["Enums"]["inspection_status"] | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          checklist_items?: Json | null
          created_at?: string | null
          id?: string
          inspection_date?: string
          inspection_number?: string
          inspection_type?: string
          inspector_id?: string | null
          notes?: string | null
          operator_id?: string | null
          status?: Database["public"]["Enums"]["inspection_status"] | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inspections_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspections_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspections_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          is_read: boolean | null
          operator_id: string | null
          priority: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_read?: boolean | null
          operator_id?: string | null
          priority?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_read?: boolean | null
          operator_id?: string | null
          priority?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      operators: {
        Row: {
          address: string | null
          compliance_score: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          license_expiry_date: string | null
          license_issue_date: string | null
          license_number: string
          license_status: Database["public"]["Enums"]["license_status"] | null
          operator_name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          compliance_score?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          license_expiry_date?: string | null
          license_issue_date?: string | null
          license_number: string
          license_status?: Database["public"]["Enums"]["license_status"] | null
          operator_name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          compliance_score?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          license_expiry_date?: string | null
          license_issue_date?: string | null
          license_number?: string
          license_status?: Database["public"]["Enums"]["license_status"] | null
          operator_name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      penalties: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          issue_date: string
          operator_id: string | null
          payment_date: string | null
          penalty_number: string
          status: Database["public"]["Enums"]["penalty_status"] | null
          updated_at: string | null
          violation_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          issue_date: string
          operator_id?: string | null
          payment_date?: string | null
          penalty_number: string
          status?: Database["public"]["Enums"]["penalty_status"] | null
          updated_at?: string | null
          violation_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          issue_date?: string
          operator_id?: string | null
          payment_date?: string | null
          penalty_number?: string
          status?: Database["public"]["Enums"]["penalty_status"] | null
          updated_at?: string | null
          violation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "penalties_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "penalties_violation_id_fkey"
            columns: ["violation_id"]
            isOneToOne: false
            referencedRelation: "violations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          capacity: number | null
          created_at: string | null
          id: string
          last_inspection_date: string | null
          make: string | null
          model: string | null
          next_inspection_due: string | null
          operator_id: string | null
          status: Database["public"]["Enums"]["vehicle_status"] | null
          updated_at: string | null
          vehicle_registration: string
          vehicle_type: string
          year: number | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          last_inspection_date?: string | null
          make?: string | null
          model?: string | null
          next_inspection_due?: string | null
          operator_id?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          updated_at?: string | null
          vehicle_registration: string
          vehicle_type: string
          year?: number | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          last_inspection_date?: string | null
          make?: string | null
          model?: string | null
          next_inspection_due?: string | null
          operator_id?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          updated_at?: string | null
          vehicle_registration?: string
          vehicle_type?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      violations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          inspection_id: string | null
          operator_id: string | null
          resolution_date: string | null
          severity: Database["public"]["Enums"]["violation_severity"]
          status: Database["public"]["Enums"]["violation_status"] | null
          updated_at: string | null
          vehicle_id: string | null
          violation_date: string
          violation_number: string
          violation_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          inspection_id?: string | null
          operator_id?: string | null
          resolution_date?: string | null
          severity: Database["public"]["Enums"]["violation_severity"]
          status?: Database["public"]["Enums"]["violation_status"] | null
          updated_at?: string | null
          vehicle_id?: string | null
          violation_date: string
          violation_number: string
          violation_type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          inspection_id?: string | null
          operator_id?: string | null
          resolution_date?: string | null
          severity?: Database["public"]["Enums"]["violation_severity"]
          status?: Database["public"]["Enums"]["violation_status"] | null
          updated_at?: string | null
          vehicle_id?: string | null
          violation_date?: string
          violation_number?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "violations_inspection_id_fkey"
            columns: ["inspection_id"]
            isOneToOne: false
            referencedRelation: "inspections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "violations_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "violations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_operator_id: {
        Args: { user_uuid: string }
        Returns: string
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
    }
    Enums: {
      asset_type:
        | "bus_stop"
        | "terminal"
        | "depot"
        | "maintenance_facility"
        | "fuel_station"
      document_status: "pending_review" | "approved" | "rejected"
      inspection_status: "passed" | "failed" | "pending"
      license_status: "active" | "pending" | "expired" | "suspended"
      penalty_status: "pending" | "paid" | "overdue" | "waived"
      user_role: "operator" | "admin" | "inspector"
      vehicle_status:
        | "active"
        | "maintenance"
        | "out_of_service"
        | "decommissioned"
      violation_severity: "low" | "medium" | "high" | "critical"
      violation_status: "unresolved" | "in_review" | "resolved"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_type: [
        "bus_stop",
        "terminal",
        "depot",
        "maintenance_facility",
        "fuel_station",
      ],
      document_status: ["pending_review", "approved", "rejected"],
      inspection_status: ["passed", "failed", "pending"],
      license_status: ["active", "pending", "expired", "suspended"],
      penalty_status: ["pending", "paid", "overdue", "waived"],
      user_role: ["operator", "admin", "inspector"],
      vehicle_status: [
        "active",
        "maintenance",
        "out_of_service",
        "decommissioned",
      ],
      violation_severity: ["low", "medium", "high", "critical"],
      violation_status: ["unresolved", "in_review", "resolved"],
    },
  },
} as const
