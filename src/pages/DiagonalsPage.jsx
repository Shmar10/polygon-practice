import { useState, useEffect } from 'react';
import { ScoreBoard } from '../components/shared/ScoreBoard';
import { ScoreCard } from '../components/shared/ScoreCard';
import { ProblemTypeSelector } from '../components/shared/ProblemTypeSelector';
import { useScore } from '../hooks/useScore';
import { generateDiagonalProblem, diagonalProblemTypes } from '../utils/diagonalProblems';
import { submitScore } from '../utils/googleSheets';
import { BookOpen, Trophy, CheckCircle, Zap, ArrowLeft, Target, Sparkles } from 'lucide-react';

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

  const [mode, setMode] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showScoreCard, setShowScoreCard] = useState(false);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [classPeriod, setClassPeriod] = useState('');
  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    diagonalProblemTypes.map(pt => pt.id)
  );
  
  const [challengeQuestionCount, setChallengeQuestionCount] = useState(0);
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

  const handleContinue = () => {
    setShowSolution(false);
    checkProgress(false);
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
      setShowScoreCard(true);
    } else {
      let message = 'Session stopped.';
      setFeedback(message);
      setFeedbackType('info');
      setMode(null);
    }
  };

  const handleSubmitScoreToSheets = async () => {
    try {
      await submitScore({
        firstName,
        lastName,
        classPeriod,
        game: 'Diagonals',
        mode: 'Challenge',
        correct: correctCount,
        incorrect: incorrectCount,
        total: CHALLENGE_LENGTH,
        problemHistory
      });
      alert('Score submitted successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Failed to submit score. You can download the score card instead.');
    }
  };

  const handleBackToModes = () => {
    setMode(null);
    setFirstName('');
    setLastName('');
    setClassPeriod('');
  };

  const handleCloseScoreCard = () => {
    setShowScoreCard(false);
    setMode(null);
  };

  if (showScoreCard) {
    return (
      <ScoreCard
        firstName={firstName}
        lastName={lastName}
        classPeriod={classPeriod}
        game="Polygon Diagonals"
        mode="Challenge"
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        totalQuestions={CHALLENGE_LENGTH}
        problemHistory={problemHistory}
        onClose={handleCloseScoreCard}
        onSubmitToSheets={handleSubmitScoreToSheets}
      />
    );
  }

  return (
    <div className="min-h-screen py-2 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header - Academic style for readability */}
        <div className="text-center mb-1.5 animate-fade-in">
          <div className="academic-card rounded-lg p-4 max-w-2xl mx-auto border-t-4 border-t-slate-600">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Polygon Diagonal Practice
            </h1>
            <p className="text-gray-700 text-sm">
              Choose your mode: Practice freely or take a 10-question challenge
            </p>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-4 sm:p-5 shadow-2xl">
          {/* Mode Selection Screen */}
          {!sessionActive && !mode && (
            <div className="max-w-5xl mx-auto animate-slide-up">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-gray-700 text-sm">Select Your Mode</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-1 mb-1">
                {/* Practice Mode Card */}
                <div className="academic-card rounded-lg p-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                     onClick={() => setMode('practice')}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-600 flex items-center justify-center group-hover:rotate-12 transition-transform flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Practice Mode</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">
                    Free practice with instant feedback and detailed solutions. Perfect for learning diagonal calculations.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Practice at your own pace</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Choose problem types</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>See solutions immediately</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>No time limits or pressure</span>
                    </li>
                  </ul>
                  <div className="glass-strong p-3 rounded-xl text-center group-hover:bg-white/30 transition-colors">
                    <span className="font-bold text-black text-sm">Start Practice Mode</span>
                  </div>
                </div>

                {/* Challenge Mode Card */}
                <div className="academic-card rounded-lg p-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                     onClick={() => setMode('challenge')}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-600 flex items-center justify-center group-hover:rotate-12 transition-transform flex-shrink-0">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Challenge Mode</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">
                    Test your diagonal knowledge with 10 questions. Your score will be submitted automatically.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span>Exactly 10 questions</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span>Automatic score submission</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span>Track your progress</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-sm">
                      <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span>Requires name & class period</span>
                    </li>
                  </ul>
                  <div className="glass-strong p-3 rounded-xl text-center group-hover:bg-white/30 transition-colors">
                    <span className="font-bold text-black text-sm">Start Challenge Mode</span>
                  </div>
                </div>
              </div>

              {/* Problem Type Selector */}
              <div className="academic-card rounded-lg p-4">
                <ProblemTypeSelector
                  problemTypes={diagonalProblemTypes}
                  selectedTypes={selectedProblemTypes}
                  onChange={setSelectedProblemTypes}
                />
              </div>
            </div>
          )}

          {/* Setup Screen */}
          {!sessionActive && mode && (
            <div className="max-w-2xl mx-auto animate-slide-up">
              <button
                onClick={handleBackToModes}
                className="mb-6 text-white hover:text-white/80 flex items-center gap-2 font-medium transition-all group glass px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Mode Selection
              </button>

              <div className={`glass rounded-2xl p-6 mb-6 border-2 ${
                mode === 'challenge' ? 'border-purple-300' : 'border-blue-300'
              }`}>
                <h2 className={`text-2xl font-bold mb-2 ${mode === 'challenge' ? 'text-purple-800' : 'text-blue-800'}`}>
                  {mode === 'challenge' ? '🏆 Challenge Mode' : '📝 Practice Mode'}
                </h2>
                <p className="text-gray-700">
                  {mode === 'challenge' 
                    ? 'Complete 10 questions and submit your score'
                    : 'Practice freely with instant feedback'}
                </p>
              </div>

              {mode === 'challenge' && (
                <div className="glass rounded-2xl p-6 mb-6 border border-white/30">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/50 focus:border-purple-400 focus:bg-white/80 outline-none transition-all backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/50 focus:border-purple-400 focus:bg-white/80 outline-none transition-all backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class Period *</label>
                    <input
                      type="text"
                      value={classPeriod}
                      onChange={(e) => setClassPeriod(e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/50 focus:border-purple-400 focus:bg-white/80 outline-none transition-all backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => startSession(mode)}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 ${
                  mode === 'challenge'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                }`}
              >
                {mode === 'challenge' ? '🏆 Begin Challenge' : '📝 Start Practicing'}
              </button>
            </div>
          )}

          {/* Active Session */}
          {sessionActive && currentProblem && (
            <div className="max-w-3xl mx-auto">
              {/* Progress Header */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                {mode === 'challenge' && (
                  <div className="glass px-6 py-3 rounded-2xl border border-white/30">
                    <span className="text-sm text-gray-700 font-medium">
                      Question {challengeQuestionCount + 1} of {CHALLENGE_LENGTH}
                    </span>
                  </div>
                )}
                <ScoreBoard correct={correctCount} incorrect={incorrectCount} />
                <button
                  onClick={() => endSession(false)}
                  className="glass px-6 py-3 rounded-2xl text-gray-700 font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  End Session
                </button>
              </div>

              {/* Problem Card */}
              <div className="glass-strong rounded-3xl p-8 mb-6 border border-white/30">
                <div className="text-center mb-8">
                  <span className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-4 border border-white/30">
                    {currentProblem.type}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentProblem.question}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="mb-6">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-4 text-center text-2xl font-bold rounded-2xl border-2 border-white/40 bg-white/60 focus:border-purple-400 focus:bg-white/90 outline-none transition-all backdrop-blur-sm"
                      placeholder="Your answer"
                      disabled={showSolution}
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-3">
                    {!showSolution && (
                      <>
                        <button
                          type="submit"
                          className="flex-1 py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                        >
                          Submit Answer
                        </button>
                        {mode === 'practice' && (
                          <button
                            type="button"
                            onClick={handleShowAnswer}
                            className="px-6 py-4 rounded-2xl font-semibold text-gray-700 glass hover:bg-white/30 transition-colors border border-white/30"
                          >
                            Show Answer
                          </button>
                        )}
                      </>
                    )}
                    {showSolution && (
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-2xl"
                      >
                        Continue →
                      </button>
                    )}
                  </div>

                  {feedback && (
                    <div className={`mt-6 p-4 rounded-2xl text-center font-semibold ${
                      feedbackType === 'success' ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300' :
                      feedbackType === 'error' ? 'bg-rose-100 text-rose-800 border-2 border-rose-300' :
                      'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    }`}>
                      {feedback}
                    </div>
                  )}
                </form>

                {showSolution && currentProblem && (
                  <div className="mt-8 glass rounded-2xl p-6 border border-white/30">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Solution:</h4>
                    <div className="text-gray-700 space-y-2">
                      <p className="font-semibold">Answer: {currentProblem.answer}</p>
                      {currentProblem.solution && (
                        <div className="text-sm">
                          <p className="font-medium mb-1">Explanation:</p>
                          <p className="whitespace-pre-line">{currentProblem.solution}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
