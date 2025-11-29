/**
 * ScoreBoard Component
 * Displays correct and incorrect counts
 */
export function ScoreBoard({ correctCount, incorrectCount }) {
  return (
    <div className="flex justify-around mb-4 text-lg sm:text-xl font-semibold">
      <div className="text-center">
        Correct: <span className="text-green-600 font-bold">{correctCount}</span>
      </div>
      <div className="text-center">
        Incorrect: <span className="text-red-600 font-bold">{incorrectCount}</span>
      </div>
    </div>
  );
}

