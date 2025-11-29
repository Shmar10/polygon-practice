import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScoreBoard } from '../components/shared/ScoreBoard';
import { SolutionModal } from '../components/shared/SolutionModal';
import { FormulaModal } from '../components/shared/FormulaModal';
import { HintDisplay } from '../components/shared/HintDisplay';
import { ProblemTypeSelector } from '../components/shared/ProblemTypeSelector';
import { ScoreCard } from '../components/shared/ScoreCard';
import { useScore } from '../hooks/useScore';
import { generateAngleProblem, angleProblemTypes } from '../utils/angleProblems';
import { shuffle } from '../utils/polygonHelpers';
import { submitScore } from '../utils/googleSheets';
import { BookOpen, Trophy, CheckCircle, Zap, ArrowLeft, Sparkles, BookMarked, Lightbulb } from 'lucide-react';

const CHALLENGE_LENGTH = 10;

export function AnglesPage() {
  const location = useLocation();
  
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
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [classPeriod, setClassPeriod] = useState('');
  const [selectedProblemTypes, setSelectedProblemTypes] = useState(
    angleProblemTypes.map(pt => pt.id)
  );
  
  const [challengeQuestionCount, setChallengeQuestionCount] = useState(0);
  const [problemQueue, setProblemQueue] = useState([]);

  // Reset to mode selection when navigating to this page
  useEffect(() => {
    setMode(null);
    setSessionActive(false);
    setShowScoreCard(false);
  }, [location]); // Reset whenever the route location changes

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
    setCurrentHintIndex(-1);

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
        game: 'Angles',
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
        game="Polygon Angles"
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
              Polygon Angle Practice
            </h1>
            <p className="text-gray-700 text-sm mb-3">
              Choose your mode: Practice freely or take a 10-question challenge
            </p>
            <button
              onClick={() => setIsFormulaModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              <BookMarked className="w-4 h-4" />
              Quick Formulas
            </button>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-4 sm:p-5 shadow-2xl">
          {/* Mode Selection Screen */}
          {!sessionActive && !mode && (
            <div className="max-w-5xl mx-auto animate-slide-up">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
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
                    Free practice with instant feedback. Perfect for learning and improving your skills.
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
                    Test your knowledge with 10 questions. Your score will be submitted automatically.
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
                  problemTypes={angleProblemTypes}
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
            <div className="max-w-6xl mx-auto">
              {/* Challenge Question Counter (if applicable) */}
              {mode === 'challenge' && (
                <div className="glass px-6 py-3 rounded-2xl border border-white/30 mb-6 text-center max-w-xs mx-auto">
                  <span className="text-sm text-gray-700 font-medium">
                    Question {challengeQuestionCount + 1} of {CHALLENGE_LENGTH}
                  </span>
                </div>
              )}

              {/* Two-column layout: Problem on left, Controls on right */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Problem Card - Takes 2 columns */}
                <div className="md:col-span-2">
                  <div className="glass-strong rounded-3xl px-8 pt-6 pb-8 border border-white/30">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentProblem.question}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="mb-6">
                    <input
                      type="number"
                      step="0.01"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-4 text-center text-2xl font-bold rounded-2xl border-2 border-white/40 bg-white/60 focus:border-indigo-400 focus:bg-white/90 outline-none transition-all backdrop-blur-sm"
                      placeholder="Your answer"
                      disabled={showSolution}
                      autoFocus
                    />
                  </div>

                  {!showSolution && (
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                    >
                      Submit Answer
                    </button>
                  )}

                  {feedback && (
                    <div className={`mt-6 p-4 rounded-2xl text-center font-semibold ${
                      feedbackType === 'success' ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300' :
                      feedbackType === 'error' ? 'bg-rose-100 text-rose-800 border-2 border-rose-300' :
                      'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    }`}>
                      {feedback}
                    </div>
                  )}

                  {/* Hints Display */}
                  {mode === 'practice' && currentProblem?.hints && (
                    <HintDisplay
                      hints={currentProblem.hints}
                      currentHintIndex={currentHintIndex}
                      onShowNextHint={() => setCurrentHintIndex(prev => Math.min(prev + 1, currentProblem.hints.length - 1))}
                    />
                  )}
                </form>
                  </div>
                </div>

                {/* Right Sidebar - Controls */}
                <div className="space-y-4">
                  <ScoreBoard correct={correctCount} incorrect={incorrectCount} />
                  <button
                    onClick={() => endSession(false)}
                    className="w-full glass px-6 py-3 rounded-2xl text-gray-700 font-semibold hover:bg-white/30 transition-colors border border-white/30"
                  >
                    End Session
                  </button>
                  {mode === 'practice' && currentProblem?.hints && !showSolution && (
                    <button
                      type="button"
                      onClick={() => setCurrentHintIndex(prev => Math.min(prev + 1, currentProblem.hints.length - 1))}
                      className="w-full py-3 px-6 rounded-2xl font-semibold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-300 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Lightbulb className="w-5 h-5" />
                      {currentHintIndex < 0 ? 'Show Hint' : 'Show Next Hint'}
                    </button>
                  )}
                </div>
              </div>

              {/* Solution Modal */}
              <SolutionModal
                isOpen={showSolution && currentProblem}
                solution={currentProblem?.solution || ''}
                onContinue={handleContinue}
              />
            </div>
          )}
        </div>
      </div>

      {/* Formula Modal */}
      <FormulaModal 
        isOpen={isFormulaModalOpen} 
        onClose={() => setIsFormulaModalOpen(false)} 
        type="angles"
      />
    </div>
  );
}
