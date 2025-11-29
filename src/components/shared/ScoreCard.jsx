import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Trophy, Medal, Award, Star, Download, Printer, Send, X, Sparkles } from 'lucide-react';

/**
 * ScoreCard Component - Glassmorphism Design
 * Displays a beautiful, downloadable score card after completing a challenge
 */
export function ScoreCard({ 
  firstName, 
  lastName, 
  classPeriod,
  game,
  mode, 
  correctCount,
  incorrectCount,
  totalQuestions,
  onClose,
  onSubmitToSheets 
}) {
  const cardRef = useRef(null);
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  
  // Generate unique challenge ID
  const challengeId = generateChallengeId(game, percentage);
  
  // Get performance tier
  const tier = getPerformanceTier(percentage);
  
  // Create visual checkmarks
  const results = Array(totalQuestions).fill(null).map((_, i) => i < correctCount);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = `${firstName}_${lastName}_${game.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Error creating image. Please try taking a screenshot instead.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'}}>
      <div className="glass-card rounded-3xl w-full max-w-2xl max-h-[95vh] flex flex-col animate-scale-in border border-white/30">
        {/* Scrollable container for score card */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {/* Score Card - Optimized for screenshot/download */}
          <div ref={cardRef} className="bg-white rounded-3xl p-8 shadow-2xl">
            {/* Header with Medal/Icon */}
            <div className="text-center mb-8 animate-slide-down">
              <div className="relative inline-block mb-6">
                <div className={`w-24 h-24 rounded-full ${tier.bgGradient} flex items-center justify-center shadow-lg`}>
                  <tier.Icon className="w-14 h-14 text-white" strokeWidth={1.5} />
                </div>
                {percentage >= 90 && (
                  <div className="absolute -inset-2 bg-yellow-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                )}
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <h2 className={`text-4xl font-bold ${tier.textColor} mb-3`}>
                {tier.title}
              </h2>
              <p className="text-gray-600 text-xl font-medium">
                Challenge Complete!
              </p>
            </div>

            {/* Student Info Card */}
            <div className={`rounded-2xl p-6 mb-6 ${tier.cardBg}`}>
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">
                  {firstName} {lastName}
                </h3>
                <p className="text-gray-600 text-lg mt-1">{classPeriod}</p>
              </div>

              {/* Mode/Game Type */}
              <div className="text-center mb-6">
                <div className={`inline-block ${tier.bgGradient} text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg`}>
                  {game}
                </div>
              </div>

              {/* Score Display */}
              <div className="text-center mb-6">
                <div className={`text-7xl font-bold ${tier.scoreColor} mb-2`}>
                  {correctCount}/{totalQuestions}
                </div>
                <div className={`text-4xl font-semibold ${tier.scoreColor}`}>
                  {percentage}%
                </div>
              </div>

              {/* Visual Results */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {results.map((isCorrect, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${
                      isCorrect 
                        ? 'bg-gradient-to-br from-emerald-400 to-green-500' 
                        : 'bg-gradient-to-br from-rose-400 to-red-500'
                    }`}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </div>
                ))}
              </div>

              {/* Timestamp and ID */}
              <div className="border-t-2 border-gray-200 pt-4 mt-4 text-center text-gray-600">
                <p className="mb-2 text-sm">
                  <strong>Completed:</strong> {new Date().toLocaleString()}
                </p>
                <p className="font-mono bg-gray-100 inline-block px-4 py-2 rounded-lg text-sm font-semibold">
                  ID: {challengeId}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className={`${tier.instructionBg} border-2 ${tier.instructionBorder} rounded-2xl p-4 text-center`}>
              <p className={`${tier.instructionText} font-semibold`}>
                📱 Screenshot this card or download it below to submit to your teacher
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Not included in download - Fixed at bottom */}
        <div className="p-6 glass-strong rounded-b-3xl border-t border-white/30 space-y-3 flex-shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleDownloadImage}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Image
            </button>
            
            <button
              onClick={handlePrint}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print
            </button>
          </div>

          {onSubmitToSheets && (
            <button
              onClick={onSubmitToSheets}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-6 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="w-5 h-5 mr-2" />
              Also Submit to Google Sheets
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full glass text-gray-700 py-3 px-6 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 transform hover:scale-105 flex items-center justify-center"
          >
            <X className="w-5 h-5 mr-2" />
            Close
          </button>

          <p className="text-center text-sm text-white/80 pt-2">
            💡 Take a screenshot or download the image above to submit to your teacher
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Get performance tier based on percentage
 */
function getPerformanceTier(percentage) {
  if (percentage >= 90) {
    return {
      title: 'OUTSTANDING!',
      Icon: Trophy,
      bgGradient: 'bg-gradient-to-br from-yellow-400 to-orange-400',
      cardBg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      textColor: 'text-yellow-600',
      scoreColor: 'text-yellow-600',
      instructionBg: 'bg-yellow-50',
      instructionBorder: 'border-yellow-300',
      instructionText: 'text-yellow-800',
      medal: 'Gold'
    };
  } else if (percentage >= 80) {
    return {
      title: 'EXCELLENT!',
      Icon: Medal,
      bgGradient: 'bg-gradient-to-br from-gray-400 to-gray-500',
      cardBg: 'bg-gradient-to-br from-gray-50 to-slate-50',
      textColor: 'text-gray-600',
      scoreColor: 'text-gray-600',
      instructionBg: 'bg-gray-50',
      instructionBorder: 'border-gray-300',
      instructionText: 'text-gray-800',
      medal: 'Silver'
    };
  } else if (percentage >= 70) {
    return {
      title: 'GOOD JOB!',
      Icon: Award,
      bgGradient: 'bg-gradient-to-br from-orange-400 to-amber-500',
      cardBg: 'bg-gradient-to-br from-orange-50 to-amber-50',
      textColor: 'text-orange-600',
      scoreColor: 'text-orange-600',
      instructionBg: 'bg-orange-50',
      instructionBorder: 'border-orange-300',
      instructionText: 'text-orange-800',
      medal: 'Bronze'
    };
  } else {
    return {
      title: 'COMPLETED!',
      Icon: Star,
      bgGradient: 'bg-gradient-to-br from-blue-400 to-indigo-500',
      cardBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      textColor: 'text-blue-600',
      scoreColor: 'text-blue-600',
      instructionBg: 'bg-blue-50',
      instructionBorder: 'border-blue-300',
      instructionText: 'text-blue-800',
      medal: 'Participation'
    };
  }
}

/**
 * Generate a unique challenge ID
 */
function generateChallengeId(game, percentage) {
  const gameCode = game.includes('Angles') ? 'A' : 'D';
  const date = new Date();
  const dateCode = date.getFullYear().toString().slice(-2) + 
                   String(date.getMonth() + 1).padStart(2, '0') +
                   String(date.getDate()).padStart(2, '0');
  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${gameCode}${percentage}-${dateCode}-${randomCode}`;
}
