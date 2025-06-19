"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Loader2 } from 'lucide-react';

interface Asset {
	id: string;
	name: string;
	type: "bus_stop" | "terminal" | "depot" | "maintenance_facility" | "fuel_station";
	address: string;
	coordinates: { lat: number; lng: number };
	status: "operational" | "maintenance" | "decommissioned";
	capacity?: number;
	description?: string;
	lastUpdated: string;
}

interface GoogleMapsViewProps {
	assets: Asset[];
	onAssetClick?: (asset: Asset) => void;
}

// Map component that renders the actual Google Map
const MapComponent: React.FC<GoogleMapsViewProps> = ({ assets, onAssetClick }) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<google.maps.Map | null>(null);
	const markersRef = useRef<google.maps.Marker[]>([]);

	// Custom marker icons for different asset types and statuses
	const getMarkerIcon = (asset: Asset): google.maps.Icon => {
		const statusColor = asset.status === 'operational' ? '#22c55e' : 
										    asset.status === 'maintenance' ? '#eab308' : '#ef4444';
		
		const typeIcons = {
			bus_stop: '🚏',
			terminal: '🏢',
			depot: '🏭',
			maintenance_facility: '🔧',
			fuel_station: '⛽'
		};

		// Create a custom SVG icon
		const svgIcon = `
			<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
				<circle cx="20" cy="20" r="18" fill="${statusColor}" stroke="white" stroke-width="3"/>
				<text x="20" y="26" text-anchor="middle" font-size="16">${typeIcons[asset.type]}</text>
			</svg>
		`;

		return {
			url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
			scaledSize: new google.maps.Size(40, 40),
			anchor: new google.maps.Point(20, 20),
		};
	};

	// Initialize map
	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		// Center on Freetown, Sierra Leone
		const map = new google.maps.Map(mapRef.current, {
			center: { lat: 8.4657, lng: -13.2317 },
			zoom: 12,
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.TOP_CENTER,
				mapTypeIds: [
					google.maps.MapTypeId.ROADMAP,
					google.maps.MapTypeId.SATELLITE,
					google.maps.MapTypeId.HYBRID,
					google.maps.MapTypeId.TERRAIN
				]
			},
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_TOP
			},
			fullscreenControl: true,
			fullscreenControlOptions: {
				position: google.maps.ControlPosition.TOP_RIGHT
			},
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			styles: [
				{
					featureType: "poi",
					elementType: "labels",
					stylers: [{ visibility: "on" }]
				}
			]
		});

		mapInstanceRef.current = map;

		return () => {
			// Cleanup markers
			markersRef.current.forEach(marker => marker.setMap(null));
			markersRef.current = [];
		};
	}, []);

	// Update markers when assets change
	useEffect(() => {
		if (!mapInstanceRef.current) return;

		// Clear existing markers
		markersRef.current.forEach(marker => marker.setMap(null));
		markersRef.current = [];

		// Create info window
		const infoWindow = new google.maps.InfoWindow();

		// Add markers for each asset
		assets.forEach(asset => {
			const marker = new google.maps.Marker({
				position: { lat: asset.coordinates.lat, lng: asset.coordinates.lng },
				map: mapInstanceRef.current!,
				title: asset.name,
				icon: getMarkerIcon(asset),
				animation: google.maps.Animation.DROP,
			});

			// Create info window content
			const infoContent = `
				<div style="min-width: 250px; padding: 8px;">
					<h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937; font-size: 16px;">
						${asset.name}
					</h3>
					<div style="margin-bottom: 8px;">
						<span style="
							background: ${asset.status === 'operational' ? '#dcfce7' : 
													asset.status === 'maintenance' ? '#fef3c7' : '#fee2e2'};
							color: ${asset.status === 'operational' ? '#166534' : 
											 asset.status === 'maintenance' ? '#92400e' : '#991b1b'};
							padding: 4px 8px;
							border-radius: 12px;
							font-size: 12px;
							font-weight: 500;
						">${asset.status}</span>
					</div>
					<p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
						<strong>Type:</strong> ${asset.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
					</p>
					<p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
						<strong>Address:</strong> ${asset.address}
					</p>
					${asset.capacity ? `<p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
						<strong>Capacity:</strong> ${asset.capacity}
					</p>` : ''}
					${asset.description ? `<p style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">
						${asset.description}
					</p>` : ''}
					<div style="margin-top: 12px; display: flex; gap: 8px;">
						<button 
							onclick="window.selectAsset('${asset.id}')"
							style="
								background: #3b82f6;
								color: white;
								border: none;
								padding: 6px 12px;
								border-radius: 6px;
								font-size: 12px;
								cursor: pointer;
								font-weight: 500;
							"
						>
							View Details
						</button>
						<button 
							onclick="window.showStreetView(${asset.coordinates.lat}, ${asset.coordinates.lng})"
							style="
								background: #10b981;
								color: white;
								border: none;
								padding: 6px 12px;
								border-radius: 6px;
								font-size: 12px;
								cursor: pointer;
								font-weight: 500;
							"
						>
							Street View
						</button>
					</div>
				</div>
			`;

			// Add click listener for marker
			marker.addListener('click', () => {
				infoWindow.setContent(infoContent);
				infoWindow.open(mapInstanceRef.current!, marker);
				
				if (onAssetClick) {
					onAssetClick(asset);
				}
			});

			markersRef.current.push(marker);
		});

		// Fit map to show all markers if there are any
		if (assets.length > 0) {
			const bounds = new google.maps.LatLngBounds();
			assets.forEach(asset => {
				bounds.extend({ lat: asset.coordinates.lat, lng: asset.coordinates.lng });
			});
			mapInstanceRef.current.fitBounds(bounds);
			
			// Ensure minimum zoom level
			const listener = google.maps.event.addListener(mapInstanceRef.current, "idle", () => {
				if (mapInstanceRef.current!.getZoom()! > 15) {
					mapInstanceRef.current!.setZoom(15);
				}
				google.maps.event.removeListener(listener);
			});
		}

	}, [assets, onAssetClick]);

	// Global functions for info window buttons
	useEffect(() => {
		(window as any).selectAsset = (assetId: string) => {
			const asset = assets.find(a => a.id === assetId);
			if (asset && onAssetClick) {
				onAssetClick(asset);
			}
		};

		(window as any).showStreetView = (lat: number, lng: number) => {
			if (mapInstanceRef.current) {
				const streetViewService = new google.maps.StreetViewService();
				streetViewService.getPanorama({
					location: { lat, lng },
					radius: 50
				}, (data, status) => {
					if (status === google.maps.StreetViewStatus.OK) {
						const panorama = mapInstanceRef.current!.getStreetView();
						panorama.setPosition({ lat, lng });
						panorama.setVisible(true);
					}
				});
			}
		};

		return () => {
			delete (window as any).selectAsset;
			delete (window as any).showStreetView;
		};
	}, [assets, onAssetClick]);

	return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

// Loading component
const MapLoadingComponent = () => (
	<div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
		<div className="text-center space-y-4">
			<Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
			<p className="text-sm text-muted-foreground">Loading Google Maps...</p>
		</div>
	</div>
);

// Error component
const MapErrorComponent = ({ status }: { status: Status }) => (
	<div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg">
		<div className="text-center space-y-2">
			<p className="text-sm font-medium text-red-800">Failed to load Google Maps</p>
			<p className="text-xs text-red-600">Status: {status}</p>
		</div>
	</div>
);

// Main wrapper component
const GoogleMapsView: React.FC<GoogleMapsViewProps> = ({ assets, onAssetClick }) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		return (
			<div className="w-full h-full flex items-center justify-center bg-yellow-50 rounded-lg">
				<div className="text-center space-y-2">
					<p className="text-sm font-medium text-yellow-800">Google Maps API key not found</p>
					<p className="text-xs text-yellow-600">Please add GOOGLE_MAPS_API_KEY to your environment variables</p>
				</div>
			</div>
		);
	}

	const render = (status: Status) => {
		switch (status) {
			case Status.LOADING:
				return <MapLoadingComponent />;
			case Status.FAILURE:
				return <MapErrorComponent status={status} />;
			case Status.SUCCESS:
				return <MapComponent assets={assets} onAssetClick={onAssetClick} />;
			default:
				return <MapLoadingComponent />;
		}
	};

	return (
		<Wrapper
			apiKey={apiKey}
			render={render}
			libraries={['places', 'geometry']}
			version="beta"
		/>
	);
};

export default GoogleMapsView;

