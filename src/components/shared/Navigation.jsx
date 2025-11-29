import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Target, GraduationCap, HelpCircle } from 'lucide-react';

/**
 * Navigation Component - Academic Premium Design
 * Professional academic navigation bar
 */
export function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 border-b-4 border-slate-600 mb-1.5 shadow-lg">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link to="/" className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold hidden sm:inline">Polygon Practice</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive('/')
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/angles"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive('/angles')
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Angles</span>
            </Link>
            <Link
              to="/diagonals"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive('/diagonals')
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Diagonals</span>
            </Link>
            <Link
              to="/help"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive('/help')
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
