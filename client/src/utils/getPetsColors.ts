import { TPetColor } from "../types/types";

export function getPetColors (pets: TPetColor[]): string[] {
  let colors = [];

  for (let i = 0; i < pets.length; i++) {
    colors.push(pets[i].color);
  }

  return [...new Set(colors)].sort();
}
