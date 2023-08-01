import { Leaflet } from "./components/Leaflet";
import { ShapeList } from "./components/ShapeList";

export function App() {
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
      />
      <ShapeList />
    </>
  );
}
