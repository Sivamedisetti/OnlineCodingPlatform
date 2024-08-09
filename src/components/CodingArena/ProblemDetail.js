import React from 'react';
import './ArenaStyle.css';

function ProblemDetail({ problem }) {
  return (
    <div className="problem-detail">
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <h3>Constraints</h3>
      <p>{problem.constraints}</p>
      <h3>Test Cases</h3>
      <pre>{problem.testCases}</pre>
    </div>
  );
}

export default ProblemDetail;
