import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { For, createSignal  } from "solid-js";

class Leaflet {
  map: L.Map;
  drawnItems = new L.FeatureGroup();

  constructor(center: L.LatLngExpression, zoom?: number, maxZoom?: number) {
    this.map = L.map("map").setView(center, zoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: maxZoom,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);

    // add listener to add new layers when drawing shape
    this.map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
      const { layer } = e as L.DrawEvents.Created;
      this.drawnItems.addLayer(layer)
    });
  }

  addDrawControls(position: L.ControlPosition) {
    this.map.addLayer(this.drawnItems);

    const drawControl = new L.Control.Draw({
      position,
      draw: {
        polyline: false,
        polygon: {},
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: this.drawnItems,
        remove: true,
      },
    });

    this.map.addControl(drawControl);
  }

  addEventListener<T=L.LeafletEvent>(event: string, fn: (e: T, leaflet: Leaflet) => void) {
    this.map.on(event, (e) => fn(e as T, this))
  }
}

function layerToCords(layer: L.Circle | L.CircleMarker | L.Marker | L.Polygon | L.Polyline | L.Rectangle): string {
  const geojson = layer.toGeoJSON();
  const coordinates = geojson.geometry.coordinates[0].slice(0, -1);
  return JSON.stringify(coordinates);
}

function onCreate(event: L.DrawEvents.Created, leaflet: Leaflet) {
  const { layerType, layer } = event;

  if (layerType === "polygon") {
    console.log(layerToCords(layer))
  }

  leaflet.drawnItems.addLayer(layer);
}

export function App() {
  const [layers, setLayers] = createSignal([] as string[])

  const zoom = 16;
  const maxZoom = 20;
  const controlPosition = "bottomleft";

  const leaflet = new Leaflet([48.744992, 9.103155], zoom, maxZoom);
  leaflet.addDrawControls(controlPosition);
  leaflet.addEventListener<L.DrawEvents.Created>(L.Draw.Event.CREATED, (event, _) => {
    setLayers(layers().concat(layerToCords(event.layer)))
  });

  return (
    <>
      <h1>Vite + Solid</h1>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>

      <For each={layers()}>{(layer, i) =>
      <li>
        Layer {i()}
        <br/>
        <textarea>{layer}</textarea>
      </li>
    }</For>
    </>
  );
}
