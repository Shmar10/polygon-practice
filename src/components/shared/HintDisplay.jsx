import { Lightbulb } from 'lucide-react';

/**
 * HintDisplay Component
 * Shows progressive hints for problems
 * @param {array} hints - Array of hint strings
 * @param {number} currentHintIndex - Index of the current hint being shown
 * @param {function} onShowNextHint - Callback to show the next hint
 */
export function HintDisplay({ hints, currentHintIndex, onShowNextHint }) {
  if (!hints || hints.length === 0 || currentHintIndex < 0) {
    return null;
  }

  const hasMoreHints = currentHintIndex < hints.length - 1;

  return (
    <div className="mt-4 space-y-3">
      {/* Display all hints up to current index */}
      {hints.slice(0, currentHintIndex + 1).map((hint, index) => (
        <div 
          key={index} 
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900 mb-1">
                Hint {index + 1}:
              </p>
              <p className="text-sm text-yellow-800">{hint}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Show Next Hint button if more hints available */}
      {hasMoreHints && (
        <button
          onClick={onShowNextHint}
          className="text-sm text-yellow-700 hover:text-yellow-900 font-semibold underline"
        >
          Show next hint ({currentHintIndex + 2} of {hints.length})
        </button>
      )}
    </div>
  );
}

