import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { JSX, createEffect, onMount } from "solid-js";
import { DrawnItemsStore, ShapeStore } from "../store";

interface LeafletProps extends JSX.HTMLAttributes<HTMLDivElement> {
  center: L.LatLngExpression;
  zoom?: number;
  drawControPosition?: L.ControlPosition;
}

export function Leaflet({ center, zoom, drawControPosition, ...props }: LeafletProps) {
  const [shapes, setShapes] = ShapeStore;
  const drawnItems = DrawnItemsStore[0]();

  const MapContainer = <div {...props} id="map" />;

  // initialize map
  const map = L.map(MapContainer as HTMLElement, { pmIgnore: false }).setView(center, zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 10,
    maxNativeZoom: 18,
    maxZoom: 23,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // when loading the map, the shapes from the store are added to the map
  createEffect(() => {
    shapes().forEach((shape) => {
      drawnItems.addLayer(shape.layer);
    });
  });

  // add draw control overlay to map
  map.addLayer(drawnItems);

  map.pm.addControls({
    position: "topleft",
    drawCircleMarker: false,
    rotateMode: false,
    drawText: false,
    drawCircle: false,
  });

  // listen to when a new layer is created
  map.on("pm:create", function (e) {
    console.log("create", e.layer._leaflet_id);
    setShapes([
      ...shapes(),
      { id: e.layer._leaflet_id, name: `Shape ${e.layer._leaflet_id}`, type: e.shape, layer: e.layer },
    ]);

    // listen to changes on the new layer
    e.layer.on("pm:update", function (x) {
      console.log("edit", x.layer._leaflet_id);
      setShapes(
        shapes().map((shape) => {
          if (shape.id === e.layer._leaflet_id) return { ...shape, layer: e.layer };
          return shape;
        }),
      );
    });

    // listen to when a layer is removed
    e.layer.on("pm:remove", function (x) {
      console.log("remove", x.layer._leaflet_id);
      setShapes(shapes().filter((shape) => shape.id !== e.layer._leaflet_id));
    });
  });

  // trigger resize to properly scale the map
  onMount(() => map.invalidateSize());

  return MapContainer;
}
