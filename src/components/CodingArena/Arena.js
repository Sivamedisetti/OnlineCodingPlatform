import React, { useState } from 'react';
import ProblemList from './ProblemList';
import ProblemDetail from './ProblemDetail';
import UploadProblem from './UploadProblem';
import './ArenaStyle.css';

function Arena() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'detail', 'upload'

  return (
    <div className="arena-container">
      <h1>Coding Arena</h1>
      {view === 'list' && <ProblemList onSelectProblem={setSelectedProblem} />}
      {view === 'detail' && selectedProblem && <ProblemDetail problem={selectedProblem} />}
      {view === 'upload' && <UploadProblem />}
      <div className="view-buttons">
        <button onClick={() => setView('list')}>Problem List</button>
        <button onClick={() => setView('upload')}>Upload Problem</button>
      </div>
    </div>
  );
}

export default Arena;
