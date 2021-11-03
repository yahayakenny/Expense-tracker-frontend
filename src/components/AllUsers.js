import axios from "axios";
import React, { useEffect }  from "react"
import { useState } from "react/cjs/react.development";
import {  ALL_USERS_URL, TOKEN } from "./utils";
import { useHistory } from 'react-router'
import Pagination from "./Pagination";
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(2)
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const currentData = tableData.slice(indexOfFirstData, indexOfLastData)
   
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        setIsLoading(true)
        axios.get(ALL_USERS_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
    
        }).then(res => setTableData(res.data)  
        ).catch(error => console.log(error))
        setIsLoading(false);
        return () => {}
       
    },[])

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/users/list/${id}/`, 
            {headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`
            }}
            ).then(res => {
                const filtered_data = tableData.filter((item) => item.id !== id);
                alert('item deleted successfully')
                setTableData(filtered_data)
            })
            .catch((error) => setError(error)
            )
            .finally(() => {
                setIsLoading(false)
        }) 
    }
 
    return (
        <div >
            <div className= "container">  
                <div className = "p-1">
                    <div className= "container p-3">
                        <h5 className = "text-center">USERS</h5>
                    </div>
                    <table class="table table-striped table-hover" >
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Admin</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        {currentData ?
                       currentData.map(item => {
                        return(
                            <tbody>
                                <tr>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.isAdmin ? 'YES' : 'NO'}</td>
                                    <td onClick = {()=> handleDelete(item.id)}><i className="fas fa-trash" style = {{color: "rgb(213, 126, 126)"}}></i></td>
                                </tr> 
                            </tbody>)
                        }): ''
                        }
                        <Pagination totalData={tableData.length} dataPerPage={dataPerPage} paginate={paginate}/>
                    </table>
                </div>     
            </div>
        </div>  
    )
}

export default AllUsers
