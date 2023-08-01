import { For } from "solid-js";
import { ShapeStore } from "../store";
import { Button } from "./ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/Table";


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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Element</TableHead>
          <TableHead>Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={shapes()}>{({ name, layer }, i) =>
          <TableRow>
            <TableCell class="font-medium">{name}</TableCell>
            {/* <ShapeCords layer={layer} /> */}
            <TableCell class="font-medium"><Button /></TableCell>
          </TableRow>
        }</For>
      </TableBody>
    </Table>
  );
}
