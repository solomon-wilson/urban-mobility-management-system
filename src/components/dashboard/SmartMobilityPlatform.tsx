"use client";

import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
} from "recharts";
import {
	TrendingUp,
	TrendingDown,
	BarChart3,
	Activity,
	Users,
	Clock,
	MapPin,
	Zap,
	AlertTriangle,
	CheckCircle,
	RefreshCw,
	Brain,
	Route,
	Fuel,
	Calendar,
} from "lucide-react";

interface RouteData {
	route: string;
	efficiency: number;
	passengers: number;
	onTimePerformance: number;
	fuelConsumption: number;
}

interface TrafficPattern {
	hour: string;
	volume: number;
	avgDelay: number;
	congestionLevel: number;
}

interface PredictiveInsight {
	id: string;
	type: "maintenance" | "route" | "capacity" | "fuel";
	title: string;
	description: string;
	confidence: number;
	impact: "high" | "medium" | "low";
	recommendation: string;
}

const SmartMobilityPlatform: React.FC = () => {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [selectedTimeframe, setSelectedTimeframe] = useState("today");
	
	// Real-time metrics state
	const [realTimeMetrics, setRealTimeMetrics] = useState({
		activeVehicles: 35,
		totalPassengers: 1247,
		averageDelay: 3.2,
		routeEfficiency: 87,
		fuelEfficiency: 85,
		onTimePerformance: 92,
	});

	// Sample data for charts
	const routePerformanceData: RouteData[] = [
		{ route: "Route A", efficiency: 92, passengers: 245, onTimePerformance: 95, fuelConsumption: 12.5 },
		{ route: "Route B", efficiency: 87, passengers: 189, onTimePerformance: 88, fuelConsumption: 14.2 },
		{ route: "Route C", efficiency: 94, passengers: 312, onTimePerformance: 96, fuelConsumption: 11.8 },
		{ route: "Route D", efficiency: 83, passengers: 156, onTimePerformance: 82, fuelConsumption: 15.1 },
		{ route: "Route E", efficiency: 89, passengers: 201, onTimePerformance: 91, fuelConsumption: 13.4 },
	];

	const trafficPatternData: TrafficPattern[] = [
		{ hour: "06:00", volume: 45, avgDelay: 2.1, congestionLevel: 3 },
		{ hour: "07:00", volume: 85, avgDelay: 4.2, congestionLevel: 7 },
		{ hour: "08:00", volume: 120, avgDelay: 6.8, congestionLevel: 9 },
		{ hour: "09:00", volume: 95, avgDelay: 3.5, congestionLevel: 6 },
		{ hour: "10:00", volume: 65, avgDelay: 2.8, congestionLevel: 4 },
		{ hour: "11:00", volume: 70, avgDelay: 3.1, congestionLevel: 5 },
		{ hour: "12:00", volume: 90, avgDelay: 4.5, congestionLevel: 7 },
		{ hour: "13:00", volume: 88, avgDelay: 4.2, congestionLevel: 6 },
		{ hour: "14:00", volume: 75, avgDelay: 3.6, congestionLevel: 5 },
		{ hour: "15:00", volume: 82, avgDelay: 3.9, congestionLevel: 6 },
		{ hour: "16:00", volume: 98, avgDelay: 5.2, congestionLevel: 8 },
		{ hour: "17:00", volume: 115, avgDelay: 6.5, congestionLevel: 9 },
		{ hour: "18:00", volume: 105, avgDelay: 5.8, congestionLevel: 8 },
		{ hour: "19:00", volume: 70, avgDelay: 3.2, congestionLevel: 5 },
		{ hour: "20:00", volume: 50, avgDelay: 2.5, congestionLevel: 3 },
	];

	const capacityUtilizationData = [
		{ name: "Peak Hours", value: 85, color: "#ff6b6b" },
		{ name: "Off-Peak", value: 45, color: "#4ecdc4" },
		{ name: "Night Service", value: 25, color: "#45b7d1" },
		{ name: "Available", value: 15, color: "#f9ca24" },
	];

	const predictiveInsights: PredictiveInsight[] = [
		{
			id: "1",
			type: "maintenance",
			title: "Predictive Maintenance Alert",
			description: "Vehicle V-042 shows patterns indicating brake system maintenance needed",
			confidence: 92,
			impact: "high",
			recommendation: "Schedule brake inspection within 3 days to prevent service disruption",
		},
		{
			id: "2",
			type: "route",
			title: "Route Optimization Opportunity",
			description: "Route C can be optimized to reduce travel time by 12%",
			confidence: 87,
			impact: "medium",
			recommendation: "Implement suggested route changes during off-peak hours",
		},
		{
			id: "3",
			type: "capacity",
			title: "Capacity Planning Insight",
			description: "Increased demand projected for Routes A & E during holiday season",
			confidence: 85,
			impact: "medium",
			recommendation: "Deploy 2 additional vehicles to maintain service quality",
		},
		{
			id: "4",
			type: "fuel",
			title: "Fuel Efficiency Alert",
			description: "Fleet average fuel efficiency dropped 3% this week",
			confidence: 94,
			impact: "high",
			recommendation: "Review driver training and vehicle maintenance schedules",
		},
	];

	// Simulate real-time data updates
	useEffect(() => {
		const interval = setInterval(() => {
			setRealTimeMetrics(prev => ({
				activeVehicles: Math.max(30, Math.min(40, prev.activeVehicles + Math.floor(Math.random() * 3) - 1)),
				totalPassengers: Math.max(1000, Math.min(1500, prev.totalPassengers + Math.floor(Math.random() * 20) - 10)),
				averageDelay: Math.max(0, Math.min(10, prev.averageDelay + Math.random() * 0.4 - 0.2)),
				routeEfficiency: Math.max(80, Math.min(95, prev.routeEfficiency + Math.floor(Math.random() * 3) - 1)),
				fuelEfficiency: Math.max(75, Math.min(95, prev.fuelEfficiency + Math.floor(Math.random() * 3) - 1)),
				onTimePerformance: Math.max(85, Math.min(98, prev.onTimePerformance + Math.floor(Math.random() * 3) - 1)),
			}));
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await new Promise(resolve => setTimeout(resolve, 1000));
		setIsRefreshing(false);
	};

	const getImpactColor = (impact: string) => {
		switch (impact) {
			case "high": return "bg-red-100 text-red-800 border-red-200";
			case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "low": return "bg-blue-100 text-blue-800 border-blue-200";
			default: return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "maintenance": return <Activity className="h-4 w-4" />;
			case "route": return <Route className="h-4 w-4" />;
			case "capacity": return <Users className="h-4 w-4" />;
			case "fuel": return <Fuel className="h-4 w-4" />;
			default: return <Brain className="h-4 w-4" />;
		}
	};

	return (
		<div className="space-y-6 p-6 bg-background">
			{/* Header Section */}
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
						<BarChart3 className="h-8 w-8 text-primary" />
						Smart Mobility Platform
					</h1>
					<p className="text-muted-foreground mt-1">
						AI-powered analytics and route optimization insights
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						onClick={handleRefresh}
						disabled={isRefreshing}
					>
						<RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
						Refresh
					</Button>
					<Badge variant="outline" className="text-xs">
						<Activity className="h-3 w-3 mr-1" />
						Live Data
					</Badge>
				</div>
			</div>

			{/* Real-time Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
				<Card className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Active Vehicles</p>
								<p className="text-2xl font-bold">{realTimeMetrics.activeVehicles}</p>
							</div>
							<MapPin className="h-8 w-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Passengers</p>
								<p className="text-2xl font-bold">{realTimeMetrics.totalPassengers.toLocaleString()}</p>
							</div>
							<Users className="h-8 w-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Avg Delay (min)</p>
								<p className="text-2xl font-bold">{realTimeMetrics.averageDelay.toFixed(1)}</p>
							</div>
							<Clock className="h-8 w-8 text-orange-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Route Efficiency</p>
								<p className="text-2xl font-bold">{realTimeMetrics.routeEfficiency}%</p>
							</div>
							<TrendingUp className="h-8 w-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Fuel Efficiency</p>
								<p className="text-2xl font-bold">{realTimeMetrics.fuelEfficiency}%</p>
							</div>
							<Zap className="h-8 w-8 text-yellow-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">On-Time Performance</p>
								<p className="text-2xl font-bold">{realTimeMetrics.onTimePerformance}%</p>
							</div>
							<CheckCircle className="h-8 w-8 text-emerald-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Analytics Tabs */}
			<Tabs defaultValue="analytics" className="space-y-6">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="routes">Route Performance</TabsTrigger>
					<TabsTrigger value="traffic">Traffic Patterns</TabsTrigger>
					<TabsTrigger value="insights">AI Insights</TabsTrigger>
				</TabsList>

				{/* Analytics Tab */}
				<TabsContent value="analytics" className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Traffic Volume Chart */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BarChart3 className="h-5 w-5" />
									Hourly Traffic Volume
								</CardTitle>
								<CardDescription>
									Real-time passenger flow throughout the day
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-80">
									<ResponsiveContainer width="100%" height="100%">
										<AreaChart data={trafficPatternData}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="hour" />
											<YAxis />
											<Tooltip />
											<Area type="monotone" dataKey="volume" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
										</AreaChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>

						{/* Capacity Utilization */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Capacity Utilization
								</CardTitle>
								<CardDescription>
									Fleet capacity usage by time period
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-80">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie
												data={capacityUtilizationData}
												cx="50%"
												cy="50%"
												innerRadius={60}
												outerRadius={120}
												paddingAngle={5}
												dataKey="value"
											>
												{capacityUtilizationData.map((entry, index) => (
													<Cell key={`cell-${index}`} fill={entry.color} />
												))}
											</Pie>
											<Tooltip />
										</PieChart>
									</ResponsiveContainer>
								</div>
								<div className="grid grid-cols-2 gap-2 mt-4">
									{capacityUtilizationData.map((item, index) => (
										<div key={index} className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: item.color }}
											/>
											<span className="text-sm text-muted-foreground">
												{item.name}: {item.value}%
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Route Performance Tab */}
				<TabsContent value="routes" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Route className="h-5 w-5" />
								Route Performance Comparison
							</CardTitle>
							<CardDescription>
								Efficiency, passenger volume, and on-time performance by route
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-96">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={routePerformanceData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="route" />
										<YAxis />
										<Tooltip />
										<Bar dataKey="efficiency" fill="#8884d8" name="Efficiency %" />
										<Bar dataKey="onTimePerformance" fill="#82ca9d" name="On-Time %" />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					{/* Route Details Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{routePerformanceData.map((route, index) => (
							<Card key={index} className="hover:shadow-md transition-shadow">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg">{route.route}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Efficiency</span>
										<span className="font-semibold">{route.efficiency}%</span>
									</div>
									<Progress value={route.efficiency} className="h-2" />
									
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Passengers</span>
										<span className="font-semibold">{route.passengers}</span>
									</div>
									
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">On-Time</span>
										<span className="font-semibold">{route.onTimePerformance}%</span>
									</div>
									
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Fuel (L/100km)</span>
										<span className="font-semibold">{route.fuelConsumption}</span>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				{/* Traffic Patterns Tab */}
				<TabsContent value="traffic" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Activity className="h-5 w-5" />
								Traffic Patterns & Congestion Analysis
							</CardTitle>
							<CardDescription>
								Hourly traffic volume and average delays throughout the day
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-96">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={trafficPatternData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="hour" />
										<YAxis yAxisId="left" />
										<YAxis yAxisId="right" orientation="right" />
										<Tooltip />
										<Line yAxisId="left" type="monotone" dataKey="volume" stroke="#8884d8" strokeWidth={3} name="Traffic Volume" />
										<Line yAxisId="right" type="monotone" dataKey="avgDelay" stroke="#ff7300" strokeWidth={3} name="Avg Delay (min)" />
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* AI Insights Tab */}
				<TabsContent value="insights" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Brain className="h-5 w-5" />
								AI-Powered Predictive Insights
							</CardTitle>
							<CardDescription>
								Machine learning-based recommendations for optimization
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{predictiveInsights.map((insight) => (
								<Card key={insight.id} className="border-l-4 border-l-primary">
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between">
											<div className="flex items-center gap-3">
												{getTypeIcon(insight.type)}
												<div>
													<CardTitle className="text-base">{insight.title}</CardTitle>
													<CardDescription className="text-sm">
														{insight.description}
													</CardDescription>
												</div>
											</div>
											<Badge className={getImpactColor(insight.impact)}>
												{insight.impact.toUpperCase()}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className="pt-0">
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">Confidence Level</span>
												<span className="font-semibold">{insight.confidence}%</span>
											</div>
											<Progress value={insight.confidence} className="h-2" />
											<div className="bg-muted p-3 rounded-md">
												<p className="text-sm font-medium mb-1">Recommendation:</p>
												<p className="text-sm text-muted-foreground">{insight.recommendation}</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SmartMobilityPlatform;

