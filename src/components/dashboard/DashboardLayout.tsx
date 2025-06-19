"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import OperatorOverview from "@/components/dashboard/OperatorOverview";
import AssetMapView from "@/components/maps/AssetMapView";
import ComplianceModule from "@/components/compliance/ComplianceModule";
<<<<<<< HEAD
=======
import SmartMobilityPlatform from "@/components/dashboard/SmartMobilityPlatform";
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Map,
  Shield,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      component: <OperatorOverview />,
    },
    {
      id: "assets",
      label: "Asset Mapping",
      icon: Map,
      component: <AssetMapView />,
    },
    {
      id: "compliance",
      label: "Compliance",
      icon: Shield,
      component: <ComplianceModule />,
    },
    {
      id: "analytics",
      label: "Smart Mobility",
      icon: BarChart3,
<<<<<<< HEAD
      component: (
        <Card className="w-full bg-background">
          <CardHeader>
            <CardTitle>Smart Mobility Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Advanced analytics and route optimization features coming soon...
            </p>
          </CardContent>
        </Card>
      ),
=======
      component: <SmartMobilityPlatform />,
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
    },
  ];

  const currentItem = navigationItems.find((item) => item.id === activeTab);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h2 className="text-lg font-semibold">Transport Hub</h2>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.role}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b bg-card">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">{currentItem?.label}</h1>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          {currentItem?.component || children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
