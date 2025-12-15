import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, TrendingUp, Lightbulb, GraduationCap, Award, CheckCircle, BookMarked } from 'lucide-react';
import { FormulaModal } from '../components/shared/FormulaModal';

/**
 * Home Page - Academic Premium Design
 * Classic, professional academic aesthetic
 */
export function Home() {
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  return (
    <div className="min-h-screen py-2 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Academic Header */}
        <div className="text-center mb-1.5 animate-fade-in">
          <div className="academic-card-raised rounded-lg p-6 mx-auto border-t-4 border-t-slate-600">
            <p className="text-xl text-gray-800 font-semibold mb-2">
              Master polygon angles and diagonals with interactive practice
            </p>
            <p className="text-base text-gray-600">
              A comprehensive learning platform for geometry students
            </p>
            <button
              onClick={() => setIsFormulaModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              <BookMarked className="w-5 h-5" />
              Quick Formula Reference
            </button>
          </div>
        </div>

        {/* Practice Mode Cards */}
        <div className="grid md:grid-cols-2 gap-1.5 mb-1.5">
          {/* Angles Card */}
          <Link
            to="/angles"
            className="block group"
          >
            <div className="academic-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
              {/* Header */}
              <div className="academic-header p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-600 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Angle Practice
                  </h2>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 bg-white">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed border-l-4 border-blue-500 pl-3">
                  Practice calculating interior angles, exterior angles, and solving algebra problems with polygons.
                </p>
                <ul className="space-y-2 mb-5">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Sum of interior/exterior angles</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Finding sides from angle measurements</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Algebraic angle problems</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">10-question challenge mode</span>
                  </li>
                </ul>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg text-center font-semibold group-hover:from-blue-700 group-hover:to-blue-600 transition-all shadow-md hover:shadow-lg">
                    Begin Angle Practice →
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Diagonals Card */}
          <Link
            to="/diagonals"
            className="block group"
          >
            <div className="academic-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
              {/* Header */}
              <div className="academic-header p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-600 flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Diagonal Practice
                  </h2>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 bg-white">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed border-l-4 border-blue-500 pl-3">
                  Learn about polygon diagonals, including total diagonals and diagonals from a vertex.
                </p>
                <ul className="space-y-2 mb-5">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Calculate total diagonals</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Diagonals from a single vertex</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Finding sides from diagonal count</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">Multi-step diagonal problems</span>
                  </li>
                </ul>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg text-center font-semibold group-hover:from-blue-700 group-hover:to-blue-600 transition-all shadow-md hover:shadow-lg">
                    Begin Diagonal Practice →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="academic-card rounded-lg p-8 border-t-4 border-t-slate-600">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Polygon Practice?</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-1.5">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Track Progress</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Monitor your correct and incorrect answers in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Step-by-Step Solutions</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn from detailed explanations when you get stuck
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Challenge Mode</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Test yourself with 10-question challenges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Modal */}
      <FormulaModal 
        isOpen={isFormulaModalOpen} 
        onClose={() => setIsFormulaModalOpen(false)} 
        type="all"
      />
    </div>
  );
}
