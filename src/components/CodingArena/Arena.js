import React, { useState } from "react";
import ProblemList from "./ProblemList";
import ProblemDetail from "./ProblemDetail";
import UploadProblem from "./UploadProblem";
import "./ArenaStyle.css";
import axios from "axios";
import App from "../../App";
import DataTable from 'react-data-table-component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import ProblemDetail from "./ProblemDetail";

var myIdObj = {
  id: "awdsfhj0"
}


function Arena() {
  const columns = [
    { name: 'S.No', selector: row => row.key, sortable: true, width:"80px" },
    { name: 'Question Name', selector: row => row.Question_Name, sortable: true,width:"400px" },
    { name: 'Difficulty', selector: row => row.Topic_difficulty, sortable: true,width:"150px" },
    { name: 'URL', selector: row => row.URL, sortable: true },
  ];
  
  

  const navigate = useNavigate();
function changeId(val) {
  // Update the id property of the myIdObj object
  myIdObj.id = val;

  // Store the updated object in sessionStorage (serialized to JSON)
  sessionStorage.setItem('obj', JSON.stringify(myIdObj));

  // Use React Router's useNavigate hook for navigation
  navigate('/ProblemDetail');
}

  

  
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [view, setView] = useState("list"); // 'list', 'detail', 'upload';
  const [GetData, setGetData] = useState(undefined);
  const APICalling = () => {
    console.log("working");
    axios
      .get("http://localhost:9000/get_codesheet")
      .then((res) => {
        // console.log(res.data[0]._id);

        // var myvar = JSON.parse(res);
        // console.log("MyOutput: " + myvar);


        res.data.map((ele,key) =>{
          ele.key = key + 1
          // console.log(ele.key + " " + ele._id);
        })
        
         
        res.data.map(ele => {
          // console.log(ele.URL)
          //'./ProblemDetail.js'
          //href={ele.URL}
          ele.URL = <a className="Success" onClick={() => changeId(ele._id)} >Solve</a>
          // console.log(ele._id);
        })
        setGetData(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="arena-container">
      <h1>Coding Arena</h1>
      {view === "list" && <ProblemList onSelectProblem={setSelectedProblem} />}
      {view === "detail" && selectedProblem && (
        <ProblemDetail problem={selectedProblem} />
      )}
      {view === "upload" && <UploadProblem />}
      <div className="view-buttons">
        <button onClick={APICalling}>Problem List</button>
        <button onClick={() => setView("upload")}>Upload Problem</button>
      </div>
      {/* <div className="parent">
        <div className="Question_Name">{GetData.Question_Name}</div>
        <div className="Topic_difficulty">{GetData.Topic_difficulty}</div>
        
      </div> */}
      {/* {GetData ? (
        GetData.map((ele, key) => {
          return (
            <div className="parent" onClick={() => console.log(ele._id)}>
              <div className="Question_Name">{ele.Question_Name}</div>
              <div className="Topic_difficulty">{ele.Topic_difficulty}</div>
              <div className="Topic_difficulty">{ele.Type}</div>
              <a href={ele.URL} target="_blank" className="Topic_difficulty">Click</a>
            </div>
          );
        })
      ) : (
        <></>
      )} */}
       <DataTable columns={columns} data={GetData} />
    </div>
  );
}

export default Arena;