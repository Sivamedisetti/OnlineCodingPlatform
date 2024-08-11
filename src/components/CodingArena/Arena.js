import React, { useState }  from "react";
import { useEffect } from "react";
import ProblemList from "./ProblemList";
import ProblemDetail from "./ProblemDetail";
import UploadProblem from "./UploadProblem";
import "./ArenaStyle.css";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





var myIdObj = {
  id: "awdsfhj0"
}


function Arena() {
  const columns = [
    { name: 'S.No', selector: row => row.key, sortable: true, width: "80px" },
    { name: 'Question Name', selector: row => row.Question_Name, sortable: true, width: "400px" },
    { name: 'Difficulty', selector: row => row.Topic_difficulty, sortable: true, width: "150px" },
    { name: 'URL', selector: row => row.URL, sortable: true },
  ];



  const navigate = useNavigate();
  function changeId(val) {
    
    myIdObj.id = val;
    
   
    sessionStorage.setItem('obj', JSON.stringify(myIdObj));
    
   
    navigate('/ProblemDetail');
  }


  
  
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [view, setView] = useState("list"); // 'list', 'detail', 'upload';
  const [GetData, setGetData] = useState(undefined);
  const APICalling = () => {
    console.log("working");
    axios
      .get("http://localhost:8000/get_codesheet")
      .then((res) => {
        // console.log(res.data[0]._id);

        // var myvar = JSON.parse(res);
        // console.log("MyOutput: " + myvar);

        
        res.data.map((ele, key) => {
          ele.key = key + 1
          
        })


        res.data.map(ele => {
          // console.log(ele.URL)
          //'./ProblemDetail.js'
          //href={ele.URL}
          // ele.URL = <a className="Success" onClick={() => changeId(ele._id)} >Solve</a>
          // console.log(ele._id);
          ele.URL = <a className="Success" onClick={() => changeId(ele._id)} onMouseEnter={(e) => { e.target.style.cursor = 'pointer'; }} >Solve</a>
        })
        setGetData(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    

    useEffect(() => {
      APICalling();
  }, []);

  
  return (
    <div className="arena-container">
      <h1>Coding Arena</h1>
      {view === "list" && <ProblemList onSelectProblem={setSelectedProblem} />}
      {view === "upload" && <UploadProblem />}

      <DataTable columns={columns} data={GetData} />
    </div>
  );
}

export default Arena;