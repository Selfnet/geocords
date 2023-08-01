import { For } from "solid-js";
import { ShapeStore } from "../store";
import { Button } from "./ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/Table";

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
        <For each={shapes()}>
          {({ name }) => (
            <TableRow>
              <TableCell class="font-medium">{name}</TableCell>
              <TableCell class="font-medium">
                <Button />
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
}
