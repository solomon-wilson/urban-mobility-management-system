export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "operator" | "admin" | "inspector";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "operator" | "admin" | "inspector";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "operator" | "admin" | "inspector";
          created_at?: string;
          updated_at?: string;
        };
      };
      operators: {
        Row: {
          id: string;
          user_id: string | null;
          operator_name: string;
          license_number: string;
          license_status: "active" | "pending" | "expired" | "suspended";
          license_issue_date: string | null;
          license_expiry_date: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          address: string | null;
          compliance_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          operator_name: string;
          license_number: string;
          license_status?: "active" | "pending" | "expired" | "suspended";
          license_issue_date?: string | null;
          license_expiry_date?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          address?: string | null;
          compliance_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          operator_name?: string;
          license_number?: string;
          license_status?: "active" | "pending" | "expired" | "suspended";
          license_issue_date?: string | null;
          license_expiry_date?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          address?: string | null;
          compliance_score?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          operator_id: string;
          vehicle_registration: string;
          vehicle_type: string;
          make: string | null;
          model: string | null;
          year: number | null;
          capacity: number | null;
          status:
            | "active"
            | "maintenance"
            | "out_of_service"
            | "decommissioned";
          last_inspection_date: string | null;
          next_inspection_due: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          operator_id: string;
          vehicle_registration: string;
          vehicle_type: string;
          make?: string | null;
          model?: string | null;
          year?: number | null;
          capacity?: number | null;
          status?:
            | "active"
            | "maintenance"
            | "out_of_service"
            | "decommissioned";
          last_inspection_date?: string | null;
          next_inspection_due?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          operator_id?: string;
          vehicle_registration?: string;
          vehicle_type?: string;
          make?: string | null;
          model?: string | null;
          year?: number | null;
          capacity?: number | null;
          status?:
            | "active"
            | "maintenance"
            | "out_of_service"
            | "decommissioned";
          last_inspection_date?: string | null;
          next_inspection_due?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      inspections: {
        Row: {
          id: string;
          inspection_number: string;
          operator_id: string;
          vehicle_id: string | null;
          inspector_id: string | null;
          inspection_type: string;
          inspection_date: string;
          status: "passed" | "failed" | "pending";
          checklist_items: Json;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          inspection_number: string;
          operator_id: string;
          vehicle_id?: string | null;
          inspector_id?: string | null;
          inspection_type: string;
          inspection_date: string;
          status?: "passed" | "failed" | "pending";
          checklist_items?: Json;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          inspection_number?: string;
          operator_id?: string;
          vehicle_id?: string | null;
          inspector_id?: string | null;
          inspection_type?: string;
          inspection_date?: string;
          status?: "passed" | "failed" | "pending";
          checklist_items?: Json;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      violations: {
        Row: {
          id: string;
          violation_number: string;
          operator_id: string;
          vehicle_id: string | null;
          inspection_id: string | null;
          violation_type: string;
          description: string | null;
          severity: "low" | "medium" | "high" | "critical";
          status: "unresolved" | "in_review" | "resolved";
          violation_date: string;
          resolution_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          violation_number: string;
          operator_id: string;
          vehicle_id?: string | null;
          inspection_id?: string | null;
          violation_type: string;
          description?: string | null;
          severity: "low" | "medium" | "high" | "critical";
          status?: "unresolved" | "in_review" | "resolved";
          violation_date: string;
          resolution_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          violation_number?: string;
          operator_id?: string;
          vehicle_id?: string | null;
          inspection_id?: string | null;
          violation_type?: string;
          description?: string | null;
          severity?: "low" | "medium" | "high" | "critical";
          status?: "unresolved" | "in_review" | "resolved";
          violation_date?: string;
          resolution_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      penalties: {
        Row: {
          id: string;
          penalty_number: string;
          violation_id: string;
          operator_id: string;
          amount: number;
          issue_date: string;
          due_date: string;
          payment_date: string | null;
          status: "pending" | "paid" | "overdue" | "waived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          penalty_number: string;
          violation_id: string;
          operator_id: string;
          amount: number;
          issue_date: string;
          due_date: string;
          payment_date?: string | null;
          status?: "pending" | "paid" | "overdue" | "waived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          penalty_number?: string;
          violation_id?: string;
          operator_id?: string;
          amount?: number;
          issue_date?: string;
          due_date?: string;
          payment_date?: string | null;
          status?: "pending" | "paid" | "overdue" | "waived";
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          operator_id: string;
          vehicle_id: string | null;
          inspection_id: string | null;
          violation_id: string | null;
          document_name: string;
          document_type: string;
          file_path: string | null;
          file_size: number | null;
          mime_type: string | null;
          status: "pending_review" | "approved" | "rejected";
          uploaded_by: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          operator_id: string;
          vehicle_id?: string | null;
          inspection_id?: string | null;
          violation_id?: string | null;
          document_name: string;
          document_type: string;
          file_path?: string | null;
          file_size?: number | null;
          mime_type?: string | null;
          status?: "pending_review" | "approved" | "rejected";
          uploaded_by?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          operator_id?: string;
          vehicle_id?: string | null;
          inspection_id?: string | null;
          violation_id?: string | null;
          document_name?: string;
          document_type?: string;
          file_path?: string | null;
          file_size?: number | null;
          mime_type?: string | null;
          status?: "pending_review" | "approved" | "rejected";
          uploaded_by?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          asset_name: string;
          asset_type:
            | "bus_stop"
            | "terminal"
            | "depot"
            | "maintenance_facility"
            | "fuel_station";
          latitude: number | null;
          longitude: number | null;
          address: string | null;
          description: string | null;
          capacity: number | null;
          operational_status: boolean;
          operator_id: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          asset_name: string;
          asset_type:
            | "bus_stop"
            | "terminal"
            | "depot"
            | "maintenance_facility"
            | "fuel_station";
          latitude?: number | null;
          longitude?: number | null;
          address?: string | null;
          description?: string | null;
          capacity?: number | null;
          operational_status?: boolean;
          operator_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          asset_name?: string;
          asset_type?:
            | "bus_stop"
            | "terminal"
            | "depot"
            | "maintenance_facility"
            | "fuel_station";
          latitude?: number | null;
          longitude?: number | null;
          address?: string | null;
          description?: string | null;
          capacity?: number | null;
          operational_status?: boolean;
          operator_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          operator_id: string;
          title: string;
          description: string | null;
          priority: "low" | "medium" | "high";
          due_date: string | null;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          operator_id: string;
          title: string;
          description?: string | null;
          priority?: "low" | "medium" | "high";
          due_date?: string | null;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          operator_id?: string;
          title?: string;
          description?: string | null;
          priority?: "low" | "medium" | "high";
          due_date?: string | null;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          table_name: string;
          record_id: string | null;
          action: "INSERT" | "UPDATE" | "DELETE";
          old_values: Json | null;
          new_values: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          table_name: string;
          record_id?: string | null;
          action: "INSERT" | "UPDATE" | "DELETE";
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          table_name?: string;
          record_id?: string | null;
          action?: "INSERT" | "UPDATE" | "DELETE";
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_role: {
        Args: {
          user_uuid: string;
        };
        Returns: string;
      };
      get_user_operator_id: {
        Args: {
          user_uuid: string;
        };
        Returns: string;
      };
    };
    Enums: {
      user_role: "operator" | "admin" | "inspector";
      license_status: "active" | "pending" | "expired" | "suspended";
      inspection_status: "passed" | "failed" | "pending";
      violation_severity: "low" | "medium" | "high" | "critical";
      violation_status: "unresolved" | "in_review" | "resolved";
      penalty_status: "pending" | "paid" | "overdue" | "waived";
      document_status: "pending_review" | "approved" | "rejected";
      asset_type:
        | "bus_stop"
        | "terminal"
        | "depot"
        | "maintenance_facility"
        | "fuel_station";
      vehicle_status:
        | "active"
        | "maintenance"
        | "out_of_service"
        | "decommissioned";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
