"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  Shield,
  Activity,
  Users,
  MapPin,
  BarChart3,
  Zap,
  RefreshCw,
} from "lucide-react";

interface OperatorOverviewProps {
  operatorName?: string;
  licenseStatus?: "active" | "pending" | "expired" | "suspended";
  licenseNumber?: string;
  expiryDate?: string;
  complianceScore?: number;
  renewalNotifications?: Array<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
  }>;
  recentInspections?: Array<{
    id: string;
    date: string;
    type: string;
    status: "passed" | "failed" | "pending";
  }>;
  fleetMetrics?: {
    total: number;
    active: number;
    maintenance: number;
    outOfService: number;
  };
}

const OperatorOverview: React.FC<OperatorOverviewProps> = ({
  operatorName = "Sierra Transport Ltd",
  licenseStatus = "active",
  licenseNumber = "PTL-2023-0042",
  expiryDate = "2024-12-31",
  complianceScore = 87,
  renewalNotifications = [
    {
      id: "1",
      title: "License Renewal",
      description: "Your operator license will expire in 45 days",
      dueDate: "2024-12-31",
      priority: "medium",
    },
    {
      id: "2",
      title: "Vehicle Inspection Due",
      description: "5 vehicles require annual safety inspection",
      dueDate: "2024-08-15",
      priority: "high",
    },
    {
      id: "3",
      title: "Insurance Renewal",
      description: "Fleet insurance policy renewal",
      dueDate: "2024-09-30",
      priority: "medium",
    },
  ],
  recentInspections = [
    {
      id: "1",
      date: "2024-06-15",
      type: "Safety Compliance",
      status: "passed",
    },
    {
      id: "2",
      date: "2024-05-22",
      type: "Environmental Standards",
      status: "failed",
    },
    {
      id: "3",
      date: "2024-04-10",
      type: "Operational Review",
      status: "passed",
    },
  ],
  fleetMetrics = {
    total: 42,
    active: 35,
    maintenance: 5,
    outOfService: 2,
  },
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    activeRoutes: 12,
    passengerCount: 1247,
    avgDelay: 3.2,
    fuelEfficiency: 85,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        activeRoutes: prev.activeRoutes + Math.floor(Math.random() * 3) - 1,
        passengerCount:
          prev.passengerCount + Math.floor(Math.random() * 20) - 10,
        avgDelay: Math.max(0, prev.avgDelay + Math.random() * 0.4 - 0.2),
        fuelEfficiency: Math.min(
          100,
          Math.max(70, prev.fuelEfficiency + Math.floor(Math.random() * 6) - 3),
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };
  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "passed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
      case "suspended":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Helper function to determine priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-6">
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              {operatorName}
            </h1>
            <Badge
              className={`${getStatusColor(licenseStatus)} text-xs font-semibold px-3 py-1`}
            >
              {licenseStatus.charAt(0).toUpperCase() + licenseStatus.slice(1)}
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              License: {licenseNumber}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Expires: {expiryDate}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View License
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Clock className="h-4 w-4 mr-2" />
            Renew License
          </Button>
        </div>
      </div>

      {/* Real-time Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Active Routes
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {realTimeData.activeRoutes}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">
                  Passengers Today
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {realTimeData.passengerCount.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">
                  Avg Delay (min)
                </p>
                <p className="text-2xl font-bold text-yellow-900">
                  {realTimeData.avgDelay.toFixed(1)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">
                  Fuel Efficiency
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {realTimeData.fuelEfficiency}%
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Enhanced License Status Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              License Status
            </CardTitle>
            <CardDescription>
              Current license information and validity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status</span>
                <Badge className={getStatusColor(licenseStatus)}>
                  {licenseStatus.charAt(0).toUpperCase() +
                    licenseStatus.slice(1)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Expiry Date</span>
                <span className="text-sm">{expiryDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Days Remaining</span>
                <span className="text-sm font-semibold">
                  {Math.floor(
                    (new Date(expiryDate).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{" "}
                  days
                </span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">License Validity</span>
                  <span className="text-xs font-medium">
                    {Math.floor(
                      (new Date(expiryDate).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24),
                    ) > 90
                      ? "Good Standing"
                      : "Renewal Soon"}
                  </span>
                </div>
                <Progress
                  value={Math.min(
                    100,
                    Math.floor(
                      ((new Date(expiryDate).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24) /
                        365) *
                        100,
                    ),
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View License History
            </Button>
          </CardFooter>
        </Card>

        {/* Enhanced Compliance Metrics Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary" />
              Compliance Metrics
            </CardTitle>
            <CardDescription>Real-time compliance monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full w-24 h-24 border-8 border-primary/20 relative">
                  <div className="text-2xl font-bold">{complianceScore}%</div>
                  <svg
                    className="absolute top-0 left-0 w-24 h-24 -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="text-primary"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="46"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${complianceScore * 2.89} 289`}
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-medium">
                  {complianceScore >= 90
                    ? "Excellent"
                    : complianceScore >= 75
                      ? "Good"
                      : complianceScore >= 60
                        ? "Fair"
                        : "Needs Improvement"}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Safety Standards</span>
                  <Progress value={92} className="w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentation</span>
                  <Progress value={85} className="w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vehicle Condition</span>
                  <Progress value={78} className="w-24" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Detailed Report
            </Button>
          </CardFooter>
        </Card>

        {/* Enhanced Renewal Notifications Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Smart Notifications
              {renewalNotifications.filter((n) => n.priority === "high")
                .length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {
                    renewalNotifications.filter((n) => n.priority === "high")
                      .length
                  }{" "}
                  urgent
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              AI-powered renewal reminders and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {renewalNotifications.map((notification) => (
                <Alert key={notification.id} className="py-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <AlertTitle className="text-sm font-semibold flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        {notification.title}
                      </AlertTitle>
                      <AlertDescription className="text-xs mt-1">
                        {notification.description}
                      </AlertDescription>
                    </div>
                    <Badge className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Due: {notification.dueDate}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      Action
                    </Button>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Enhanced Tabbed Information */}
      <div className="mt-8">
        <Tabs defaultValue="inspections" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger
              value="inspections"
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Inspections
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Fleet Status
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Route Optimization
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inspections" className="mt-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Inspection History</span>
                  <Badge variant="outline" className="text-xs">
                    {recentInspections.length} total
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Recent compliance inspections and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Date</th>
                        <th className="text-left py-2 font-medium">Type</th>
                        <th className="text-left py-2 font-medium">Status</th>
                        <th className="text-right py-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentInspections.map((inspection) => (
                        <tr key={inspection.id} className="border-b">
                          <td className="py-2">{inspection.date}</td>
                          <td className="py-2">{inspection.type}</td>
                          <td className="py-2">
                            <Badge
                              className={getStatusColor(inspection.status)}
                            >
                              {inspection.status.charAt(0).toUpperCase() +
                                inspection.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-2 text-right">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All Inspections
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="fleet" className="mt-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Fleet Status</span>
                  <Badge variant="outline" className="text-xs">
                    {fleetMetrics.total} vehicles
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Real-time fleet metrics and operational status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Total Vehicles</p>
                    <p className="text-2xl font-bold mt-1">
                      {fleetMetrics.total}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-green-700">Active</p>
                    <p className="text-2xl font-bold mt-1 text-green-700">
                      {fleetMetrics.active}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-yellow-700">Maintenance</p>
                    <p className="text-2xl font-bold mt-1 text-yellow-700">
                      {fleetMetrics.maintenance}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-red-700">Out of Service</p>
                    <p className="text-2xl font-bold mt-1 text-red-700">
                      {fleetMetrics.outOfService}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Fleet Utilization</span>
                    <span className="text-sm font-medium">
                      {Math.round(
                        (fleetMetrics.active / fleetMetrics.total) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={Math.round(
                      (fleetMetrics.active / fleetMetrics.total) * 100,
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  Manage Fleet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* New Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Performance Trends</CardTitle>
                  <CardDescription>
                    Key performance indicators over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        On-time Performance
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Customer Satisfaction
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20" />
                        <span className="text-sm font-semibold">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Fuel Efficiency
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={realTimeData.fuelEfficiency}
                          className="w-20"
                        />
                        <span className="text-sm font-semibold">
                          {realTimeData.fuelEfficiency}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Safety Score</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20" />
                        <span className="text-sm font-semibold">95%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Revenue Insights</CardTitle>
                  <CardDescription>
                    Financial performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        Monthly Revenue
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        $45,230
                      </p>
                      <p className="text-xs text-green-600">
                        +12% from last month
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">
                        Operating Costs
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        $32,150
                      </p>
                      <p className="text-xs text-blue-600">
                        -5% from last month
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-700 font-medium">
                        Net Profit
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        $13,080
                      </p>
                      <p className="text-xs text-purple-600">
                        +28% from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Financial Dashboard
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* New Route Optimization Tab */}
          <TabsContent value="routes" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Route Efficiency</CardTitle>
                  <CardDescription>
                    AI-powered route optimization insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="border-blue-200 bg-blue-50">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">
                        Optimization Suggestion
                      </AlertTitle>
                      <AlertDescription className="text-blue-700">
                        Route 15A can be optimized to reduce travel time by 8
                        minutes during peak hours.
                      </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Active Routes</p>
                        <p className="text-xl font-bold">
                          {realTimeData.activeRoutes}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Avg Speed</p>
                        <p className="text-xl font-bold">32 km/h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Open Route Planner
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Passenger Flow</CardTitle>
                  <CardDescription>
                    Real-time passenger analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Peak Hours</span>
                      <Badge variant="outline">7-9 AM, 5-7 PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Busiest Route</span>
                      <Badge variant="default">Route 12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Capacity Utilization
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-20" />
                        <span className="text-sm font-semibold">78%</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-700 font-medium">
                        Today's Passengers
                      </p>
                      <p className="text-2xl font-bold text-yellow-900">
                        {realTimeData.passengerCount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Passenger Analytics
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OperatorOverview;
