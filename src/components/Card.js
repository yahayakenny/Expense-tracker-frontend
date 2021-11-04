import React from 'react';
import { NET_URL, TOKEN, commas } from "./utils";
import { useEffect, useState } from "react"
import axios from 'axios';

const Card = () => {
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
        <div className = "row"> 
            <div className= "col-md-4">
                <div className="card text-white mb-3 shadow-lg text-center" style={{backgroundColor: "rgb(162, 205, 205)"}}>
                    <div className="card-header">Expenses for the Month</div>
                    <div className="card-body">
                        <h1 className="card-text">£{cardData ? commas(cardData.expense) : cardData.expense}</h1>
                    </div>
                </div> 
            </div>
            <div className= "col-md-4" >
                <div className="card text-white mb-3 shadow-lg text-center" style = {{backgroundColor: "rgb(213, 126, 126)"}}>
                    <div className="card-header">Income for the Month</div>
                    <div className="card-body">
                        <h1 className="card-text">£{cardData ? commas(cardData.income) : cardData.income}</h1>
                    </div>
            </div> 
            </div>
            <div className= "col-md-4 text-center">
                <div className="card text-white mb-3 shadow-lg" style={{backgroundColor: "rgb(198, 213, 126)"}}>
                    <div className="card-header">Net for the Month</div>
                    <div className="card-body">
                        <h1 className="card-text">£{cardData ? commas(cardData.net) : cardData.net}</h1>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Card;
