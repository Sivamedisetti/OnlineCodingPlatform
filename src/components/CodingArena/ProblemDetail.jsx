import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeEditor from "../CodingPlayground/Editor";
import "./ProblemDetail.css";
import CustomDropdown from "../CodingPlayground/DropDown";
import { FaGear } from "react-icons/fa6";

export default function ProblemDetail(props) {
  const backendAPI = 'https://onlinecodingplatform.onrender.com';
  // const backendAPI = 'http://localhost:8000';

  const [code, setCode] = useState(`# write python code here...
print('Hello World!')`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(null);
  const [executionTime, setExecutionTime] = useState(0);
  

  useEffect(() => {
    // Retrieve problem ID from local storage
    const obj = sessionStorage.getItem("obj");
    console.log(obj.id);
    const ob = JSON.parse(obj);
    // console.log(ob);

    if (obj) {
      axios
        .get(`${backendAPI}/get_problemdata/${ob.id}`)
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
    compile_timeout: 600000,
    run_timeout: 600000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  };
 
  const [codelang, setCodelang] = useState("python");
  const versions = {
    python: "3.10.0",
    cpp: "10.2.0",
    c: "10.2.0",
    java: "15.0.2",
  };

  const executeCode = () => {
    data.files[0].content = code;
    data.language = codelang;
    data.version = versions[codelang];
    data.stdin = input;

    const start = Date.now();
    axios.post('https://emkc.org/api/v2/piston/execute', data , /*{timeout: 5*problem.constraints}*/)
      .then(response => {
        const end = Date.now();
        setOutput(response.data.run.output || 'TimeLimit Exceed');
        setExecutionTime((end - start)/1000);
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
              <h1>{problem.title}</h1>
              <p>{problem.description}</p> <br/> <h4>Example</h4>
              <p>{problem.sample_input}</p> <br/>
              <p>{problem.sample_output}</p> <br/>
              <h5>Execution Time : {problem.constraints / 1000}s</h5>
            </>
            ) : (
            <p>Loading problem details...</p>
          )}
        </div>

        <div className="problem-detail-right">
          <div className="problem-detail-right-top">
              <div className="compiler-top-header">
                <div className="dropDown">
                  <CustomDropdown codelang={codelang} setCodelang={setCodelang} setCode={setCode}/>
                </div>
                <div className="settings-icon">
                  <FaGear  className="gear-icon"/> 
                </div>
              </div>
                <CodeEditor code={code} setCode={setCode} codelang={codelang}/>
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
                <p>Execution Time: {executionTime}s</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}