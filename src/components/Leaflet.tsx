import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { onMount } from "solid-js";
import { DrawnItemsStore, ShapeStore } from "../store";

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
  const [shapes, setShapes] = ShapeStore;
  const drawnItems = DrawnItemsStore[0]();

  const mapContainer = (
    <div id="map" style="width: 800px; height: 600px; border: 1px solid #ccc" />
  );

  // initialize map
  const map = L.map(mapContainer as HTMLElement).setView(center, zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: maxZoom,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // add draw control overlay to map
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
    const { layer, layerType } = e as L.DrawEvents.Created;
    drawnItems.addLayer(layer);

    // add custom event listener to check when shapes are created
    if (layerType == "polygon") {
      const id = drawnItems.getLayerId(layer);
      const name = `Shape ${id}`;
      setShapes([...shapes(), { id, name, layer }]);
    }
  });

  // notify parent component when layers are modified
  map.on(L.Draw.Event.EDITED, (e: L.LeafletEvent) => {
    const { layers } = e as L.DrawEvents.Edited;
    layers.eachLayer((layer) => {
      const id = drawnItems.getLayerId(layer);
      setShapes(
        shapes().map((shape) => {
          if (shape.id === id) return { ...shape, layer };
          return shape;
        })
      );
    });
  });

  // notify parent component when layers are modified
  map.on(L.Draw.Event.DELETED, (e: L.LeafletEvent) => {
    const { layers } = e as L.DrawEvents.Deleted;
    layers.eachLayer((layer) => {
      const id = drawnItems.getLayerId(layer);
      setShapes(shapes().filter((shape) => shape.id !== id));
    });
  });

  // trigger resize to properly scale the map
  onMount(() => map.invalidateSize());

  return mapContainer;
}
