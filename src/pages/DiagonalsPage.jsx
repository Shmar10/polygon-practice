import { useState, useEffect } from 'react';
import { ScoreBoard } from '../components/shared/ScoreBoard';
import { useScore } from '../hooks/useScore';
import { generateDiagonalProblem, diagonalProblemTypes } from '../utils/diagonalProblems';

export function DiagonalsPage() {
  const {
    correctCount,
    incorrectCount,
    incrementCorrect,
    incrementIncorrect,
  } = useScore();

  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    diagonalProblemTypes.map(pt => pt.id)
  );
  const [availableProblemTypes, setAvailableProblemTypes] = useState([]);
  const [lastProblemType, setLastProblemType] = useState(null);
  const [lastAnswerWasIncorrect, setLastAnswerWasIncorrect] = useState(false);

  const repopulateProblemTypes = () => {
    const types = selectedProblemTypes.length > 0 ? selectedProblemTypes : [diagonalProblemTypes[0].id];
    setAvailableProblemTypes([...types]);
  };

  const generateNewProblem = () => {
    setFeedback('');
    setFeedbackType('');
    setUserAnswer('');
    setShowSolution(false);

    let problemType;

    // If last answer was wrong, force the same problem type
    if (lastAnswerWasIncorrect && lastProblemType) {
      problemType = lastProblemType;
    } else {
      if (availableProblemTypes.length === 0) {
        repopulateProblemTypes();
      }

      if (availableProblemTypes.length === 0) {
        setFeedback('Please check at least one problem type.');
        setFeedbackType('error');
        return;
      }

      // Select random problem type
      const randomIndex = Math.floor(Math.random() * availableProblemTypes.length);
      const newAvailable = [...availableProblemTypes];
      problemType = newAvailable.splice(randomIndex, 1)[0];
      setAvailableProblemTypes(newAvailable);
      setLastProblemType(problemType);
    }

    setLastAnswerWasIncorrect(false);
    const problem = generateDiagonalProblem(problemType);
    setCurrentProblem(problem);
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProblem) return;

    const answer = parseInt(userAnswer);
    if (isNaN(answer)) {
      setFeedback('Please enter a valid number.');
      setFeedbackType('error');
      return;
    }

    const isCorrect = answer === currentProblem.answer;

    if (isCorrect) {
      setFeedback('Correct! Great job!');
      setFeedbackType('success');
      setShowSolution(false);
      incrementCorrect();
      setLastAnswerWasIncorrect(false);
    } else {
      setFeedback('Not quite. Try again or click "Show Answer".');
      setFeedbackType('error');
      incrementIncorrect();
      setLastAnswerWasIncorrect(true);
    }
  };

  const handleShowAnswer = () => {
    if (!currentProblem) {
      setFeedback('Please generate a problem first.');
      setFeedbackType('error');
      return;
    }

    setFeedback(`The correct answer is ${currentProblem.answer}.`);
    setFeedbackType('info');
    setShowSolution(true);
    setLastAnswerWasIncorrect(true);
  };

  const handleCheckboxChange = (id) => {
    if (selectedProblemTypes.includes(id)) {
      setSelectedProblemTypes(selectedProblemTypes.filter(typeId => typeId !== id));
    } else {
      setSelectedProblemTypes([...selectedProblemTypes, id]);
    }
    // Reset queue when checkboxes change
    setAvailableProblemTypes([]);
    setLastAnswerWasIncorrect(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="bg-white w-full max-w-5xl mx-auto p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content (Left Column) */}
          <div className="md:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-4">
              Polygon Diagonal Practice
            </h1>

            <ScoreBoard correctCount={correctCount} incorrectCount={incorrectCount} />

            {/* Generate Problem Button */}
            <button
              onClick={generateNewProblem}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Generate New Problem
            </button>

            {/* Problem Display Area */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 min-h-[6rem] flex items-center justify-center">
              {currentProblem ? (
                <p className="text-lg text-gray-900 text-center font-medium">
                  {currentProblem.question}
                </p>
              ) : (
                <p className="text-lg text-gray-900 text-center font-medium">
                  Click &quot;Generate New Problem&quot; to start!
                </p>
              )}
            </div>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Your Answer:</label>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your answer"
              />
            </form>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Check Answer
              </button>
              <button
                onClick={handleShowAnswer}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Show Answer
              </button>
            </div>

            {/* Feedback Message */}
            {feedback && (
              <div className={`mt-4 text-center text-lg font-semibold ${
                feedbackType === 'success' ? 'text-green-600' :
                feedbackType === 'error' ? 'text-red-600' :
                feedbackType === 'info' ? 'text-blue-600' : ''
              }`}>
                {feedback}
              </div>
            )}

            {/* Solution Area */}
            {showSolution && currentProblem && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-bold text-blue-800 mb-2">Solution:</h3>
                <pre className="text-blue-700 whitespace-pre-wrap font-sans">
                  {currentProblem.solution}
                </pre>
              </div>
            )}
          </div>

          {/* Problem Types (Right Column) */}
          <div className="md:col-span-1 md:pt-16 md:pl-8 border-t md:border-t-0 md:border-l border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Problem Types</h2>
            <div className="space-y-3">
              {diagonalProblemTypes.map(pt => (
                <div key={pt.id}>
                  <input
                    type="checkbox"
                    id={pt.id}
                    checked={selectedProblemTypes.includes(pt.id)}
                    onChange={() => handleCheckboxChange(pt.id)}
                    className="form-checkbox h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={pt.id} className="ml-2 text-gray-700">
                    {pt.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

