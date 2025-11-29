import { useState, useEffect } from 'react';
import { ScoreBoard } from '../components/shared/ScoreBoard';
import { ScoreCard } from '../components/shared/ScoreCard';
import { useScore } from '../hooks/useScore';
import { generateDiagonalProblem, diagonalProblemTypes } from '../utils/diagonalProblems';
import { submitScore } from '../utils/googleSheets';
import { BookOpen, Trophy, CheckCircle, Zap, ArrowLeft, Target } from 'lucide-react';

const CHALLENGE_LENGTH = 10;

export function DiagonalsPage() {
  const {
    correctCount,
    incorrectCount,
    problemHistory,
    incrementCorrect,
    incrementIncorrect,
    addToProblemHistory,
    updateLastProblemResult,
    resetScore
  } = useScore();

  const [mode, setMode] = useState(null); // null, 'practice', or 'challenge'
  const [sessionActive, setSessionActive] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showScoreCard, setShowScoreCard] = useState(false);
  
  // Settings
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [classPeriod, setClassPeriod] = useState('');
  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    diagonalProblemTypes.map(pt => pt.id)
  );
  
  // Challenge mode
  const [challengeQuestionCount, setChallengeQuestionCount] = useState(0);
  
  // Practice mode - adaptive learning
  const [availableProblemTypes, setAvailableProblemTypes] = useState([]);
  const [lastProblemType, setLastProblemType] = useState(null);
  const [lastAnswerWasIncorrect, setLastAnswerWasIncorrect] = useState(false);

  const repopulateProblemTypes = () => {
    const types = selectedProblemTypes.length > 0 ? selectedProblemTypes : [diagonalProblemTypes[0].id];
    setAvailableProblemTypes([...types]);
  };

  const generateNewProblem = () => {
    if (!sessionActive) return;

    setFeedback('');
    setFeedbackType('');
    setUserAnswer('');
    setShowSolution(false);

    let problemType;

    if (mode === 'practice') {
      // Adaptive learning for practice mode
      if (lastAnswerWasIncorrect && lastProblemType) {
        problemType = lastProblemType;
      } else {
        if (availableProblemTypes.length === 0) {
          repopulateProblemTypes();
          return;
        }

        const randomIndex = Math.floor(Math.random() * availableProblemTypes.length);
        const newAvailable = [...availableProblemTypes];
        problemType = newAvailable.splice(randomIndex, 1)[0];
        setAvailableProblemTypes(newAvailable);
        setLastProblemType(problemType);
      }
      setLastAnswerWasIncorrect(false);
    } else {
      // Random selection for challenge mode
      const types = selectedProblemTypes.length > 0 ? selectedProblemTypes : [diagonalProblemTypes[0].id];
      problemType = types[Math.floor(Math.random() * types.length)];
    }

    const problem = generateDiagonalProblem(problemType);
    setCurrentProblem(problem);
    
    if (mode === 'challenge') {
      addToProblemHistory({
        type: problem.type,
        question: problem.question,
        answer: problem.answer
      });
    }
  };

  useEffect(() => {
    if (sessionActive && !currentProblem) {
      generateNewProblem();
    }
  }, [sessionActive, availableProblemTypes]);

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
      
      if (mode === 'practice') {
        setLastAnswerWasIncorrect(false);
      }
      
      if (mode === 'challenge') {
        updateLastProblemResult(answer, true);
      }
      
      setTimeout(() => {
        checkProgress(true);
      }, 1000);
    } else {
      setFeedback('Incorrect.');
      setFeedbackType('error');
      incrementIncorrect();
      setShowSolution(true);
      
      if (mode === 'practice') {
        setLastAnswerWasIncorrect(true);
      }
      
      if (mode === 'challenge') {
        updateLastProblemResult(answer, false);
      }
    }
  };

  const checkProgress = (wasCorrect) => {
    if (mode === 'challenge') {
      const newCount = challengeQuestionCount + 1;
      setChallengeQuestionCount(newCount);
      
      if (newCount >= CHALLENGE_LENGTH) {
        endSession(true);
      } else {
        generateNewProblem();
      }
    } else {
      if (wasCorrect) {
        generateNewProblem();
      }
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
    
    if (mode === 'practice') {
      setLastAnswerWasIncorrect(true);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedProblemTypes.includes(id)) {
      setSelectedProblemTypes(selectedProblemTypes.filter(typeId => typeId !== id));
    } else {
      setSelectedProblemTypes([...selectedProblemTypes, id]);
    }
    setAvailableProblemTypes([]);
    setLastAnswerWasIncorrect(false);
  };

  const startSession = (selectedMode) => {
    if (selectedProblemTypes.length === 0) {
      alert('Please select at least one problem type to start.');
      return;
    }

    if (selectedMode === 'challenge' && (!firstName || !lastName || !classPeriod)) {
      alert('Please enter your name and class period for Challenge Mode.');
      return;
    }

    setMode(selectedMode);
    resetScore();
    setChallengeQuestionCount(0);
    setAvailableProblemTypes([]);
    setSessionActive(true);
    setCurrentProblem(null);
    setFeedback('');
    setFeedbackType('');
    
    if (selectedMode === 'practice') {
      repopulateProblemTypes();
    }
  };

  const endSession = async (challengeCompleted = false) => {
    setSessionActive(false);
    
    if (mode === 'challenge' && challengeCompleted) {
      // Show score card for challenge mode
      setShowScoreCard(true);
    } else {
      // Regular end session
      let message = 'Session stopped.';
      setFeedback(message);
      setFeedbackType('info');
      setMode(null);
    }
  };

  const handleSubmitScoreToSheets = async () => {
    if (firstName && lastName && classPeriod) {
      const result = await submitScore({
        firstName,
        lastName,
        classPeriod,
        correct: correctCount,
        incorrect: incorrectCount,
        total: CHALLENGE_LENGTH,
        score: `${correctCount} / ${CHALLENGE_LENGTH}`,
        problemHistory: JSON.stringify(problemHistory),
        mode: 'Diagonals Challenge'
      });
      
      if (result.success) {
        alert('Score also submitted to Google Sheets!');
      } else {
        alert('Could not submit to Google Sheets. But you have your score card image!');
      }
    }
  };

  const handleCloseScoreCard = () => {
    setShowScoreCard(false);
    setMode(null);
    setFeedback('');
    setFeedbackType('');
  };

  const handleBackToModes = () => {
    setSessionActive(false);
    setMode(null);
    setCurrentProblem(null);
    setFeedback('');
    setFeedbackType('');
  };

  const handleContinue = () => {
    setShowSolution(false);
    checkProgress(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-1">
          Polygon Diagonal Practice
        </h1>
        <p className="text-center text-gray-600 text-sm mb-4">
          Choose your mode: Practice freely or take a 10-question challenge
        </p>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl">
          {/* Mode Selection Screen */}
          {!sessionActive && !mode && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                Select Your Mode
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Practice Mode Card */}
                <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-soft transition-all duration-300 group flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-700">Practice Mode</h3>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">
                    Free practice with instant feedback and detailed solutions. Perfect for learning diagonal calculations.
                  </p>
                  <ul className="space-y-1.5 mb-3 text-sm text-gray-700 flex-grow">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                      Practice at your own pace
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                      Choose which problem types to practice
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                      See detailed solutions when you need help
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                      Adaptive learning: practice types you miss
                    </li>
                  </ul>
                  <button
                    onClick={() => setMode('practice')}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                  >
                    Start Practice Mode
                  </button>
                </div>

                {/* Challenge Mode Card */}
                <div className="border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 hover:shadow-soft transition-all duration-300 group flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-purple-700">Challenge Mode</h3>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">
                    Test your diagonal knowledge with 10 questions. Your score will be submitted automatically.
                  </p>
                  <ul className="space-y-1.5 mb-3 text-sm text-gray-700 flex-grow">
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      Exactly 10 questions
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      Automatic score submission
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      Track your progress over time
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      Requires name and class period
                    </li>
                  </ul>
                  <button
                    onClick={() => setMode('challenge')}
                    className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200 text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                  >
                    Start Challenge Mode
                  </button>
                </div>
              </div>

              {/* Problem Type Selector */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-700">Problem Types</h3>
                  <button
                    onClick={() => {
                      const allSelected = selectedProblemTypes.length === diagonalProblemTypes.length;
                      setSelectedProblemTypes(allSelected ? [] : diagonalProblemTypes.map(pt => pt.id));
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {selectedProblemTypes.length === diagonalProblemTypes.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 p-4 border-2 border-gray-200 rounded-lg">
                  {diagonalProblemTypes.map(pt => (
                    <div key={pt.id} className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={pt.id}
                          type="checkbox"
                          checked={selectedProblemTypes.includes(pt.id)}
                          onChange={() => handleCheckboxChange(pt.id)}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={pt.id} className="font-medium text-gray-700">
                          {pt.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Setup Screen (shown after mode selection but before session starts) */}
          {!sessionActive && mode && (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={handleBackToModes}
                className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Mode Selection
              </button>

              <div className={`border-2 rounded-xl p-4 mb-4 ${
                mode === 'challenge' ? 'border-purple-200 bg-purple-50' : 'border-blue-200 bg-blue-50'
              }`}>
                <h2 className={`text-xl font-bold mb-1 ${mode === 'challenge' ? 'text-purple-700' : 'text-blue-700'}`}>
                  {mode === 'challenge' ? '🏆 Challenge Mode' : '📝 Practice Mode'}
                </h2>
                <p className="text-gray-700 mb-3 text-sm">
                  {mode === 'challenge' 
                    ? 'Complete 10 diagonal questions and submit your score'
                    : 'Practice diagonal problems freely with instant feedback'}
                </p>
                {mode === 'practice' && (
                  <div className="text-xs text-gray-600 bg-white p-2 rounded border border-blue-200">
                    <strong>Smart Learning:</strong> If you answer incorrectly, you&apos;ll get another problem of the same type to reinforce your understanding.
                  </div>
                )}
              </div>

              {mode === 'challenge' && (
                <div className="space-y-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Student Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name *</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class Period *</label>
                    <input
                      type="text"
                      value={classPeriod}
                      onChange={(e) => setClassPeriod(e.target.value)}
                      className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition duration-200"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => startSession(mode)}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 ${
                  mode === 'challenge'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {mode === 'challenge' ? 'Begin Challenge' : 'Start Practicing'}
              </button>
            </div>
          )}

          {/* Active Session Screen */}
          {sessionActive && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleBackToModes}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Exit
                </button>
                <div className={`px-4 py-2 rounded-lg font-semibold ${
                  mode === 'challenge' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {mode === 'challenge' ? `Question ${challengeQuestionCount + 1}/${CHALLENGE_LENGTH}` : 'Practice Mode'}
                </div>
              </div>

              <ScoreBoard correctCount={correctCount} incorrectCount={incorrectCount} />

              {mode === 'practice' && (
                <button
                  onClick={generateNewProblem}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200 mb-4 text-sm"
                >
                  Generate New Problem
                </button>
              )}

              {currentProblem && (
                <>
                  {/* Problem Display */}
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 min-h-[5rem] flex items-center justify-center mb-4">
                    <p className="text-lg text-gray-900 text-center font-medium">
                      {currentProblem.question}
                    </p>
                  </div>

                  {/* Answer Input */}
                  <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer:</label>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Enter your answer"
                      autoFocus
                    />
                    
                    <button
                      type="submit"
                      className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 mt-3 ${
                        mode === 'challenge'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      Submit Answer
                    </button>
                  </form>

                  {mode === 'practice' && (
                    <button
                      onClick={handleShowAnswer}
                      className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition duration-200 mb-4"
                    >
                      Show Answer
                    </button>
                  )}

                  {/* Feedback Message */}
                  {feedback && (
                    <div className={`text-center text-lg font-semibold mb-4 p-3 rounded ${
                      feedbackType === 'success' ? 'text-green-600 bg-green-50' :
                      feedbackType === 'error' ? 'text-red-600 bg-red-50' :
                      feedbackType === 'info' ? 'text-blue-600 bg-blue-50' : ''
                    }`}>
                      {feedback}
                    </div>
                  )}

                  {/* Solution Display */}
                  {showSolution && (
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-4">
                      <h3 className="font-bold text-blue-800 mb-2 text-lg">Solution:</h3>
                      <pre className="text-blue-700 whitespace-pre-wrap font-sans text-sm leading-relaxed mb-4">
                        {currentProblem.solution}
                      </pre>
                      {mode === 'challenge' && (
                        <button
                          onClick={handleContinue}
                          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="mt-6 text-center border-t pt-6">
                <button
                  onClick={() => endSession(false)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  End Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showScoreCard && (
        <ScoreCard
          firstName={firstName}
          lastName={lastName}
          classPeriod={classPeriod}
          mode="Polygon Diagonals Challenge"
          correct={correctCount}
          total={CHALLENGE_LENGTH}
          onClose={handleCloseScoreCard}
          onSubmitToSheets={handleSubmitScoreToSheets}
        />
      )}
    </div>
  );
}
