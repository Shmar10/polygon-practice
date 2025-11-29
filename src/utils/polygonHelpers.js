/**
 * Polygon calculation utilities
 */

export const polygonNames = {
  3: 'triangle',
  4: 'quadrilateral',
  5: 'pentagon',
  6: 'hexagon',
  7: 'heptagon',
  8: 'octagon',
  9: 'nonagon',
  10: 'decagon',
  11: 'undecagon',
  12: 'dodecagon'
};

/**
 * Get the name for a given number of sides
 */
export function getPolygonName(n) {
  return polygonNames[n] || `${n}-gon`;
}

/**
 * Rounds a number to a specified number of decimal places
 */
export function round(value, decimals = 2) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

/**
 * Shuffles an array in place
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Gets a random number of sides
 * @param {boolean} isAlgebra - If true, limits to 3-5 sides for algebra problems
 * @param {number} min - Minimum number of sides
 * @param {number} max - Maximum number of sides
 */
export function getRandomSides(isAlgebra = false, min = 3, max = 60) {
  if (isAlgebra) {
    return [3, 4, 5][Math.floor(Math.random() * 3)];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Selects a random n that results in clean angles for regular polygons
 */
export function getGoodRegularN() {
  const possibleN = [5, 6, 8, 9, 10, 12, 15, 18, 20];
  return possibleN[randomInt(0, possibleN.length - 1)];
}

