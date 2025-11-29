/**
 * SolutionModal Component
 * Modal that displays the solution when the answer is incorrect
 */
export function SolutionModal({ isOpen, solution, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Incorrect</h2>
        <p className="text-lg text-gray-700 mb-4">Here&apos;s the correct solution:</p>
        <div 
          className="text-base text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6"
          dangerouslySetInnerHTML={{ __html: solution }}
        />
        <button
          onClick={onContinue}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

