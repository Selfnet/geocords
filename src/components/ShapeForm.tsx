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

    try {
      const polygon = new L.Polygon(JSON.parse(cords()));
      drawnItems.addLayer(polygon);
      const id = drawnItems.getLayerId(polygon);
      setShapes([...shapes(), { id, name: name(), layer: polygon }]);

      setName("");
      setCords("");
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
        <Input type="text" id="name" name="name" value={name()} onChange={(e) => setName(e.currentTarget.value)} required />
      </div>

      <div>
        <Label for="cords">Cords</Label>
        <Textarea id="cords" name="cords" value={cords()} onChange={(e) => setCords(e.currentTarget.value)} required />
      </div>

      <DialogFooter>
        <Button type="submit">Import</Button>
      </DialogFooter>
    </form>
  );
}
