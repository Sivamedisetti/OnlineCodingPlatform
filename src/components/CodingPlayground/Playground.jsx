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
 
  const data = {
    language: "",
    version: "",
    files: [
      {
        name: "my_cool_code.js",
        content: code,
      },
    ],
    stdin: "",
    args: ["1", "2", "3"],
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  };
  // console.log(data)
  const [codelang , setCodelang] = useState('python');

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
    data.stdin = input;

    const start = Date.now(); // Upto 283 iterations
    axios.post('https://emkc.org/api/v2/piston/execute', data , /*{timeout: 3*(runtime + compiletime)}*/)
      .then(response => {
        const end = Date.now();
        setOutput(response.data.run.output);
        setExecutionTime((end - start)/1000);
      })
      .catch(error => {
        setOutput(`Error: ${error.message}`);
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