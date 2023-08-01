import L from "leaflet";
import { createSignal } from "solid-js";
import { DrawnItemsStore, ShapeStore } from "../store";

export function ShapeForm() {
  const drawnItems = DrawnItemsStore[0]();
  const [shapes, setShapes] = ShapeStore;
  const [name, setName] = createSignal("");
  const [cords, setCords] = createSignal("");
  const [error, setError] = createSignal("");

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (!name()) {
      setError("Please specify a valid name");
      return;
    }

    try {
      const polygon = new L.Polygon(JSON.parse(cords()));
      drawnItems.addLayer(polygon);
      const id = drawnItems.getLayerId(polygon);
      setShapes([...shapes(), { id, name: name(), layer: polygon }]);

      setName("");
      setCords("");
    } catch (err) {
      console.error(err);
      setError("Could not parse JSON");
      return;
    }
  };

  return (
    <>
      <h1>Import Shape</h1>
      <form onSubmit={onSubmit}>
        <label for="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name()}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <br />

        <label for="cords">Cords:</label>
        <br />
        <textarea
          id="cords"
          name="cords"
          value={cords()}
          onChange={(e) => setCords(e.currentTarget.value)}
        ></textarea>
        <br />
        {error() && (
          <>
            <span style="color: red;">{error()}</span>
            <br />
          </>
        )}

        <button>Import</button>
      </form>
    </>
  );
}
