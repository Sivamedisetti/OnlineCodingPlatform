import React, { useState, useEffect } from "react";
import "./ArenaStyle.css";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { json, useNavigate } from 'react-router-dom';
import { waveform } from 'ldrs'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

waveform.register();

var myIdObj = {
  id: "awdsfhj0"
};

function Arena() {
  const backendAPI = 'https://onlinecodingplatform.onrender.com';
  // const backendAPI = 'http://localhost:8000';
  const access = localStorage.getItem('access');

  let columns = [
    { name: 'S.No', selector: row => row.key, sortable: false, width: "100px" },
    { name: 'Question Name', selector: row => row.title, sortable: false, width: "400px" },
    { name: 'Difficulty', selector: row => row.Topic_difficulty, sortable: true, width: "200px" },
    { name: 'Slove', selector: row => row.URL, sortable: false , width: "200px"},
  ];

  if (access === '"admin"') {
    columns.push({
      name: 'Delete',
      selector: row => row.Delete,
      cell: row => <div onClick={() => RemoveProblem(row._id)} style={{ cursor: 'pointer' }}>❌</div>,
      width: "100px"
    });
  }

  const navigate = useNavigate();

  const RemoveProblem = (val) => {
    if (window.confirm("Are you sure you want to delete this problem?")){
      axios
        .delete(`${backendAPI}/delete_problem/${val}`)
        .then(() => {
          APICalling();
          toast.success("Deleted Successfully")
        })
        .catch(err => {
          console.error("Delete failed", err);
          toast.error("Failed to delete problem");
        });
    }
  }

  function changeId(val) {
    myIdObj.id = val;
    sessionStorage.setItem('obj', JSON.stringify(myIdObj));
    navigate('/ProblemDetail');
  }

  const [GetData, setGetData] = useState(undefined);

  const APICalling = () => {
    axios
      .get(`${backendAPI}/getcodesheet`)
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
      {
        GetData === undefined ? 
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <l-waveform size="35" stroke="3.5" speed="1" color="#0187fc" />
          </div> : GetData.length === 0 ? 
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>No Problems available</p> :
            <DataTable columns={columns} data={GetData} />
      }

      <ToastContainer
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

export default Arena;


