import { RECENT_EXPENSES_URL, } from "./utils";
import { useEffect, useState } from "react"
import axios from 'axios';
import styled from "styled-components";
import '../Styles/App.css';
import { commas } from "../Helpers/Helpers";

const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor}
    `;

const Table = ({ settings}) => {
    const [tableData, setTableData] = useState([]);
    let getUser = JSON.parse(localStorage.getItem('userInfo'))
   
    useEffect(() => {
        axios.get(RECENT_EXPENSES_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${getUser.token}`}
    
        }).then(res => setTableData(res.data.filtered)  
        ).catch(error => console.log(error))
        return () => {setTableData({})}
    },[getUser.token])

    return (
        <StyledApp>
            <div >
            <div className= "container">  
                <div className = "p-3">
                    <div className= "container p-3">
                        <h5 className = "text-center">Most Recent Expenses</h5>
                    </div>
                        <table  >
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            { tableData ?
                            tableData.map((item)=> {
                            return(
                                <tbody>
                                    <tr>
                                        <td key = {item.index}>{item.name}</td>
                                        <td key = {item.index}>{item.category.name}</td>
                                        <td key = {item.index}>  {settings.currency  ? settings.currency: '£'}{item ? commas(item.amount) : item.amount}</td>
                                    </tr> 
                                </tbody>)
                            }): ''
                            }
                        </table>
                        <br></br>
                </div>     
            </div>
        </div>  
        </StyledApp>
        
    )
}

export default Table
