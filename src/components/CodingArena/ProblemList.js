import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArenaStyle.css';

function ProblemList({ onSelectProblem }) {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get('/api/problems')
      .then(response => setProblems(response.data))
      .catch(error => console.error('Error fetching problems:', error));
  }, []);

  return (
    <div className="problem-list">
      <h2>Available Problems</h2>
      <ul>
        {problems.map(problem => (
          <li key={problem.id}>
            <a href="#" onClick={() => onSelectProblem(problem)}>
              {problem.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
