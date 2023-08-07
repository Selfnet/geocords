import L from "leaflet";
import { createSignal } from "solid-js";

export interface Shape {
  id: number;
  name: string;
  type: string;
  layer: L.Layer;
}

export const ShapeStore = createSignal<Shape[]>([]);

export const DrawnItemsStore = createSignal(new L.FeatureGroup());
