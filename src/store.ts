import { createSignal } from "solid-js";

export interface Shape {
  id: number;
  layer: L.Layer;
}

export const ShapeStore = createSignal<Shape[]>([]);
