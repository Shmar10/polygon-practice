import { X } from 'lucide-react';

/**
 * Formula Modal Component
 * Displays quick reference formulas in a modal overlay
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback to close the modal
 * @param {string} type - 'angles', 'diagonals', or 'all' to determine which formulas to show
 */
export function FormulaModal({ isOpen, onClose, type = 'all' }) {
  if (!isOpen) return null;

  const showAngles = type === 'angles' || type === 'all';
  const showDiagonals = type === 'diagonals' || type === 'all';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Formula Reference</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className={`${showAngles && showDiagonals ? 'grid md:grid-cols-2 gap-4' : ''}`}>
            {/* Angle Formulas */}
            {showAngles && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Angle Formulas</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Sum of Interior Angles:</p>
                    <p className="font-mono text-gray-700">S<sub>I</sub> = (n - 2) × 180°</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Each Interior Angle (regular):</p>
                    <p className="font-mono text-gray-700">I = (n - 2) × 180° ÷ n</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Sum of Exterior Angles:</p>
                    <p className="font-mono text-gray-700">S<sub>E</sub> = 360°</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Each Exterior Angle (regular):</p>
                    <p className="font-mono text-gray-700">E = 360° ÷ n</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Finding Sides from Exterior Angle:</p>
                    <p className="font-mono text-gray-700">n = 360° ÷ E</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Interior + Exterior Angle:</p>
                    <p className="font-mono text-gray-700">I + E = 180°</p>
                  </div>
                </div>
              </div>
            )}

            {/* Diagonal Formulas */}
            {showDiagonals && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Diagonal Formulas</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Total Number of Diagonals:</p>
                    <p className="font-mono text-gray-700">d = n(n - 3) ÷ 2</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">Diagonals from One Vertex:</p>
                    <p className="font-mono text-gray-700">d = n - 3</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-mono font-semibold">n</span> = number of sides in the polygon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

