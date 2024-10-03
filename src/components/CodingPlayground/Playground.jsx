import React, { useState } from 'react';
import CodeEditor from './Editor'; // Correctly import your CodeEditor component
import axios from 'axios';
import './EditorStyle.css'; // Import CSS for consistent styling
import CustomDropdown from './DropDown';

function Playground() {
  const [code, setCode] = useState('# Your code starts here.. ');
  const [input, setInput] = useState('');  // Store the multiline input as a string
  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(0);
  const [compiletime , setCompiletime] = useState(0);
  const [runtime , setRuntime] = useState(0);
 
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
    compile_timeout: 0,
    run_timeout: 0,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  };
  // console.log(data)
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
    setCompiletime(30000);
    setRuntime(5000);
    data.files[0].content = code;
    data.language = codelang;
    data.version = versions[codelang];
    data.stdin = input;
    data.compile_timeout = compiletime;
    data.run_timeout = runtime;
    // console.log(data)

    const start = Date.now();
    axios.post('https://emkc.org/api/v2/piston/execute', data , {timeout: 3*(runtime + compiletime)})
      .then(response => {
        const end = Date.now();
        setOutput(response.data.run.output || 'TimeLimit Exceed');
        setExecutionTime((end - start));
      })
      .catch(error => {
        setOutput(`Error: ${error.message}`);
      });
  };

  return (
    <div className='compiler'>
      {/* <h1>Coding Playground</h1> */}
      <CustomDropdown codelang={codelang} setCodelang={setCodelang} />
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