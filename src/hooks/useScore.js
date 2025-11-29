import { useState } from 'react';

/**
 * Custom hook for managing scores
 */
export function useScore() {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [problemHistory, setProblemHistory] = useState([]);

  const incrementCorrect = () => {
    setCorrectCount(prev => prev + 1);
  };

  const incrementIncorrect = () => {
    setIncorrectCount(prev => prev + 1);
  };

  const addToProblemHistory = (problem) => {
    setProblemHistory(prev => [...prev, problem]);
  };

  const resetScore = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setProblemHistory([]);
  };

  const updateLastProblemResult = (userAnswer, isCorrect) => {
    setProblemHistory(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          userAnswer,
          isCorrect
        };
      }
      return updated;
    });
  };

  return {
    correctCount,
    incorrectCount,
    problemHistory,
    incrementCorrect,
    incrementIncorrect,
    addToProblemHistory,
    updateLastProblemResult,
    resetScore
  };
}

