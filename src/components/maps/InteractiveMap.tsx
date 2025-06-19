"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

interface InteractiveMapProps {
	assets: Asset[];
	onAssetClick?: (asset: Asset) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ assets, onAssetClick }) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const markersRef = useRef<L.LayerGroup | null>(null);

	// Custom marker icons for different asset types
	const getCustomIcon = (asset: Asset) => {
		const iconColor = asset.status === 'operational' ? '#22c55e' : 
										 asset.status === 'maintenance' ? '#eab308' : '#ef4444';
		
		const iconMap = {
			bus_stop: '🚏',
			terminal: '🏢',
			depot: '🏭',
			maintenance_facility: '🔧',
			fuel_station: '⛽'
		};

		return L.divIcon({
			html: `
				<div style="
					background: ${iconColor};
					width: 30px;
					height: 30px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					border: 3px solid white;
					box-shadow: 0 2px 6px rgba(0,0,0,0.3);
					cursor: pointer;
				">
					${iconMap[asset.type]}
				</div>
			`,
			className: 'custom-marker',
			iconSize: [30, 30],
			iconAnchor: [15, 15],
			popupAnchor: [0, -15]
		});
	};

	// Initialize map
	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		// Center map on Freetown, Sierra Leone
		const map = L.map(mapRef.current).setView([8.4657, -13.2317], 12);

		// Add OpenStreetMap tile layer
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors',
			maxZoom: 19,
		}).addTo(map);

		// Create layer group for markers
		const markersLayer = L.layerGroup().addTo(map);

		mapInstanceRef.current = map;
		markersRef.current = markersLayer;

		return () => {
			map.remove();
			mapInstanceRef.current = null;
			markersRef.current = null;
		};
	}, []);

	// Update markers when assets change
	useEffect(() => {
		if (!mapInstanceRef.current || !markersRef.current) return;

		// Clear existing markers
		markersRef.current.clearLayers();

		// Add markers for each asset
		assets.forEach(asset => {
			const marker = L.marker(
				[asset.coordinates.lat, asset.coordinates.lng],
				{ icon: getCustomIcon(asset) }
			);

			// Create popup content
			const popupContent = `
				<div style="min-width: 200px;">
					<h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${asset.name}</h3>
					<div style="margin-bottom: 8px;">
						<span style="
							background: ${asset.status === 'operational' ? '#dcfce7' : 
													asset.status === 'maintenance' ? '#fef3c7' : '#fee2e2'};
							color: ${asset.status === 'operational' ? '#166534' : 
											 asset.status === 'maintenance' ? '#92400e' : '#991b1b'};
							padding: 2px 8px;
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
							margin-top: 8px;
						"
					>
						View Details
					</button>
				</div>
			`;

			marker.bindPopup(popupContent, {
				maxWidth: 300,
				className: 'custom-popup'
			});

			// Add click handler
			marker.on('click', () => {
				if (onAssetClick) {
					onAssetClick(asset);
				}
			});

			markersRef.current!.addLayer(marker);
		});

		// Fit map to show all assets if there are any
		if (assets.length > 0) {
			const group = new L.featureGroup(markersRef.current.getLayers());
			mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
		}

	}, [assets, onAssetClick]);

	// Global function for popup button clicks
	useEffect(() => {
		(window as any).selectAsset = (assetId: string) => {
			const asset = assets.find(a => a.id === assetId);
			if (asset && onAssetClick) {
				onAssetClick(asset);
			}
		};

		return () => {
			delete (window as any).selectAsset;
		};
	}, [assets, onAssetClick]);

	return (
		<div 
			ref={mapRef} 
			className="w-full h-full rounded-lg"
			style={{ minHeight: '400px' }}
		/>
	);
};

export default InteractiveMap;

