import { useEffect, useState } from "react"
import {PieChart} from './PieChart';
import axios from 'axios';
import { CATEGORY_URL, TOKEN } from "./utils";

export const FetchPieChart = () => {
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        axios.get(CATEGORY_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
    
        }).then(res => 
            setPieChartData({
                labels: res.data.filtered.map((item)=> item.category),
                datasets: [{
                    label: 'Expenses for the month',
                    data: res.data.filtered.map((item)=> item.amount),
                    backgroundColor: [
                    'rgb(198, 213, 126)',
                    'rgb(213, 126, 126)',
                    'rgb(162, 205, 205)',
                    'rgb(201, 150, 204)',
                    'rgb(255, 225, 175)',
                    ],
                    borderColor: [
                    'rgb(198, 213, 126)',
                    'rgb(213, 126, 126)',
                    'rgb(162, 205, 205)',
                    'rgb(201, 150, 204)',
                    'rgb(255, 225, 175)',
                    ],
                    borderWidth: 1
                }
                ] 
            })
        ).catch(error => console.log(error))
        return () => {}
    },[])
    
    return (
        <div className="shadow-lg rounded">  
            <div className="container">
                <PieChart chartData={pieChartData}/>
            </div>     
        </div> 
    )
}
