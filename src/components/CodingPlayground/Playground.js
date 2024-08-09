import React, { useState } from 'react';
import CodeEditor from './Editor'; // Correctly import your CodeEditor component
import axios from 'axios';
import './EditorStyle.css'; // Import CSS for consistent styling

function Playground() {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(0);

  const executeCode = () => {
    axios.post('/api/execute', { code })
      .then(response => {
        setOutput(response.data.output);
        setExecutionTime(response.data.executionTime);
      })
      .catch(error => {
        setOutput(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <h1>Coding Playground</h1>
      <CodeEditor code={code} setCode={setCode} />
      <button className="execute-btn" onClick={executeCode}>Execute</button>
      <div className="output-container">
        <h2>Output</h2>
        <pre>{output}</pre>
        <p>Execution Time: {executionTime}ms</p>
      </div>
    </div>
  );
}

export default Playground;
