import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './request.css'

const Request = () => {
    const backendAPI = 'https://onlinecodingplatform.onrender.com';
//   const backendAPI = 'http://localhost:8000';
    const [GetData, setGetData] = useState(undefined);
    const navigate = useNavigate();
    var myIdObj = {
        id: "awdsfhj0"
    };

    let columns = [
        { name: 'S.No', selector: row => row.key, sortable: false, width: "150px" },
        { name: 'User', selector: row => row.username, sortable: false, width: "180px" },
        { name: 'Title', selector: row => row.title, sortable: false, width: "300px" },
        { name: 'Difficulty', selector: row => row.Topic_difficulty, sortable: true , width: "200px"},
        { name: 'Status', 
            selector: row => row.status, 
            cell: row => 
                <div style={{ display: 'flex' }}>
                    <p style={{ cursor: 'pointer', color: "var(--color-primary-green)", fontWeight: 400 }} onClick={() => change_Status('Accepted' , row._id)}>Accept</p>
                    <span>/</span>
                    <p style={{ cursor: 'pointer', color: 'red', fontWeight: 400 }} onClick={() => change_Status('Rejected' , row._id)}>Reject</p>
                </div>,
            width: "300px"
        }
    ];

    function change_Status(status , id){
        axios.put(`${backendAPI}/update_status`, {status , id})
            .then(() => {
                APICalling();
                if(status === "Accepted") toast.success("Question Accepted")
                else toast.error("Question Rejected");
            })
    }
    function changeId(val) {
        myIdObj.id = val;
        sessionStorage.setItem('obj', JSON.stringify(myIdObj));
        navigate('/ProblemDetail');
    }
    const APICalling = () => {
        axios
          .get(`${backendAPI}/getPendingList`)
          .then((res) => {
            res.data.forEach((ele, key) => {
              ele.key = key + 1;
              ele.title = (
                <p style={{cursor: 'pointer'}} onClick={() => changeId(ele._id)}>
                    {ele['title']}
                </p>
              );
              ele.Topic_difficulty = (
                <p
                  style={{
                    backgroundColor: 
                      ele['Topic_difficulty'] === 'Easy' ? 'var(--color-primary-green)' :
                      ele['Topic_difficulty'] === 'Medium' ? 'orange' :
                      'red',
                    color: 'white', 
                    padding: '5px 10px',
                    borderRadius: '10px',
                  }}
                >
                  {ele['Topic_difficulty']}
                </p>
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
        <div className="request-container">
            <h1>Requests</h1>
            <DataTable columns={columns} data={GetData} 
            />

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
    )
}

export default Request;