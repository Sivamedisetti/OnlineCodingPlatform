import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UploadProblem.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function UploadProblem({ setIsAuthenticated }) {
  const backendAPI = 'https://onlinecodingplatform.onrender.com';
  // const backendAPI = 'http://localhost:8000';
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sample_input, setSample_input] = useState("");
  const [sample_output, setSample_output] = useState("");
  const [explaination, setExplaination] = useState("");
  const [Topic_difficulty, setTopic_difficulty] = useState("Easy");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const navigate = useNavigate();

  const ProblemDetails = {
    title,
    description,
    constraints,
    test_cases: testCases,
    sample_input,
    sample_output,
    Topic_difficulty,
    explaination
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    setIsAuthenticated(false);
    navigate('/login');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${backendAPI}/post_problem`, ProblemDetails, {
        withCredentials: true
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Problem uploaded successfully!", {
            position: "top-center",
          });
        }

        setTitle("");
        setDescription("");
        setConstraints("");
        setTestCases([{ input: "", output: "" }])
        setSample_input("");
        setSample_output("");
        setTopic_difficulty("Easy");
        setExplaination("");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          toast.error("This problem already exists!");
        } else if (error.response?.status === 401) {
          logout();
        } else if (error.response?.status === 500) {
          toast.error("Please fill the required details.");
        } else {
          toast.error("Server not reachable!");
          console.error("Error:", error.message);
        }
      });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };



  return (
    <div className="upload-problem">
      <h2>Upload New Problem</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Topic Difficulty:
          <select className="difficulty" value={Topic_difficulty} onChange={(e) => setTopic_difficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <div className="full-row">
          <label>
            Description:
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={quillModules}
              style={{ backgroundColor: "var(--color-background-light)", marginBottom: "1rem" }}
            />
          </label>
        </div>
        <label>
          Constraints:
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            required
            placeholder="E.g., Time limit in ms"
          />
        </label>
        <label>
          Sample Input:
          <textarea
            value={sample_input}
            onChange={(e) => setSample_input(e.target.value)}
            required
          />
        </label>
        <label>
          Sample Output:
          <textarea
            value={sample_output}
            onChange={(e) => setSample_output(e.target.value)}
            required
          />
        </label>
        <div className="full-row">
          <label>
            Explaination:
            <ReactQuill
              theme="snow"
              value={explaination}
              onChange={setExplaination}
              modules={quillModules}
              style={{ backgroundColor: "var(--color-background-light)", marginBottom: "1rem" }}
            />
          </label>
        </div>
        <div className="full-row">
          <label>Test Cases:</label>
          {testCases.map((tc, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Input"
                value={tc.input}
                onChange={(e) => {
                  const newTestCases = [...testCases];
                  newTestCases[index].input = e.target.value;
                  setTestCases(newTestCases);
                }}
                style={{ marginRight: "10px", width: "45%" }}
              />
              <input
                type="text"
                placeholder="Output"
                value={tc.output}
                onChange={(e) => {
                  const newTestCases = [...testCases];
                  newTestCases[index].output = e.target.value;
                  setTestCases(newTestCases);
                }}
                style={{ width: "45%" }}
              />
              <button
                className="delete-button"
                type="button"
                onClick={() => {
                  if(testCases.length >= 2){
                    const updated = testCases.filter((_, i) => i !== index);
                    setTestCases(updated);
                  }
                }}
                
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            className="Add-button"
            onClick={() => setTestCases([...testCases, { input: "", output: "" }])}
          >
            ➕ Add Test Case
          </button>
        </div>

        <button className="btn" onClick={handleSubmit}>Upload Problem</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default UploadProblem;
