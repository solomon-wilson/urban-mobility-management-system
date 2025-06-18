"use client";

import { useAuth } from "@/components/auth/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <DashboardLayout /> : <LoginForm />;
}
