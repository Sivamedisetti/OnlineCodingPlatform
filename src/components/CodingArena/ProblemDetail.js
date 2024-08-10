import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./ProblemDetail.css";
import Editor from "../CodingPlayground/Editor";
import "../CodingPlayground/EditorStyle.css";
import axios from "axios";

// import './ArenaStyle.css';

// import myIdObj from './Arena';
// console.log();
const root = ReactDOM.createRoot(document.getElementById("root"));

var myObj = sessionStorage.getItem("id");

export default function ProblemDetail(props) {
  const [code, setCode] = useState("# Write your code here sta ");
  const [input, setInput] = useState(""); // Store the multiline input as a string
  const [output, setOutput] = useState("");
  const [executionTime, setExecutionTime] = useState(0);
  const [data, setData] = useState({
    language: "python",
    version: "3.10.0",
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
  });

  const executeCode = () => {
    data.files[0].content = code;
    // Join the input lines into a single string with spaces, or handle as required by your execution environment
    data.stdin = input; // Or input.split("\n").join(" ") if space-separated values are required

    axios
      .post("https://emkc.org/api/v2/piston/execute", data)
      .then((response) => {
        console.log(response);
        setOutput(response.data.run.output);
        setExecutionTime(response.data.run.time);
      })
      .catch((error) => {
        setOutput(`Error: ${error.message}`);
      });
  };
  return (
    <>
      <div className="problem-detail">
        <div className="problem-detail-left"></div>
        <div className="problem-detail-right">
          <div className="problem-detail-right-top">
            <Editor code={code} setCode={setCode} />
          </div>
          <div className="problem-detail-right-bottom">
            <div className="input-container">
              <h2>Custom Input</h2>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter your input here, one per line"
              />
            </div>
            <button className="execute-btn" onClick={executeCode}>
              Execute
            </button>
            <div className="output-container">
              <h2>Output</h2>
              <pre>{output}</pre>
              <p>Execution Time: {executionTime}ms</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
