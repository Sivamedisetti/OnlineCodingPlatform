import React, { useState, useEffect } from "react";
import "./ArenaStyle.css";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
// import io from "socket.io-client";

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

// const socket= io("http://192.168.25.95:8000")

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
      .get("https://onlinecodingplatform.onrender.com/get_codesheet")
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
    // socket.on("newPost" , (newPost) => {
      // console.log(newPost)
      // setGetData((prevData) => [...prevData, newPost]);
    // })
    // return {APICalling}
  },[]);

  return (
    <div className="arena-container">
      <h1>Coding Arena</h1>
      <DataTable columns={columns} data={GetData} />
    </div>
  );
}

export default Arena;
