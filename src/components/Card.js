import React from 'react';
import { NET_URL, commas } from "./utils";
import { useEffect, useState } from "react"
import axios from 'axios';

//CARD NOT GETTING TOKEN
const Card = ({TOKEN}) => {
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
    },[TOKEN])

    return (
        <div className = "row"> 
            <div className= "col-md-4">
                <div className="card text-white mb-3 shadow-lg text-center" style={{backgroundColor: "rgb(162, 205, 205)"}}>
                    <div className="card-header">Expenses for the Month</div>
                    <div className="card-body">
                        <i className="fas fa-chart-line" style={{fontSize: "70px"}}></i>
                        <br></br><br></br>
                        <h1 className="card-text">£{cardData ? commas(cardData.expense) : cardData.expense}</h1>
                    </div>
                </div> 
            </div>
            <div className= "col-md-4" >
                <div className="card text-white mb-3 shadow-lg text-center" style = {{backgroundColor: "rgb(213, 126, 126)"}}>
                    <div className="card-header">Income for the Month</div>
                    <div className="card-body">
                        <i className="fas fa-chart-pie" style={{ fontSize: "70px"}}></i>
                        <br></br><br></br>
                        <h1 className="card-text">£{cardData ? commas(cardData.income) : cardData.income}</h1>
                    </div>
                </div> 
            </div>
            <div className= "col-md-4 text-center">
                <div className="card text-white mb-3 shadow-lg" style={{backgroundColor: "rgb(198, 213, 126)"}}>
                    <div className="card-header">Net for the Month</div>
                    <div className="card-body">
                        <i className="fas fa-chart-bar" style={{color: "", fontSize: "70px"}}></i>
                        <br></br><br></br>
                        <h1 className="card-text">£{cardData ? commas(cardData.net) : cardData.net}</h1>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Card;
