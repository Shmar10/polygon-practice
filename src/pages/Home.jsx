import { Link } from 'react-router-dom';

/**
 * Home Page
 * Landing page with links to practice modes
 */
export function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Polygon Practice
          </h1>
          <p className="text-xl text-gray-600">
            Master polygon angles and diagonals with interactive practice problems
          </p>
        </div>

        {/* Practice Mode Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Angles Card */}
          <Link
            to="/angles"
            className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white">Angle Practice</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Practice calculating interior angles, exterior angles, and solving algebra problems with polygons.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Sum of interior/exterior angles
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Finding sides from angle measurements
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Algebraic angle problems
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  10-question challenge mode
                </li>
              </ul>
              <div className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-200 inline-block">
                Start Practicing →
              </div>
            </div>
          </Link>

          {/* Diagonals Card */}
          <Link
            to="/diagonals"
            className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white">Diagonal Practice</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Learn about polygon diagonals, including total diagonals and diagonals from a vertex.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Calculate total diagonals
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Diagonals from a single vertex
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Finding sides from diagonal count
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Multi-step diagonal problems
                </li>
              </ul>
              <div className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-200 inline-block">
                Start Practicing →
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Features</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
              <p className="text-sm text-gray-600">
                Monitor your correct and incorrect answers in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Step-by-Step Solutions</h4>
              <p className="text-sm text-gray-600">
                Learn from detailed explanations when you get stuck
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Challenge Mode</h4>
              <p className="text-sm text-gray-600">
                Test yourself with 10-question challenges (Angles mode)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

