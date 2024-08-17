import React, { useState, useEffect } from "react";
import ProblemDetail from "./ProblemDetail";
import UploadProblem from "./UploadProblem";
import "./ArenaStyle.css";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

var myIdObj = {
  id: "awdsfhj0"
};

function Arena() {
  const columns = [
    { name: 'S.No', selector: row => row.key, sortable: true, width: "80px" },
    { name: 'Question Name', selector: row => row.title, sortable: true, width: "400px" },
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
  const [view, setView] = useState("list");
  const [GetData, setGetData] = useState(undefined);

  const APICalling = () => {
    axios
      .get("http://localhost:8000/get_codesheet")
      .then((res) => {
        res.data.forEach((ele, key) => {
          ele.key = key + 1;
          ele.URL = (
            <div 
              className="Success" 
              onClick={() => changeId(ele._id)} 
              onMouseEnter={(e) => { e.target.style.cursor = 'pointer'; }}
            >
              Solve
            </div>
          );
        });
        setGetData(res.data);
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
      <DataTable columns={columns} data={GetData} />
    </div>
  );
}

export default Arena;
