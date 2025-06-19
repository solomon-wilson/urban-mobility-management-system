"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import dynamic from "next/dynamic";
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Search,
  Filter,
  Plus,
  Navigation,
  Bus,
  Building,
  Fuel,
  Wrench,
  Eye,
  Edit,
  Trash2,
<<<<<<< HEAD
} from "lucide-react";

=======
  Loader2,
  Layers,
  Maximize,
} from "lucide-react";

// Dynamic imports for map components (client-side only)
const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

const GoogleMapsView = dynamic(() => import('./GoogleMapsView'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
interface Asset {
  id: string;
  name: string;
  type:
    | "bus_stop"
    | "terminal"
    | "depot"
    | "maintenance_facility"
    | "fuel_station";
  address: string;
  coordinates: { lat: number; lng: number };
  status: "operational" | "maintenance" | "decommissioned";
  capacity?: number;
  description?: string;
  lastUpdated: string;
}

interface AssetMapViewProps {
  assets?: Asset[];
}

const AssetMapView: React.FC<AssetMapViewProps> = ({
  assets: initialAssets = [
    {
      id: "1",
      name: "Central Bus Terminal",
      type: "terminal",
<<<<<<< HEAD
      address: "123 Main Street, Freetown",
=======
      address: "Siaka Stevens Street, Central Freetown",
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
      coordinates: { lat: 8.4657, lng: -13.2317 },
      status: "operational",
      capacity: 500,
      description: "Main terminal for city routes",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "Victoria Park Bus Stop",
      type: "bus_stop",
<<<<<<< HEAD
      address: "Victoria Park, Freetown",
      coordinates: { lat: 8.4701, lng: -13.2364 },
      status: "operational",
      capacity: 50,
      description: "High-traffic bus stop near park",
=======
      address: "Victoria Park, Central Freetown",
      coordinates: { lat: 8.4701, lng: -13.2364 },
      status: "operational",
      capacity: 50,
      description: "High-traffic bus stop near Victoria Park",
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
      lastUpdated: "2024-01-10",
    },
    {
      id: "3",
      name: "East End Depot",
      type: "depot",
<<<<<<< HEAD
      address: "45 Industrial Road, Freetown",
=======
      address: "Kissy Road, East End",
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
      coordinates: { lat: 8.4612, lng: -13.2156 },
      status: "operational",
      capacity: 100,
      description: "Vehicle storage and dispatch center",
      lastUpdated: "2024-01-12",
    },
    {
      id: "4",
      name: "Downtown Maintenance Hub",
      type: "maintenance_facility",
<<<<<<< HEAD
      address: "78 Service Lane, Freetown",
=======
      address: "Pademba Road, Central Freetown",
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
      coordinates: { lat: 8.4689, lng: -13.2298 },
      status: "operational",
      capacity: 25,
      description: "Primary vehicle maintenance facility",
      lastUpdated: "2024-01-08",
    },
    {
      id: "5",
      name: "West Fuel Station",
      type: "fuel_station",
<<<<<<< HEAD
      address: "92 West Avenue, Freetown",
=======
      address: "Wilkinson Road, West End",
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
      coordinates: { lat: 8.4634, lng: -13.2445 },
      status: "maintenance",
      capacity: 10,
      description: "Fleet refueling station - under maintenance",
      lastUpdated: "2024-01-05",
    },
<<<<<<< HEAD
=======
    {
      id: "6",
      name: "Lumley Beach Terminal",
      type: "terminal",
      address: "Lumley Beach Road, Aberdeen",
      coordinates: { lat: 8.4521, lng: -13.2789 },
      status: "operational",
      capacity: 200,
      description: "Coastal terminal serving western areas",
      lastUpdated: "2024-01-14",
    },
    {
      id: "7",
      name: "Murray Town Bus Stop",
      type: "bus_stop",
      address: "Murray Town Road, Murray Town",
      coordinates: { lat: 8.4523, lng: -13.2556 },
      status: "operational",
      capacity: 30,
      description: "Community bus stop serving Murray Town",
      lastUpdated: "2024-01-11",
    },
    {
      id: "8",
      name: "Wellington Depot",
      type: "depot",
      address: "Wellington Industrial Area",
      coordinates: { lat: 8.4398, lng: -13.1867 },
      status: "operational",
      capacity: 150,
      description: "Secondary depot for eastern routes",
      lastUpdated: "2024-01-13",
    },
    {
      id: "9",
      name: "Congo Cross Bus Stop",
      type: "bus_stop",
      address: "Congo Cross, Hill Station",
      coordinates: { lat: 8.4789, lng: -13.2234 },
      status: "operational",
      capacity: 40,
      description: "Important transfer point for hill routes",
      lastUpdated: "2024-01-09",
    },
    {
      id: "10",
      name: "Aberdeen Fuel Station",
      type: "fuel_station",
      address: "Aberdeen Ferry Junction",
      coordinates: { lat: 8.4467, lng: -13.2678 },
      status: "operational",
      capacity: 15,
      description: "Strategic fuel station near ferry terminal",
      lastUpdated: "2024-01-07",
    },
    {
      id: "11",
      name: "Mountain Cut Maintenance",
      type: "maintenance_facility",
      address: "Mountain Cut Road, Hill Station",
      coordinates: { lat: 8.4823, lng: -13.2089 },
      status: "decommissioned",
      capacity: 20,
      description: "Former maintenance facility - decommissioned",
      lastUpdated: "2024-01-06",
    },
    {
      id: "12",
      name: "Kissy Terminal",
      type: "terminal",
      address: "Kissy Road, Kissy",
      coordinates: { lat: 8.4578, lng: -13.2034 },
      status: "operational",
      capacity: 300,
      description: "Eastern terminal serving Kissy and beyond",
      lastUpdated: "2024-01-16",
    },
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
  ],
}) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(initialAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [mapView, setMapView] = useState<"list" | "map">("list");
<<<<<<< HEAD
=======
  const [mapProvider, setMapProvider] = useState<"leaflet" | "google">("google");
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)

  // Filter assets based on search and filters
  useEffect(() => {
    let filtered = assets;

    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.address.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((asset) => asset.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((asset) => asset.status === filterStatus);
    }

    setFilteredAssets(filtered);
  }, [assets, searchTerm, filterType, filterStatus]);

  const getAssetIcon = (type: Asset["type"]) => {
    switch (type) {
      case "bus_stop":
        return Bus;
      case "terminal":
        return Building;
      case "depot":
        return Building;
      case "maintenance_facility":
        return Wrench;
      case "fuel_station":
        return Fuel;
      default:
        return MapPin;
    }
  };

  const getStatusColor = (status: Asset["status"]) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800 border-green-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "decommissioned":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: Asset["type"]) => {
    return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg border">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Asset Mapping System
          </h2>
          <p className="text-muted-foreground">
            Interactive infrastructure management and tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={mapView === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("list")}
          >
            List View
          </Button>
          <Button
            variant={mapView === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("map")}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Register a new transport infrastructure asset.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assetName">Asset Name</Label>
                    <Input id="assetName" placeholder="Enter asset name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assetType">Asset Type</Label>
                    <Select>
                      <SelectTrigger id="assetType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bus_stop">Bus Stop</SelectItem>
                        <SelectItem value="terminal">Terminal</SelectItem>
                        <SelectItem value="depot">Depot</SelectItem>
                        <SelectItem value="maintenance_facility">
                          Maintenance Facility
                        </SelectItem>
                        <SelectItem value="fuel_station">
                          Fuel Station
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter full address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="8.4657"
                      type="number"
                      step="any"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="-13.2317"
                      type="number"
                      step="any"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    placeholder="Enter capacity"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter asset description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button>Add Asset</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="bus_stop">Bus Stops</SelectItem>
              <SelectItem value="terminal">Terminals</SelectItem>
              <SelectItem value="depot">Depots</SelectItem>
              <SelectItem value="maintenance_facility">Maintenance</SelectItem>
              <SelectItem value="fuel_station">Fuel Stations</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="decommissioned">Decommissioned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Asset Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="text-2xl font-bold">{assets.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Operational</p>
            <p className="text-2xl font-bold text-green-600">
              {assets.filter((a) => a.status === "operational").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Maintenance</p>
            <p className="text-2xl font-bold text-yellow-600">
              {assets.filter((a) => a.status === "maintenance").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Bus Stops</p>
            <p className="text-2xl font-bold text-blue-600">
              {assets.filter((a) => a.type === "bus_stop").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Terminals</p>
            <p className="text-2xl font-bold text-purple-600">
              {assets.filter((a) => a.type === "terminal").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Area */}
      {mapView === "list" ? (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => {
            const Icon = getAssetIcon(asset.type);
            return (
              <Card
                key={asset.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{asset.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(asset.type)}
                    </Badge>
                    {asset.capacity && <span>Capacity: {asset.capacity}</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {asset.address}
                    </p>
                    {asset.description && (
                      <p className="text-sm">{asset.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Last updated: {asset.lastUpdated}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="h-4 w-4 mr-1" />
                      Navigate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
<<<<<<< HEAD
        /* Map View Placeholder */
        <Card className="h-96">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <Navigation className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Interactive Map View</h3>
                <p className="text-muted-foreground">
                  Map integration with Leaflet/React-Leaflet coming soon...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Will display all {filteredAssets.length} assets with
                  clustering and real-time updates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
=======
        /* Interactive Map View */
        <div className="space-y-4">
          {/* Map Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs">
                    <Layers className="h-3 w-3 mr-1" />
                    Showing {filteredAssets.length} assets
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      Operational ({assets.filter(a => a.status === 'operational').length})
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      Maintenance ({assets.filter(a => a.status === 'maintenance').length})
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      Decommissioned ({assets.filter(a => a.status === 'decommissioned').length})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <Button 
                      variant={mapProvider === "google" ? "default" : "ghost"}
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setMapProvider("google")}
                    >
                      Google Maps
                    </Button>
                    <Button 
                      variant={mapProvider === "leaflet" ? "default" : "ghost"}
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setMapProvider("leaflet")}
                    >
                      OpenStreetMap
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Container */}
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              {mapProvider === "google" ? (
                <GoogleMapsView assets={filteredAssets} onAssetClick={setSelectedAsset} />
              ) : (
                <InteractiveMap assets={filteredAssets} onAssetClick={setSelectedAsset} />
              )}
            </CardContent>
          </Card>
        </div>
>>>>>>> 049e20b (Updated codebase with improve UI/UX, interactive maps)
      )}

      {/* Asset Detail Dialog */}
      {selectedAsset && (
        <Dialog
          open={!!selectedAsset}
          onOpenChange={() => setSelectedAsset(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {React.createElement(getAssetIcon(selectedAsset.type), {
                  className: "h-5 w-5 text-primary",
                })}
                {selectedAsset.name}
              </DialogTitle>
              <DialogDescription>
                Detailed information for this asset
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="text-sm">{getTypeLabel(selectedAsset.type)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedAsset.status)}>
                    {selectedAsset.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm">{selectedAsset.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Coordinates</Label>
                  <p className="text-sm">
                    {selectedAsset.coordinates.lat},{" "}
                    {selectedAsset.coordinates.lng}
                  </p>
                </div>
                {selectedAsset.capacity && (
                  <div>
                    <Label className="text-sm font-medium">Capacity</Label>
                    <p className="text-sm">{selectedAsset.capacity}</p>
                  </div>
                )}
              </div>
              {selectedAsset.description && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm">{selectedAsset.description}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Last Updated</Label>
                <p className="text-sm">{selectedAsset.lastUpdated}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAsset(null)}>
                Close
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Asset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AssetMapView;
