import axios from "axios";
import React, { useEffect, useState }  from "react"
import { BASE_URL, GET_CATEGORIES_URL} from "./utils";
import { useHistory } from 'react-router'
import Pagination from "./Pagination";
import { Link } from 'react-router-dom';

const AllCategory= ({getCategory, TOKEN}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10)
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const [tableData, setTableData] = useState([]);
    const history = useHistory();
    const currentData = tableData.slice(indexOfFirstData, indexOfLastData)
   
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        axios.get(GET_CATEGORIES_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
    
        }).then(res => {
            console.log(res.data.filtered)
            setTableData(res.data.filtered) 
        } 
        ).catch(error => console.log(error))
        return () => {}
       
    },[history, TOKEN])

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}/category/${id}/`, 
            {headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`
            }}
            ).then(res => {
                const filtered_data = tableData.filter((item) => item.id !== id);
                alert('item deleted successfully')
                setTableData(filtered_data)
            }).catch(error => console.log(error))
    }
 
    return (
        <div >
            <div className= "container">  
                <div className = "p-1">
                    <div className= "container p-3">
                        <h5 className = "text-center">All Categories</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-fixed" >
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            {currentData ?
                        currentData.map(item => {
                            return(
                                <tbody>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td onClick = {()=> getCategory(item.id)}><Link to = 'update-category/'><i className="fas fa-edit" style = {{color:  "rgb(198, 213, 126)"}}></i></Link></td>
                                        <td onClick = {()=> handleDelete(item.id)}><i className="fas fa-trash" style = {{color: "rgb(213, 126, 126)"}}></i></td>
                                    </tr> 
                                </tbody>)
                            }): ''
                            }
                        </table>
                        <Pagination totalData={tableData.length} dataPerPage={dataPerPage} paginate={paginate}/>
                    </div>
                </div>     
            </div>
        </div>  
    )
}

export default AllCategory
