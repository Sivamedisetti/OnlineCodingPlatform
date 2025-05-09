import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import './User.css'
import deleted from '../../../assets/delete.png';

const User = () => {
    const backendAPI = 'https://onlinecodingplatform.onrender.com';
  // const backendAPI = 'http://localhost:8000';
    const [GetData, setGetData] = useState(undefined);
    const [editId , setEditId] = useState(null);

    let columns = [
        { name: 'S.No', selector: row => row.key, sortable: false, width: "200px" },
        { name: 'User', selector: row => row.username, sortable: false, width: "200px" },
        { name: 'Email', selector: row => row.email, sortable: false, width: "350px" },
        {
          name: 'Role',
          cell: row => (
            editId === row.userid ? (
              <select
                value={row.access}
                onChange={(e) => handleRoleChange(row.userid, e.target.value)}
                style={{ width: "100px", height: "30px" }}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => setEditId(row.userid)}>🖊️</span>
                <p style={{ margin: 0 }}>{row.access}</p>
              </div>
            )
          ),
          width: "200px"
        },
        { name: 'Delete', 
          selector: row => row.Delete, 
          cell: row => 
            <div>
              <img onClick={() => deleteuser(row._id)} src={deleted} alt="delete" style={{marginLeft: '10px' ,height: "17px", width: "17px", cursor: 'pointer'}}/>
            </div>
        }
    ];

    function deleteuser(id){
      axios.delete(`${backendAPI}/delete_user/${id}`,)
        .then(() => {
          APICalling();
          toast.success("Deleted Successfully")
        })
        .catch(err => {
          console.error("Delete failed", err);
          toast.error("Failed to delete problem");
        });
    }

    function handleRoleChange(userid , role){
      axios.put(`${backendAPI}/update_access`, { userid, role })
      .then(res => {
        toast.success("Role updated");
        APICalling();
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to update role");
      });
      setEditId(null)
    }

    const APICalling = () => {
        axios
          .get(`${backendAPI}/getUsers`)
          .then((res) => {
            res.data.forEach((ele, key) => {
              ele.key = key + 1;
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
        <div className="user-container">
            <h1>Users</h1>
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

export default User
