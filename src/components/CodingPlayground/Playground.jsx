import React, { useState } from 'react';
import CodeEditor from './Editor';
import axios from 'axios';
import './EditorStyle.css'; 
import CustomDropdown from './DropDown';

function Playground() {
  const [code, setCode] = useState(`# write python code here...
print('Hello World!')`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(0);

  const [codelang , setCodelang] = useState('python');

  const jdoodleLanguages = {
    python: 'python3',
    cpp: 'cpp17',
    c: 'c',
    java: 'java'
  };

  const executeCode = () => {
    if (!process.env.REACT_APP_JDOODLE_CLIENT_ID || !process.env.REACT_APP_JDOODLE_CLIENT_SECRET) {
      setOutput('Error: JDoodle client ID or client secret is missing.');
      return;
    }

    const data = {
      clientId: process.env.REACT_APP_JDOODLE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_JDOODLE_CLIENT_SECRET,
      script: code,
      language: jdoodleLanguages[codelang],
      versionIndex: '0',
      stdin: input
    };

    const start = Date.now(); // Upto 283 iterations
    axios.post('https://api.jdoodle.com/v1/execute', data)
      .then(response => {
        const end = Date.now();
        const result = response.data;
        const displayOutput = result.error || result.output || result.compilationStatus || '';

        setOutput(displayOutput);
        setExecutionTime(result.cpuTime || ((end - start) / 1000));
      })
      .catch(error => {
        setOutput(`Error: ${error.response?.data?.error || error.message}`);
      });
  };

  return (
    <div className='compiler'>
      {/* <h1>Coding Playground</h1> */}
      <CustomDropdown codelang={codelang} setCodelang={setCodelang} setCode={setCode}/>
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
        <p>Execution Time: {executionTime}s</p>
      </div>
    </div>
  );
}

export default Playground;
