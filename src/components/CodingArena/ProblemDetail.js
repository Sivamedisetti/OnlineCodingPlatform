import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../CodingPlayground/Editor";
import "./ProblemDetail.css";

export default function ProblemDetail(props) {
  const [code, setCode] = useState("#Enter your code here...");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(null);
  const [executionTime, setExecutionTime] = useState(0);
  const [compiletime, setCompiletime] = useState(0);
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    // Retrieve problem ID from local storage
    const obj = sessionStorage.getItem("obj");
    console.log(obj.id);
    const ob = JSON.parse(obj);
    // console.log(ob);

    if (obj) {
      axios
        .get(`http://localhost:8000/get_problemdata/${ob.id}`)
        .then((response) => {
          setProblem(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching problem details:", error);
        });
    } else {
      console.error("Problem ID not found in local storage.");
    }
  }, []);

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

  const [codelang, setCodelang] = useState("python");
  const handleChange = (e) => {
    setCodelang(e.target.value);
  };
  const versions = {
    python: "3.10.0",
    cpp: "10.2.0",
    c: "10.2.0",
    java: "15.0.2",
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
    <>
      <div className="problem-detail">
        <div className="problem-detail-left">
          {problem ? (
            <>
              <h1>{problem.Question_Name}</h1>
              <p>{problem.disc}</p>
              {/* Additional problem details can be displayed here */}
            </>
          ) : (
            <p>Loading problem details...</p>
          )}
        </div>

        <div className="problem-detail-right">
          <div className="problem-detail-right-top">
            <select onChange={handleChange} value={codelang}>
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <Editor code={code} setCode={setCode} codelang={codelang} />
          </div>

          <button className="execute-btn" onClick={executeCode}>
            Execute
          </button>

          <div className="problem-detail-right-bottom">
            <div className="input-container">
              <h2>Custom Input</h2>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter your input here, one per line"
              />
            </div>

            <div className="output-container">
              <h2>Output</h2>
              <pre>{output}</pre>

              {executionTime !== undefined && (
                <p>Execution Time: {executionTime}ms</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
