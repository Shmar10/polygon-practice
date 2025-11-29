import { useState, useEffect } from 'react';
import { ScoreBoard } from '../components/shared/ScoreBoard';
import { SolutionModal } from '../components/shared/SolutionModal';
import { ProblemTypeSelector } from '../components/shared/ProblemTypeSelector';
import { useScore } from '../hooks/useScore';
import { generateAngleProblem, angleProblemTypes } from '../utils/angleProblems';
import { shuffle } from '../utils/polygonHelpers';
import { submitScore } from '../utils/googleSheets';

const CHALLENGE_LENGTH = 10;

export function AnglesPage() {
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

  const [sessionActive, setSessionActive] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success', 'error', 'info'
  const [showSolution, setShowSolution] = useState(false);
  
  // Settings
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [classPeriod, setClassPeriod] = useState('');
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    angleProblemTypes.map(pt => pt.id)
  );
  
  // Challenge mode
  const [challengeQuestionCount, setChallengeQuestionCount] = useState(0);
  const [problemQueue, setProblemQueue] = useState([]);

  const resetProblemQueue = () => {
    if (problemQueue.length === 0) {
      const types = selectedProblemTypes.length > 0 ? selectedProblemTypes : [angleProblemTypes[0].id];
      setProblemQueue(shuffle([...types]));
    }
  };

  const generateNewProblem = () => {
    if (!sessionActive) return;

    setFeedback('');
    setFeedbackType('');
    setUserAnswer('');
    setShowSolution(false);

    resetProblemQueue();
    
    setProblemQueue(prevQueue => {
      const queue = [...prevQueue];
      const problemType = queue.pop();
      const problem = generateAngleProblem(problemType);
      setCurrentProblem(problem);
      addToProblemHistory({
        type: problem.type,
        question: problem.question,
        answer: problem.answer
      });
      return queue;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionActive || !currentProblem) return;

    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      setFeedback('Please enter a valid number.');
      setFeedbackType('error');
      return;
    }

    const isCorrect = Math.abs(answer - currentProblem.answer) < 0.01;
    updateLastProblemResult(answer, isCorrect);

    if (isCorrect) {
      setFeedback('Correct!');
      setFeedbackType('success');
      incrementCorrect();
      
      setTimeout(() => {
        checkChallengeProgress(true);
      }, 1000);
    } else {
      setFeedback('Incorrect.');
      setFeedbackType('error');
      incrementIncorrect();
      setShowSolution(true);
    }
  };

  const handleContinue = () => {
    setShowSolution(false);
    checkChallengeProgress(false);
  };

  const checkChallengeProgress = (wasCorrect) => {
    if (isChallengeMode) {
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

  const startSession = () => {
    if (selectedProblemTypes.length === 0) {
      alert('Please select at least one problem type to start.');
      return;
    }

    resetScore();
    setChallengeQuestionCount(0);
    setProblemQueue([]);
    setSessionActive(true);
    setCurrentProblem(null);
    setFeedback('');
    setFeedbackType('');
  };

  useEffect(() => {
    if (sessionActive && !currentProblem) {
      generateNewProblem();
    }
  }, [sessionActive]);

  const endSession = async (challengeCompleted = false) => {
    setSessionActive(false);
    
    let message = 'Session stopped.';
    if (isChallengeMode && challengeCompleted) {
      message = `Challenge Complete! You scored ${correctCount} out of ${CHALLENGE_LENGTH}.`;
      
      // Submit score if in challenge mode and all info is provided
      if (firstName && lastName && classPeriod) {
        const result = await submitScore({
          firstName,
          lastName,
          classPeriod,
          correct: correctCount,
          incorrect: incorrectCount,
          total: CHALLENGE_LENGTH,
          score: `${correctCount} / ${CHALLENGE_LENGTH}`,
          problemHistory: JSON.stringify(problemHistory)
        });
        
        if (result.success) {
          message += ' Score submitted!';
        } else {
          message += ' (Score submission failed)';
        }
      }
    }
    
    setFeedback(message);
    setFeedbackType('info');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Polygon Angle Practice
        </h1>

        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row lg:space-x-10">
            {/* Left Column - Setup */}
            <div className="lg:w-1/2 w-full">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Setup</h2>
              
              {/* Student Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={sessionActive}
                      className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={sessionActive}
                      className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200 disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Period</label>
                  <input
                    type="text"
                    value={classPeriod}
                    onChange={(e) => setClassPeriod(e.target.value)}
                    disabled={sessionActive}
                    className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Challenge Mode */}
              <div className="relative bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={isChallengeMode}
                      onChange={(e) => setIsChallengeMode(e.target.checked)}
                      disabled={sessionActive}
                      className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-bold text-blue-800 text-base">10-Question Challenge</label>
                    <p className="text-blue-700">
                      When checked, you will be given 10 questions. Your score will be automatically submitted at the end.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Practice Area */}
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0 lg:border-l border-gray-200 lg:pl-10">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Practice</h2>
              
              <ScoreBoard correctCount={correctCount} incorrectCount={incorrectCount} />

              {/* Problem Area */}
              {sessionActive && currentProblem ? (
                <>
                  <div className="min-h-[10rem] mb-4">
                    <p 
                      className="text-xl text-gray-700 mb-6 leading-relaxed text-center"
                      dangerouslySetInnerHTML={{ __html: currentProblem.question }}
                    />
                    
                    <form onSubmit={handleSubmit}>
                      <input
                        type="number"
                        step="any"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-200"
                        placeholder="Enter your answer..."
                        autoFocus
                        required
                      />
                      
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md active:shadow-sm active:translate-y-px mt-3"
                      >
                        Submit Answer
                      </button>
                    </form>
                  </div>

                  {/* Feedback */}
                  {feedback && (
                    <div className={`text-lg font-medium text-center mt-6 ${
                      feedbackType === 'success' ? 'text-green-600' :
                      feedbackType === 'error' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {feedback}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg">
                  <p className="text-lg">Please select your settings and click &quot;Start New Session&quot; to begin.</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={() => sessionActive ? endSession(false) : startSession()}
              className={`w-full p-4 rounded-lg font-semibold transition duration-200 shadow-md active:shadow-sm active:translate-y-px mb-6 ${
                sessionActive
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {sessionActive ? 'End Current Session' : 'Start New Session'}
            </button>

            {!sessionActive && (
              <ProblemTypeSelector
                problemTypes={angleProblemTypes}
                selectedTypes={selectedProblemTypes}
                onChange={setSelectedProblemTypes}
              />
            )}
          </div>
        </div>
      </div>

      <SolutionModal
        isOpen={showSolution}
        solution={currentProblem?.solution || ''}
        onContinue={handleContinue}
      />
    </div>
  );
}

