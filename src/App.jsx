import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/shared/Navigation';
import { Home } from './pages/Home';
import { AnglesPage } from './pages/AnglesPage';
import { DiagonalsPage } from './pages/DiagonalsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/angles" element={<AnglesPage />} />
          <Route path="/diagonals" element={<DiagonalsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
