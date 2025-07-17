import { useState } from 'react';
import ClassicMode from './pages/ClassicMode.jsx';
import PuzzleMode from './pages/PuzzleMode.jsx';
import './App.css';

function App() {
  const [mode, setMode] = useState('menu');

  if (mode === 'classic') {
    return <ClassicMode goBack={() => setMode('menu')} />;
  }

  if (mode === 'puzzle') {
    return <PuzzleMode goBack={() => setMode('menu')} />;
  }

  return (
    <div className="container">
      <h1>🎯 NumSense</h1>
      <button onClick={() => setMode('classic')}>Classic Duel</button>
      <button onClick={() => setMode('puzzle')}>Puzzle Duel</button>
    </div>
  );
}

export default App;