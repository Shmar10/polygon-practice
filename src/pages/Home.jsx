import { Link } from 'react-router-dom';
import { BookOpen, Trophy, TrendingUp, Lightbulb, Target, Shapes, Sparkles } from 'lucide-react';

/**
 * Home Page
 * Landing page with links to practice modes
 */
export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-soft mb-4">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-primary-600">Interactive Learning Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Polygon Practice
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Master polygon angles and diagonals with interactive practice problems
          </p>
        </div>

        {/* Practice Mode Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Angles Card */}
          <Link
            to="/angles"
            className="block bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-white/50"
          >
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-500"></div>
              <div className="flex items-center justify-between relative z-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shapes className="w-7 h-7" />
                  Angle Practice
                </h2>
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4 font-medium">
                Practice calculating interior angles, exterior angles, and solving algebra problems with polygons.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-5">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  Sum of interior/exterior angles
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  Finding sides from angle measurements
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  Algebraic angle problems
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  10-question challenge mode
                </li>
              </ul>
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                <span className="font-bold text-blue-700">Start Practicing</span>
                <div className="flex items-center gap-1 text-blue-600">
                  <span className="text-sm font-semibold">Go</span>
                  <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Diagonals Card */}
          <Link
            to="/diagonals"
            className="block bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-white/50"
          >
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800 p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-500"></div>
              <div className="flex items-center justify-between relative z-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Target className="w-7 h-7" />
                  Diagonal Practice
                </h2>
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4 font-medium">
                Learn about polygon diagonals, including total diagonals and diagonals from a vertex.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-5">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  Calculate total diagonals
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  Diagonals from a single vertex
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  Finding sides from diagonal count
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  Multi-step diagonal problems
                </li>
              </ul>
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg group-hover:from-purple-100 group-hover:to-pink-100 transition-colors">
                <span className="font-bold text-purple-700">Start Practicing</span>
                <div className="flex items-center gap-1 text-purple-600">
                  <span className="text-sm font-semibold">Go</span>
                  <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft-lg p-6 border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">Why Choose Polygon Practice?</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <TrendingUp className="w-7 h-7 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Track Progress</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Monitor your correct and incorrect answers in real-time
              </p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Lightbulb className="w-7 h-7 text-success-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Step-by-Step Solutions</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Learn from detailed explanations when you get stuck
              </p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-warning-100 to-warning-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Trophy className="w-7 h-7 text-warning-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Challenge Mode</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Test yourself with 10-question challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
