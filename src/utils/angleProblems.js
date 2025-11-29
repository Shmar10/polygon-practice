import { getPolygonName, getRandomSides, round, shuffle } from './polygonHelpers';

/**
 * Problem type definitions for Angles practice
 */
export const angleProblemTypes = [
  { id: 'SUM_INTERIOR', label: 'Sum of Interior Angles' },
  { id: 'EACH_INTERIOR', label: 'Each Interior Angle (Regular)' },
  { id: 'FIND_N_FROM_INTERIOR', label: 'Find Sides from Interior Angle' },
  { id: 'FIND_N_FROM_SUM', label: 'Find Sides from Sum' },
  { id: 'SUM_EXTERIOR', label: 'Sum of Exterior Angles' },
  { id: 'EACH_EXTERIOR', label: 'Each Exterior Angle (Regular)' },
  { id: 'FIND_N_FROM_EXTERIOR', label: 'Find Sides from Exterior Angle' },
  { id: 'FIND_MISSING_ANGLE', label: 'Find Missing Angle (Algebra)' },
  { id: 'FIND_X_FROM_EXPRESSIONS', label: 'Find X from Expressions (Algebra)' }
];

/**
 * Generates a problem based on the problem type
 */
export function generateAngleProblem(problemType) {
  let n, name, question, answer, solution;
  const decimals = 2;

  switch (problemType) {
    case 'SUM_INTERIOR': {
      n = getRandomSides();
      name = getPolygonName(n);
      const sum = (n - 2) * 180;
      question = `What is the sum of the interior angles of a ${name} (a polygon with ${n} sides)?`;
      answer = sum;
      solution = `The formula for the sum of interior angles is <strong>(n - 2) * 180</strong>, where 'n' is the number of sides.<br>
                  For a ${name} (n = ${n}):<br>
                  (${n} - 2) * 180 = ${n - 2} * 180 = <strong>${answer}°</strong>`;
      break;
    }

    case 'EACH_INTERIOR': {
      n = getRandomSides();
      name = getPolygonName(n);
      const sum = (n - 2) * 180;
      const interiorAngle = round(sum / n, decimals);
      question = `What is the measure of each interior angle of a *regular* ${name} (a regular polygon with ${n} sides)?`;
      answer = interiorAngle;
      solution = `First, find the sum of interior angles: (n - 2) * 180.<br>
                  (${n} - 2) * 180 = ${sum}°<br>
                  For a regular polygon, divide the sum by the number of sides, 'n'.<br>
                  ${sum}° / ${n} = <strong>${answer}°</strong>`;
      break;
    }

    case 'FIND_N_FROM_INTERIOR': {
      n = getRandomSides();
      const interiorAngle = round(((n - 2) * 180) / n, decimals);
      const exteriorAngle = round(180 - interiorAngle, decimals);
      question = `A regular polygon has an interior angle of ${interiorAngle}°. How many sides does it have?`;
      answer = n;
      solution = `Each interior angle is ${interiorAngle}°. Each exterior angle is 180° - Interior Angle.<br>
                  180° - ${interiorAngle}° = ${exteriorAngle}°<br>
                  The sum of exterior angles is always 360°. The number of sides 'n' is 360° / Exterior Angle.<br>
                  360° / ${exteriorAngle}° = <strong>${answer} sides</strong>`;
      break;
    }

    case 'FIND_N_FROM_SUM': {
      n = getRandomSides();
      const sum = (n - 2) * 180;
      question = `The sum of the interior angles of a polygon is ${sum}°. How many sides does it have?`;
      answer = n;
      solution = `The formula is Sum = (n - 2) * 180.<br>
                  ${sum} = (n - 2) * 180<br>
                  ${sum} / 180 = n - 2<br>
                  ${sum / 180} = n - 2<br>
                  n = ${sum / 180} + 2<br>
                  n = <strong>${answer} sides</strong>`;
      break;
    }

    case 'SUM_EXTERIOR': {
      n = getRandomSides();
      name = getPolygonName(n);
      question = `What is the sum of the exterior angles of a ${name} (a polygon with ${n} sides)?`;
      answer = 360;
      solution = `The sum of the exterior angles of *any* convex polygon is <strong>360°</strong>, regardless of the number of sides.`;
      break;
    }

    case 'EACH_EXTERIOR': {
      n = getRandomSides();
      name = getPolygonName(n);
      const exteriorAngle = round(360 / n, decimals);
      question = `What is the measure of each exterior angle of a *regular* ${name} (a regular polygon with ${n} sides)?`;
      answer = exteriorAngle;
      solution = `The sum of exterior angles is 360°. For a regular polygon with 'n' sides, divide 360 by 'n'.<br>
                  360° / ${n} = <strong>${answer}°</strong>`;
      break;
    }

    case 'FIND_N_FROM_EXTERIOR': {
      n = getRandomSides();
      const exteriorAngle = round(360 / n, decimals);
      question = `A regular polygon has an exterior angle of ${exteriorAngle}°. How many sides does it have?`;
      answer = n;
      solution = `The sum of exterior angles is 360°. The number of sides 'n' is 360° / Exterior Angle.<br>
                  360° / ${exteriorAngle}° = <strong>${answer} sides</strong>`;
      break;
    }

    case 'FIND_MISSING_ANGLE': {
      n = getRandomSides(true);
      name = getPolygonName(n);
      const sum = (n - 2) * 180;
      let angles = [];
      let runningSum = 0;
      
      for (let i = 0; i < n - 1; i++) {
        let maxAngle = Math.min(175, sum - runningSum - (n - i - 1) * 30);
        let angle = Math.floor(Math.random() * (maxAngle - 30 + 1)) + 30;
        angles.push(angle);
        runningSum += angle;
      }
      
      const missingAngle = sum - runningSum;
      angles.push('x');
      shuffle(angles);
      
      question = `A ${name} (${n} sides) has interior angles measuring: <strong>${angles.join('°, ')}°</strong>. Find the value of x.`;
      answer = missingAngle;
      solution = `The sum of interior angles for a ${n}-sided polygon is (n - 2) * 180.<br>
                  (${n} - 2) * 180 = ${sum}°<br>
                  Sum of the known angles: ${angles.filter(a => a !== 'x').join(' + ')} = ${runningSum}°<br>
                  Set up the equation: ${runningSum} + x = ${sum}<br>
                  x = ${sum} - ${runningSum}<br>
                  x = <strong>${answer}°</strong>`;
      break;
    }

    case 'FIND_X_FROM_EXPRESSIONS': {
      n = getRandomSides(true);
      name = getPolygonName(n);
      const sum = (n - 2) * 180;
      const x = Math.floor(Math.random() * 20) + 10;
      
      let coeffs = [];
      let constants = [];
      let coeffSum = 0;
      let constSum = 0;
      let expressions = [];
      
      for (let i = 0; i < n - 1; i++) {
        let c = Math.floor(Math.random() * 5) + 1;
        let op = Math.random() < 0.5 ? 1 : -1;
        let k = (Math.floor(Math.random() * 20) + 1) * op;
        
        coeffs.push(c);
        constants.push(k);
        coeffSum += c;
        constSum += k;
        expressions.push(`(${c}x ${k < 0 ? '-' : '+'} ${Math.abs(k)})`);
      }
      
      let lastCoeff = Math.floor(Math.random() * 5) + 1;
      let lastConst = sum - (coeffSum * x) - constSum - (lastCoeff * x);
      
      coeffs.push(lastCoeff);
      constants.push(lastConst);
      expressions.push(`(${lastCoeff}x ${lastConst < 0 ? '-' : '+'} ${Math.abs(lastConst)})`);
      coeffSum += lastCoeff;
      constSum += lastConst;
      shuffle(expressions);
      
      question = `The interior angles of a ${n}-sided polygon are given by the expressions: <strong>${expressions.join(', ')}</strong>. Find the value of x.`;
      answer = x;
      solution = `The sum of interior angles for a ${n}-sided polygon is (n - 2) * 180 = ${sum}°.<br>
                  Add all the expressions: ${expressions.join(' + ')} = ${sum}<br>
                  Combine like terms: (${coeffs.join(' + ')})x + (${constants.join(' + ')}) = ${sum}<br>
                  ${coeffSum}x + ${constSum} = ${sum}<br>
                  ${coeffSum}x = ${sum} - ${constSum}<br>
                  ${coeffSum}x = ${sum - constSum}<br>
                  x = ${sum - constSum} / ${coeffSum}<br>
                  x = <strong>${answer}</strong>`;
      break;
    }

    default:
      throw new Error(`Unknown problem type: ${problemType}`);
  }

  return { type: problemType, question, answer, solution };
}

