import React, { useState } from 'react';
import axios from 'axios';
import './ArenaStyle.css';

function UploadProblem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [constraints, setConstraints] = useState('');
  const [testCases, setTestCases] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/problems', { title, description, constraints, testCases })
      .then(response => {
        alert('Problem uploaded successfully!');
        setTitle('');
        setDescription('');
        setConstraints('');
        setTestCases('');
      })
      .catch(error => console.error('Error uploading problem:', error));
  };

  return (
    <div className="upload-problem">
      <h2>Upload New Problem</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Constraints:
          <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} required />
        </label>
        <label>
          Test Cases:
          <textarea value={testCases} onChange={(e) => setTestCases(e.target.value)} required />
        </label>
        <button type="submit">Upload Problem</button>
      </form>
    </div>
  );
}

export default UploadProblem;
