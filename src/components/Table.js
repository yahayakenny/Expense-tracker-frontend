import { commas, RECENT_EXPENSES_URL, } from "./utils";
import { useEffect, useState } from "react"
import axios from 'axios';

const Table = ({TOKEN}) => {
    const [tableData, setTableData] = useState([]);
 
    useEffect(() => {
        axios.get(RECENT_EXPENSES_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
    
        }).then(res => setTableData(res.data)  
        ).catch(error => console.log(error))
        return () => {}
    },[TOKEN])

    return (
        <div >
            <div className= "container">  
                <div className = "p-3">
                    <div className= "container p-3">
                        <h5 className = "text-center">Most Recent Expenses</h5>
                    </div>
                    <div className = "table-responsive">
                        <table className="table table-hover" >
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            { tableData ?
                            tableData.map(item => {
                            return(
                                <tbody>
                                    <tr>
                                        <td key = {item.index}>{item.name}</td>
                                        <td key = {item.index}>{item.category.name}</td>
                                        <td key = {item.index}>  £{item ? commas(item.amount) : item.amount}</td>
                                    </tr> 
                                </tbody>)
                            }): ''
                            }
                        </table>
                    </div>
                </div>     
            </div>
        </div>  
    )
}

export default Table