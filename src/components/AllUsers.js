import axios from "axios";
import React, { useEffect, useState }  from "react"
import { ALL_USERS_URL, BASE_URL } from "./utils";
import Pagination from "./Pagination";
import styled from "styled-components";

const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor}
    `;

const AllUsers = ({TOKEN}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10)
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const [tableData, setTableData] = useState([]);
    const currentData = tableData.slice(indexOfFirstData, indexOfLastData);
    let getUser = JSON.parse(localStorage.getItem('userInfo'))
   
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        axios.get(ALL_USERS_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${getUser.token}`}
    
        }).then(res => setTableData(res.data))
        return () => {}
       
    },[getUser.token])

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}/users/list/${id}/`, 
            {headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`
            }}
            ).then(res => {
                const filtered_data = tableData.filter((item) => item.id !== id);
                alert('item deleted successfully')
                setTableData(filtered_data)
        })
    }
 
    return (
        <StyledApp>
            <div className= "container">  
                <div className = "p-1">
                    <div className= "container p-3">
                        <h5 className = "text-center">USERS</h5>
                    </div>
                    <div className="table-responsive">
                        <table>
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
                        </table>
                        <br></br>
                        <Pagination totalData={tableData.length} dataPerPage={dataPerPage} paginate={paginate}/>
                    </div>
                </div>     
            </div>
        </StyledApp>  
    )
}

export default AllUsers
