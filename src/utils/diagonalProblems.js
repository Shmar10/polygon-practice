import { randomInt, getGoodRegularN } from './polygonHelpers';

/**
 * Problem type definitions for Diagonals practice
 */
export const diagonalProblemTypes = [
  { id: 'n_to_d', label: 'Diagonals from # of sides' },
  { id: 'sum_to_d', label: 'Diagonals from sum of angles' },
  { id: 'int_to_d', label: 'Diagonals from interior angle' },
  { id: 'ext_to_d', label: 'Diagonals from exterior angle' },
  { id: 'd_to_n', label: 'Sides from total diagonals' },
  { id: 'd_vertex_to_n', label: 'Sides from vertex diagonals' },
  { id: 'd_vertex_to_d', label: 'Total diagonals from vertex diagonals' }
];

/**
 * Generates a problem based on the problem type
 */
export function generateDiagonalProblem(problemType) {
  let n, D, sum, intAngle, extAngle, dVertex;
  let question, answer, solution;

  switch (problemType) {
    case 'n_to_d':
      n = randomInt(4, 20);
      answer = (n * (n - 3)) / 2;
      question = `A polygon has ${n} sides. How many diagonals does it have?`;
      solution = `Formula: D = n(n - 3) / 2
D = ${n}(${n} - 3) / 2
D = ${n}(${n - 3}) / 2
D = ${n * (n - 3)} / 2
D = ${answer}`;
      break;

    case 'sum_to_d':
      n = randomInt(4, 20);
      sum = (n - 2) * 180;
      answer = (n * (n - 3)) / 2;
      question = `The sum of the interior angles of a polygon is ${sum}°. How many diagonals does it have?`;
      solution = `Step 1: Find the number of sides (n).
Formula: Sum = (n - 2) * 180
${sum} = (n - 2) * 180
${sum} / 180 = n - 2
${sum / 180} = n - 2
n = ${sum / 180} + 2
n = ${n}

Step 2: Find the number of diagonals (D).
Formula: D = n(n - 3) / 2
D = ${n}(${n} - 3) / 2
D = ${n}(${n - 3}) / 2
D = ${answer}`;
      break;

    case 'int_to_d':
      n = getGoodRegularN();
      intAngle = ((n - 2) * 180) / n;
      answer = (n * (n - 3)) / 2;
      question = `Each interior angle of a regular polygon is ${intAngle}°. How many diagonals does it have?`;
      solution = `Step 1: Find the number of sides (n).
Method A: Using Interior Angle Formula
Int. Angle = (n - 2) * 180 / n
${intAngle} * n = (n - 2) * 180
${intAngle}n = 180n - 360
360 = 180n - ${intAngle}n
360 = n(180 - ${intAngle})
360 = n(${180 - intAngle})
n = 360 / ${180 - intAngle}
n = ${n}

Method B: Using Exterior Angle
Ext. Angle = 180 - Int. Angle = 180 - ${intAngle} = ${180 - intAngle}°
n = 360 / Ext. Angle = 360 / ${180 - intAngle} = ${n}

Step 2: Find the number of diagonals (D).
Formula: D = n(n - 3) / 2
D = ${n}(${n} - 3) / 2
D = ${answer}`;
      break;

    case 'ext_to_d':
      n = getGoodRegularN();
      extAngle = 360 / n;
      answer = (n * (n - 3)) / 2;
      question = `Each exterior angle of a regular polygon is ${extAngle}°. How many diagonals does it have?`;
      solution = `Step 1: Find the number of sides (n).
Formula: n = 360 / Ext. Angle
n = 360 / ${extAngle}
n = ${n}

Step 2: Find the number of diagonals (D).
Formula: D = n(n - 3) / 2
D = ${n}(${n} - 3) / 2
D = ${answer}`;
      break;

    case 'd_to_n':
      n = randomInt(4, 20);
      D = (n * (n - 3)) / 2;
      answer = n;
      question = `A polygon has ${D} diagonals. How many sides does it have?`;
      solution = `Step 1: Set up the formula.
Formula: D = n(n - 3) / 2
${D} = n(n - 3) / 2
${D * 2} = n(n - 3)
${D * 2} = n² - 3n

Step 2: Solve the quadratic equation.
n² - 3n - ${D * 2} = 0
You can solve this by factoring or using the quadratic formula:
n = ( -b ± sqrt(b² - 4ac) ) / 2a
n = ( 3 ± sqrt( (-3)² - 4(1)(${-D * 2}) ) ) / 2
n = ( 3 ± sqrt( 9 + ${4 * D * 2} ) ) / 2
n = ( 3 ± sqrt( ${9 + (4 * D * 2)} ) ) / 2
n = ( 3 ± ${Math.sqrt(9 + (4 * D * 2))} ) / 2
Since sides (n) must be positive, we take the '+' root:
n = ( 3 + ${Math.sqrt(9 + (4 * D * 2))} ) / 2
n = ${(3 + Math.sqrt(9 + (4 * D * 2))) / 2}
n = ${answer}`;
      break;

    case 'd_vertex_to_n':
      n = randomInt(5, 20);
      dVertex = n - 3;
      answer = n;
      question = `A polygon has ${dVertex} diagonals coming from a single vertex. How many sides does it have?`;
      solution = `Step 1: Set up the formula.
Formula: Diagonals from one vertex (d) = n - 3
${dVertex} = n - 3

Step 2: Solve for n.
n = ${dVertex} + 3
n = ${answer}`;
      break;

    case 'd_vertex_to_d':
      n = randomInt(5, 20);
      dVertex = n - 3;
      answer = (n * (n - 3)) / 2;
      question = `A polygon has ${dVertex} diagonals coming from a single vertex. How many total diagonals does it have?`;
      solution = `Step 1: Find the number of sides (n).
Formula: Diagonals from one vertex (d) = n - 3
${dVertex} = n - 3
n = ${dVertex} + 3
n = ${n}

Step 2: Find the total number of diagonals (D).
Formula: D = n(n - 3) / 2
D = ${n}(${n} - 3) / 2
D = ${n}(${n - 3}) / 2
D = ${answer}`;
      break;

    default:
      throw new Error(`Unknown problem type: ${problemType}`);
  }

  return { type: problemType, question, answer, solution };
}

