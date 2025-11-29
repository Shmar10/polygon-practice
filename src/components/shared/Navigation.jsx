import { Link, useLocation } from 'react-router-dom';
import { Home, Shapes, Target } from 'lucide-react';

/**
 * Navigation Component - Glassmorphism Design
 * Main navigation bar for the app with frosted glass effect
 */
export function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-strong mb-8 sticky top-0 z-40 border-b border-white/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link to="/" className="text-xl font-bold text-white hover:text-white/80 transition-colors flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Shapes className="w-5 h-5" />
            </div>
            Polygon Practice
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive('/')
                  ? 'bg-white/30 text-white shadow-lg'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/angles"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive('/angles')
                  ? 'bg-white/30 text-white shadow-lg'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Shapes className="w-4 h-4" />
              <span className="hidden sm:inline">Angles</span>
            </Link>
            <Link
              to="/diagonals"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive('/diagonals')
                  ? 'bg-white/30 text-white shadow-lg'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Diagonals</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
