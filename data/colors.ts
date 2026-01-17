/**
 * Random colors used in the app.
 */
export const colors = [
  "#0077ff",
  "#00bbff",
  "#00cc88",
  "#88cc11",
  "#ffbb00",
  "#ff8811",
  "#ee1144",
  "#ee44bb",
  "#8855bf",
];

/**
 * Get a consistent color for a user based on their ID
 */
export function getColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
