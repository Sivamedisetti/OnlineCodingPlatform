import React, { useState } from 'react';
import axios from 'axios';
import './ArenaStyle.css';
import ProblemDetail from './ProblemDetail';

function UploadProblem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [constraints, setConstraints] = useState('');
  const [test_cases, setTest_cases] = useState('');
  const [URL , setURL] = useState('')
  const [sample_input , setSample_input] = useState('');
  const [sample_output , setSample_output] = useState('');
  const [Topic_difficulty , setTopic_difficulty] = useState('');
  const ProblemDetails = {
     title, description, constraints,test_cases,
     test_cases,URL,sample_input,sample_output,Topic_difficulty
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/post_problem', ProblemDetails)
      .then(response => {
        alert('Problem uploaded successfully!');
        setTitle('');
        setDescription('');
        setConstraints('');
        setTest_cases('');
        setURL('');
        setSample_input('');
        setSample_output('');
        setTopic_difficulty('');
      })
      .catch(error => console.error('Error uploading problem:', error));
  };

  return (
    <div className="upload-problem">
      <h2>Upload New Problem</h2>
      <form>
        <label>
          Title: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          Topic Difficulty: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" value={Topic_difficulty} onChange={(e) => setTopic_difficulty(e.target.value)} required placeholder='EX:Array_Easy'/>

        </label>

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>

        <label>
          Sample Input:
          <textarea value={sample_input} onChange={(e)=>setSample_input(e.target.value)} required/>
          Sample Output:
          <textarea value={sample_output} onChange={(e)=>setSample_output(e.target.value)} required/>
        </label>

        <label>
          Constraints:
          <textarea type='number' value={constraints} onChange={(e) => setConstraints(e.target.value)} required placeholder='please provide time in ms'/>
        </label>

        <label>
          Test Cases:
          <textarea value={test_cases} onChange={(e) => setTest_cases(e.target.value)} placeholder='Ex: input : "output"'/>
        </label>

        <button onClick={handleSubmit}>Upload Problem</button>
      </form>
    </div>
  );
}

export default UploadProblem;