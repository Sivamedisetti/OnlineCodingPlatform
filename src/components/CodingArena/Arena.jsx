import React, { useState, useEffect } from "react";
import "./ArenaStyle.css";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { waveform } from 'ldrs'

waveform.register();

var myIdObj = {
  id: "awdsfhj0"
};

function Arena() {
  const columns = [
    { name: 'S.No', selector: row => row.key, sortable: false, width: "80px" },
    { name: 'Question Name', selector: row => row.title, sortable: false, width: "400px" },
    { name: 'Difficulty', selector: row => row.Topic_difficulty, sortable: true, width: "150px" },
    { name: 'Slove', selector: row => row.URL, sortable: false },
  ];

  const navigate = useNavigate();

  function changeId(val) {
    myIdObj.id = val;
    sessionStorage.setItem('obj', JSON.stringify(myIdObj));
    navigate('/ProblemDetail');
  }

  // const [selectedProblem, setSelectedProblem] = useState(null);
  // const [view, setView] = useState("list");
  const [GetData, setGetData] = useState(undefined);

  const APICalling = () => {
    axios
      .get("https://onlinecodingplatform.onrender.com/getcodesheet")
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
  },[]);

  return (
    <div className="arena-container">
      <h1>Coding Arena</h1>
      <DataTable columns={columns} data={GetData} noDataComponent={
          <l-waveform
            size="35"
            stroke="3.5"
            speed="1" 
            color="#0187fc" 
          />
        }
      />
    </div>
  );
}

export default Arena;


