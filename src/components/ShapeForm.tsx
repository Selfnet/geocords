import L from "leaflet";
import { createSignal } from "solid-js";
import { DrawnItemsStore, ShapeStore } from "../store";
import { Textarea } from "./ui/Textarea";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { DialogFooter } from "./ui/Dialog";
import { Button } from "./ui/Button";
import { showToast } from "./ui/Toast";

export function ShapeForm() {
  const drawnItems = DrawnItemsStore[0]();
  const [shapes, setShapes] = ShapeStore;
  const [name, setName] = createSignal("");
  const [cords, setCords] = createSignal("");

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const file = (document.getElementById("file") as HTMLInputElement).files![0];

    try {
      if (file) {
        // Parse file
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target!.result as string;
          const parsed: JSON = JSON.parse(result);

          parsed.forEach((shape: any) => {
            const polygon = new L.Polygon([shape.coordinates.map((c: any) => [c.lat, c.lng])]);
            console.log(polygon.toGeoJSON())
            drawnItems.addLayer(polygon);
            const id = drawnItems.getLayerId(polygon);
            setShapes([...shapes(), { id, name: shape.name, type: shape.type, layer: polygon }]);
          });
        };

        reader.readAsText(file);
      } else {
        // parse cords, name
        const polygon = new L.Polygon(JSON.parse(cords()));
        drawnItems.addLayer(polygon);
        const id = drawnItems.getLayerId(polygon);
        setShapes([...shapes(), { id, name: name(), type: "Polygon", layer: polygon }]);
      }

      console.log(shapes());

      // setName("");
      // setCords("");

      // remove file from input
      // (document.getElementById("file") as HTMLInputElement).value = "";

      showToast({
        title: "Success",
        description: "Shape imported successfully.",
      });

    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Could not parse Input. Please check your input and try again.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <form class="space-y-4" onSubmit={onSubmit}>
      <div>
        <Label for="name">Name</Label>
        <Input type="text" id="name" name="name" value={name()} onChange={(e) => setName(e.currentTarget.value)} />
      </div>

      <div>
        <Label for="cords">Cords</Label>
        <Textarea id="cords" name="cords" value={cords()} onChange={(e) => setCords(e.currentTarget.value)} />
      </div>

      <div>
        <Label for="file">File</Label>
        <Input type="file" id="file" name="file" />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            // setName("");
            // setCords("");
            // (document.getElementById("file") as HTMLInputElement).value = "";
          }}
        >Clear</Button>
        <Button type="submit">Import</Button>
      </DialogFooter>
    </form>
  );
}
