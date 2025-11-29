import { Link } from 'react-router-dom';
import { BookOpen, Trophy, TrendingUp, Lightbulb, Target, Shapes, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Home Page - Glassmorphism Design
 * Modern frosted glass aesthetic with vibrant gradients
 */
export function Home() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with glass badge */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full shadow-lg mb-6 hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">Interactive Learning Platform</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight text-shadow-white">
            Polygon Practice
          </h1>
          <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Master polygon angles and diagonals with interactive practice
          </p>
        </div>

        {/* Practice Mode Cards - Glassmorphism */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Angles Card */}
          <Link
            to="/angles"
            className="block group animate-slide-up"
          >
            <div className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              {/* Gradient Header */}
              <div className="relative p-8 bg-gradient-to-br from-blue-500/80 via-indigo-500/80 to-purple-600/80 backdrop-blur-xl">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <Shapes className="w-8 h-8 text-white" />
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Angle Practice
                  </h2>
                  <p className="text-white/80 text-sm">
                    Interior, exterior, and algebraic angles
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Practice calculating interior angles, exterior angles, and solving algebra problems with polygons.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Sum of interior/exterior angles</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Finding sides from angle measurements</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Algebraic angle problems</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">10-question challenge mode</span>
                  </li>
                </ul>
                <div className="glass p-4 rounded-2xl group-hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900">Start Practicing</span>
                    <BookOpen className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Diagonals Card */}
          <Link
            to="/diagonals"
            className="block group animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              {/* Gradient Header */}
              <div className="relative p-8 bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-rose-600/80 backdrop-blur-xl">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Diagonal Practice
                  </h2>
                  <p className="text-white/80 text-sm">
                    Total diagonals and vertex calculations
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Learn about polygon diagonals, including total diagonals and diagonals from a vertex.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Calculate total diagonals</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Diagonals from a single vertex</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Finding sides from diagonal count</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Multi-step diagonal problems</span>
                  </li>
                </ul>
                <div className="glass p-4 rounded-2xl group-hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-pink-900">Start Practicing</span>
                    <BookOpen className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section - Glass Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Polygon Practice?</h3>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center group cursor-default">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Track Progress</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Monitor your correct and incorrect answers in real-time
              </p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Step-by-Step Solutions</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn from detailed explanations when you get stuck
              </p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Challenge Mode</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Test yourself with 10-question challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
