import React, { useState } from 'react';
import CodeEditor from './Editor'; // Correctly import your CodeEditor component
import axios from 'axios';
import './EditorStyle.css'; // Import CSS for consistent styling

function Playground() {
  const [code, setCode] = useState('// Write your code here');
  const [Input, setInput] = useState([]);

  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(0);
  const [Data, setData] = useState({
    "language": "python",
    "version": "3.10.0",
    "files": [
      {
        "name": "my_cool_code.js",
        "content": code
      }
    ],
    "stdin":"",
    "args": ["1", "2", "3"],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
  });
  const executeCode = () => {
    Data.files[0].content = code;
    Data.stdin = Input;
    // console.log(Data)
    axios.post('https://emkc.org/api/v2/piston/execute',  Data)
      .then(response => {
        console.log(response)
        setOutput(response.data.run.output);
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
      <input type="text" onChange={(event) => {}}/>
    </div>
  );
}

export default Playground;
