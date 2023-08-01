import { For } from "solid-js";
import { ShapeStore } from "../store";

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

export function ShapeList() {
  const [shapes] = ShapeStore;

  return (
    <ul>
      <For each={shapes()}>
        {({ id, layer }) => (
          <li>
            <p>Shape {id}</p>
            <br />
            <ShapeCords layer={layer} />
          </li>
        )}
      </For>
    </ul>
  );
}
