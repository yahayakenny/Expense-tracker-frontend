import axios from "axios";
import React, { useEffect, useState }  from "react"
import { ALL_EXPENSES_URL, commas, TOKEN } from "./utils";
import { useHistory } from 'react-router'
import Pagination from "./Pagination";
import { Link } from 'react-router-dom';

const AllExpenses = ({getExpense}) => {
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
        axios.get(ALL_EXPENSES_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
    
        }).then(res => setTableData(res.data)  
        ).catch(error => console.log(error))
        history.push('/all-expenses')
        return () => {}
       
    },[history])

    const handleDelete = (id) => {
        axios.delete(`https://expense-tracker-yhk.herokuapp.com/api/expense/${id}/`, 
            {headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`
            }}
            ).then(res => {
                const filtered_data = tableData.filter((item) => item.id !== id);
                alert('item deleted successfully')
                setTableData(filtered_data)
            })
            .catch((error) => console.log(error)
            )
    }
 
    return (
        <div >
            <div className= "container">  
                <div className = "p-1">
                    <div className= "container p-3">
                        <h5 className = "text-center">All Expenses</h5>
                    </div>
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Amount</th>
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
                                    <td>{item.category.name}</td>
                                    <td>£{item ? commas(item.amount) : item.amount}</td>
                                    <td onClick = {()=> getExpense(item.id)}><Link to = 'update-expense/'><i class="fas fa-edit" style = {{color:  "rgb(198, 213, 126)"}}></i></Link></td>
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

export default AllExpenses
