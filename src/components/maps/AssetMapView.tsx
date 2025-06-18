"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

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
      address: "123 Main Street, Freetown",
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
      address: "Victoria Park, Freetown",
      coordinates: { lat: 8.4701, lng: -13.2364 },
      status: "operational",
      capacity: 50,
      description: "High-traffic bus stop near park",
      lastUpdated: "2024-01-10",
    },
    {
      id: "3",
      name: "East End Depot",
      type: "depot",
      address: "45 Industrial Road, Freetown",
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
      address: "78 Service Lane, Freetown",
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
      address: "92 West Avenue, Freetown",
      coordinates: { lat: 8.4634, lng: -13.2445 },
      status: "maintenance",
      capacity: 10,
      description: "Fleet refueling station - under maintenance",
      lastUpdated: "2024-01-05",
    },
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
