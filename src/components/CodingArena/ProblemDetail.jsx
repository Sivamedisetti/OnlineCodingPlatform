import React, { useState, useEffect } from "react";
import api from "../../config/api";
import CodeEditor from "../CodingPlayground/Editor";
import "./ProblemDetail.css";
import CustomDropdown from "../CodingPlayground/DropDown";
import { FaGear } from "react-icons/fa6";

export default function ProblemDetail() {
  const [code, setCode] = useState(`# write python code here...
print('Hello World!')`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [problem, setProblem] = useState(null);
  const [executionTime, setExecutionTime] = useState(0);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const obj = sessionStorage.getItem("obj");
    const ob = JSON.parse(obj);
    if (obj) {
      api
        .get(`/get_problemdata/${ob.id}`)
        .then((response) => {
          setProblem(response.data);
        })
        .catch((error) => {
          console.error("Error fetching problem details:", error);
        });
    }
  }, []);

  const [codelang, setCodelang] = useState("python");
  const jdoodleLanguages = {
    python: "python3",
    cpp: "cpp17",
    c: "c",
    java: "java",
  };

  const getExecutionOutput = (result) => {
    return (
      result.output ??
      result.error ??
      result.compilationStatus ??
      JSON.stringify(result, null, 2)
    );
  };

  const executeCode = async () => {
    const data = {
      script: code,
      language: jdoodleLanguages[codelang],
      versionIndex: "0",
      stdin: input,
    };

    const start = Date.now();
    setOutput("Running...");
    setExecutionTime(0);

    try {
      const response = await api.post("/execute_code", data, {
        withCredentials: true,
      });
      const end = Date.now();
      const result = response.data;
      console.log("Execution response:", result);

      setOutput(String(getExecutionOutput(result)));
      setExecutionTime(result.cpuTime || (end - start) / 1000);
    } catch (error) {
      console.error("Execution error:", error.response?.data || error.message);
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const runAllTestCases = async () => {
    if (!problem?.test_cases) return;
    const results = [];

    for (let i = 0; i < problem.test_cases.length; i++) {
      const test = problem.test_cases[i];
      const testData = {
        script: code,
        language: jdoodleLanguages[codelang],
        versionIndex: "0",
        stdin: test.input,
      };

      const start = Date.now();
      try {
        const res = await api.post("/execute_code", testData, {
          withCredentials: true,
        });
        const end = Date.now();
        const actualOutput = String(getExecutionOutput(res.data)).trim();
        const expectedOutput = String(test.output).trim();
        results.push({
          passed: actualOutput === expectedOutput,
          time: (end - start) / 1000,
        });
      } catch (err) {
        results.push({
          actual: err,
          passed: false,
          time: 0,
        });
      }
    }

    setTestResults(results);
  };

  return (
    <div className="problem-detail">
      <div className="problem-detail-left">
        {problem ? (
          <>
            <h1>{problem.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            <h3>Example:</h3>
            <p>
              <h4>Input</h4>
              {problem.sample_input}
            </p>
            <br />
            <p>
              <h4>Output</h4>
              {problem.sample_output}
            </p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: problem.explaination }} />
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
              <CustomDropdown
                codelang={codelang}
                setCodelang={setCodelang}
                setCode={setCode}
              />
            </div>
            <div className="settings-icon">
              <FaGear className="gear-icon" />
            </div>
          </div>
          <CodeEditor code={code} setCode={setCode} codelang={codelang} />
        </div>

        <div className="btn-group">
          <button className="execute-btn" onClick={executeCode}>
            Execute
          </button>
          <button className="execute-btn" onClick={runAllTestCases}>
            Run All Test Cases
          </button>
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

          <div className="output-container">
            <h2>Output</h2>
            <pre>{output}</pre>
            {executionTime !== undefined && (
              <p>Execution Time: {executionTime}s</p>
            )}
          </div>

          {testResults.length > 0 && (
            <div className="testcase-results">
              <h2>Test Case Results</h2>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`testcase-box ${result.passed ? "pass" : "fail"}`}
                >
                  <p>
                    <strong>Test Case {index + 1}</strong>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {result.passed ? "✅ Passed" : "❌ Failed"}
                  </p>
                  <p>
                    <strong>Time:</strong> {result.time}s
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
