import { For } from "solid-js";
import { ShapeStore } from "../store";
import { Button } from "./ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/Table";
import { IconCopy } from "@tabler/icons-solidjs";
import { showToast } from "./ui/Toast";

export function ShapeList() {
  const [shapes] = ShapeStore;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Element</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={shapes()}>
            {({ name, layer }, i) => (
              <TableRow class="group">
                <TableCell>{name}</TableCell>
                <TableCell class="flex justify-end opacity-0 transition duration-300 group-hover:opacity-100">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(layer.getLatLngs()[0].map((e: any) => [e.lng, e.lat])),
                      );
                      showToast({
                        title: "Copied to clipboard",
                        description: `The coordinates (id: ${i()}) have been copied to your clipboard.`,
                      });
                    }}
                  >
                    <IconCopy />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </>
  );
}
