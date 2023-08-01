import L from "leaflet";
import { createStore } from "solid-js/store";
import { Leaflet } from "./Leaflet";
import { For } from "solid-js";

interface Shape {
  id: number;
  layer: L.Layer;
}

function ShapeCords({ layer }: { layer: L.Layer }) {
  const geojson = (layer as L.Polygon).toGeoJSON();
  const coordinates = geojson.geometry.coordinates[0].slice(0, -1);
  return (
    <ul>
      <For each={coordinates}>
        {([lat, long]) => (
          <li>
            Lat: {lat}, Long: {long}
          </li>
        )}
      </For>
    </ul>
  );
}

export function App() {
  const [shapes, setShapes] = createStore<Shape[]>([]);
  return (
    <>
      <h1>Vite + Solid</h1>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
      <Leaflet
        center={[48.744992, 9.103155]}
        zoom={16}
        maxZoom={20}
        drawControPosition="bottomleft"
        onShapeCreate={(id, layer) => setShapes([...shapes, { id, layer }])}
        onShapeEdit={(id, layer) =>
          setShapes(
            shapes.map((shape) => {
              if (shape.id === id) return { ...shape, layer };
              return shape;
            })
          )
        }
        onShapeDelete={(id) => setShapes(shapes.filter((shape) => shape.id !== id))}
      />
      <ul>
        <For each={shapes}>
          {({ id, layer }) => (
            <li>
              <p>Shape {id}</p>
              <br />
              <ShapeCords layer={layer} />
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
