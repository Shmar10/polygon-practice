import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Component
 * Main navigation bar for the app
 */
export function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            Polygon Practice
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/angles"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/angles')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Angles
            </Link>
            <Link
              to="/diagonals"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/diagonals')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Diagonals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

