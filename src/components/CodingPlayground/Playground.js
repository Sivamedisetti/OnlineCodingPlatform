import React, { useState } from 'react';
import CodeEditor from './Editor'; // Correctly import your CodeEditor component
import axios from 'axios';
import './EditorStyle.css'; // Import CSS for consistent styling

function Playground() {
  const [code, setCode] = useState('# Your code starts here.. ');
  const [input, setInput] = useState('');  // Store the multiline input as a string
  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(0);
  const [data, setData] = useState({
    "language": "",
    "version": "",
    "files": [
      {
        "name": "my_cool_code.js",
        "content": code
      }
    ],
    "stdin": "",
    "args": ["1", "2", "3"],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
  });
  const [codelang , setCodelang] = useState('python');
  const handleChange = (e) => {
    setCodelang(e.target.value);
  }
  const versions = {
    python: '3.10.0',
    cpp: '10.2.0',
    c: '10.2.0',
    java: '15.0.2'
  };
  const executeCode = () => {
    data.files[0].content = code;
    data.language = codelang;
    data.version = versions[codelang];
    // Join the input lines into a single string with spaces, or handle as required by your execution environment
    data.stdin = input; // Or input.split("\n").join(" ") if space-separated values are required
    
    axios.post('https://emkc.org/api/v2/piston/execute', data)
      .then(response => {
        console.log(response);
        setOutput(response.data.run.output);
        setExecutionTime(response.data.run.time);
      })
      .catch(error => {
        setOutput(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <h1>Coding Playground</h1>
      <select onChange={handleChange}>
        <option value="python">python</option>
        <option value="c">c</option>
        <option value="cpp">cpp</option>
        <option value="java">java</option>
      </select>
      <CodeEditor code={code} setCode={setCode} codelang={codelang}/>
      <div className='input-container'>
        <h2>Custom Input</h2>
        <textarea 
          value={input} 
          onChange={(event) => setInput(event.target.value)} 
          placeholder="Enter your input here, one per line" 
        />
      </div>
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
