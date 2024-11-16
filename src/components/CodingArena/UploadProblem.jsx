import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UploadProblem.css";

function UploadProblem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [test_cases, setTest_cases] = useState("");
  const [URL, setURL] = useState("");
  const [sample_input, setSample_input] = useState("");
  const [sample_output, setSample_output] = useState("");
  const [Topic_difficulty, setTopic_difficulty] = useState("Easy");

  const ProblemDetails = {
    title,
    description,
    constraints,
    test_cases,
    URL,
    sample_input,
    sample_output,
    Topic_difficulty,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://onlinecodingplatform.onrender.com/post_problem", ProblemDetails)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Problem uploaded successfully!", {
            position: "top-center",
          });
        }
        
        setTitle("");
        setDescription("");
        setConstraints("");
        setTest_cases("");
        setURL("");
        setSample_input("");
        setSample_output("");
        setTopic_difficulty("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // 
          toast.error("This problem already exists!", {
            // position: "top-center",
          });
        }
        else if(error.response.status === 500) {
          console.log(error);
          toast.error("Please Fill the required details.");
        }
      });
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
          <select className="difficulty" id="" value={Topic_difficulty} onChange={(e)=>setTopic_difficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
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
        <label>
          Test Cases:
          <textarea
            value={test_cases}
            onChange={(e) => setTest_cases(e.target.value)}
            placeholder='e.g., input: "output"'
          />
        </label>
        <button className="btn" onClick={handleSubmit}>Upload Problem</button>
      </form>
      <ToastContainer
        icon="../public/images/icon.jpg"
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

export default UploadProblem;
