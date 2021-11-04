import axios from 'axios';
import React, { useEffect, useState  } from 'react'
import { NET_URL, TOKEN } from './utils';

const Side = () => {
    const [cardData, setCardData] = useState('');

    useEffect(() => {
        axios.get(NET_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
        }).then(
            res => 
            setCardData(res.data) 
        ).catch(error => console.log(error))
        return () => {}
    },[])

    return (
        <div className="container">
            <div className="card mb-3 shadow-lg text-center rounded" style={{ height: "214px", color: "white"}}>
                 <h5  style = {{ backgroundColor: "rgb(198, 213, 126)"}} className="card-header">Categories</h5>
                <div style = {{fontSize: '70px', backgroundColor: "rgb(198, 213, 126)"}}className="card-body">{cardData.categoryCount}</div>
            </div> 
            <div className="card mb-3 shadow-lg text-center rounded" style={{ height: "214px" , color: "white"}}>
                <h5  style = {{ backgroundColor: "rgb(213, 126, 126"}} className="card-header">Income</h5>
                <div style = {{fontSize: '70px', backgroundColor: "rgb(213, 126, 126"}}className="card-body">{cardData.incomeCount}</div>
            </div> 
            <div className="card mb-3 shadow-lg text-center rounded" style={{ height: "214px",  color: "white"}}>
                <h5  style = {{ backgroundColor: "rgb(162, 205, 205)"}}className="card-header">Expenses</h5>
                <div style = {{fontSize: '70px', backgroundColor: "rgb(162, 205, 205)"}}className="card-body text-center">{cardData.expenseCount}</div>
            </div> 
        </div>
    )
}

export default Side;