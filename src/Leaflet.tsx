

import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { onMount } from "solid-js";

interface LeafletProps {
  center: L.LatLngExpression;
  zoom?: number;
  maxZoom?: number;
  drawControPosition?: L.ControlPosition;
}

export function Leaflet({
  center,
  zoom,
  maxZoom,
  drawControPosition,
}: LeafletProps) {
  const mapContainer = <div id="map" style="width: 800px; height: 600px; border: 1px solid #ccc" />;

  // initialize map
  const map = L.map(mapContainer as HTMLElement).setView(center, zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: maxZoom,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // add draw control overlay to map
  const drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    position: drawControPosition,
    draw: {
      polyline: false,
      polygon: {},
      rectangle: false,
      circle: false,
      circlemarker: false,
      marker: false,
    },
    edit: {
      featureGroup: drawnItems,
      remove: true,
    },
  });

  map.addControl(drawControl);

  // add listener to add new layers when drawing shape
  map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
    const { layer } = e as L.DrawEvents.Created;
    drawnItems.addLayer(layer);
  });

  // trigger resize to properly scale the map
  onMount(() => map.invalidateSize())

  return mapContainer;
}
