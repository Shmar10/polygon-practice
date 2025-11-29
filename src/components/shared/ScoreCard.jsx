import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Trophy, Medal, Award, Star, Download, Printer, Send, X } from 'lucide-react';

/**
 * ScoreCard Component
 * Displays a beautiful, downloadable score card after completing a challenge
 */
export function ScoreCard({ 
  firstName, 
  lastName, 
  classPeriod, 
  mode, 
  correct, 
  total, 
  onClose,
  onSubmitToSheets 
}) {
  const cardRef = useRef(null);
  const percentage = Math.round((correct / total) * 100);
  
  // Generate unique challenge ID
  const challengeId = generateChallengeId(mode, percentage);
  
  // Get performance tier
  const tier = getPerformanceTier(percentage);
  
  // Create visual checkmarks
  const results = Array(total).fill(null).map((_, i) => i < correct);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;

    try {
      // Add downloading state
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = `${firstName}_${lastName}_${mode.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.png`;
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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col animate-scale-in">
        {/* Scrollable container for score card */}
        <div className="overflow-y-auto flex-1">
          {/* Score Card - Optimized for screenshot/download */}
          <div 
            ref={cardRef} 
            className={`p-6 sm:p-8 md:p-10 ${tier.bgGradient} rounded-t-2xl`}
          >
          {/* Header with Medal/Icon */}
          <div className="text-center mb-4 sm:mb-6 animate-slide-down">
            <div className="relative inline-block mb-3 sm:mb-4">
              <tier.Icon className={`w-16 h-16 sm:w-20 sm:h-20 ${tier.iconColor} animate-scale-in`} strokeWidth={1.5} />
              {percentage >= 90 && (
                <div className="absolute -inset-1 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              )}
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${tier.textColor} mb-2`}>
              {tier.title}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              Challenge Complete!
            </p>
          </div>

          {/* Student Info Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6">
            <div className="text-center mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {firstName} {lastName}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">{classPeriod}</p>
            </div>

            {/* Mode/Game Type */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-base sm:text-lg">
                {mode}
              </div>
            </div>

            {/* Score Display */}
            <div className="text-center mb-4 sm:mb-6">
              <div className={`text-5xl sm:text-6xl md:text-7xl font-bold ${tier.scoreColor} mb-2`}>
                {correct}/{total}
              </div>
              <div className={`text-2xl sm:text-3xl font-semibold ${tier.scoreColor}`}>
                {percentage}%
              </div>
            </div>

            {/* Visual Results */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {results.map((isCorrect, index) => (
                <div
                  key={index}
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg ${
                    isCorrect ? 'bg-green-500' : 'bg-red-400'
                  }`}
                >
                  {isCorrect ? '✓' : '✗'}
                </div>
              ))}
            </div>

            {/* Timestamp and ID */}
            <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4 text-center text-gray-600 text-xs sm:text-sm">
              <p className="mb-1">
                <strong>Completed:</strong> {new Date().toLocaleString()}
              </p>
              <p className="font-mono bg-gray-100 inline-block px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                ID: {challengeId}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4 text-center">
            <p className="text-blue-800 font-medium text-sm sm:text-base">
              📱 Screenshot this card or download it below to submit to your teacher
            </p>
          </div>
          </div>
        </div>

        {/* Action Buttons - Not included in download - Fixed at bottom */}
        <div className="p-4 sm:p-6 bg-gray-50 rounded-b-2xl border-t space-y-2 sm:space-y-3 flex-shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={handleDownloadImage}
              className="bg-primary-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 flex items-center justify-center text-sm sm:text-base shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </button>
            
            <button
              onClick={handlePrint}
              className="bg-gray-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center justify-center text-sm sm:text-base shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
          </div>

          {onSubmitToSheets && (
            <button
              onClick={onSubmitToSheets}
              className="w-full bg-success-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-success-700 transition-all duration-200 flex items-center justify-center text-sm sm:text-base shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4 mr-2" />
              Also Submit to Google Sheets
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full bg-white text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 border-2 border-gray-300 text-sm sm:text-base transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-500 pt-1 sm:pt-2">
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
      bgGradient: 'bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-100',
      textColor: 'text-yellow-800',
      scoreColor: 'text-yellow-600',
      iconColor: 'text-yellow-600',
      medal: 'Gold'
    };
  } else if (percentage >= 80) {
    return {
      title: 'EXCELLENT!',
      Icon: Medal,
      bgGradient: 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100',
      textColor: 'text-gray-800',
      scoreColor: 'text-gray-600',
      iconColor: 'text-gray-600',
      medal: 'Silver'
    };
  } else if (percentage >= 70) {
    return {
      title: 'GOOD JOB!',
      Icon: Award,
      bgGradient: 'bg-gradient-to-br from-orange-300 via-orange-200 to-orange-100',
      textColor: 'text-orange-800',
      scoreColor: 'text-orange-600',
      iconColor: 'text-orange-600',
      medal: 'Bronze'
    };
  } else {
    return {
      title: 'COMPLETED!',
      Icon: Star,
      bgGradient: 'bg-gradient-to-br from-blue-300 via-blue-200 to-blue-100',
      textColor: 'text-blue-800',
      scoreColor: 'text-blue-600',
      iconColor: 'text-blue-600',
      medal: 'Participation'
    };
  }
}

/**
 * Generate a unique challenge ID
 */
function generateChallengeId(mode, percentage) {
  const modeCode = mode.includes('Angles') ? 'A' : 'D';
  const date = new Date();
  const dateCode = date.getFullYear().toString().slice(-2) + 
                   String(date.getMonth() + 1).padStart(2, '0') +
                   String(date.getDate()).padStart(2, '0');
  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${modeCode}${percentage}-${dateCode}-${randomCode}`;
}

