import { useEffect, useState } from "react"
import axios from 'axios';
import { WEEK_URL } from "./utils";
import { PolarAreaChart } from "./PolarAreaChart";


export const FetchPolarAreaChart = () => {
    const [polarAreaData, setPolarAreaData] = useState({filtered: []});
    let getUser = JSON.parse(localStorage.getItem('userInfo'))
   
    useEffect(() => {
        axios.get(WEEK_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${getUser.token}`}
    
        }).then(res => 
            setPolarAreaData({
                labels: res.data.filtered.map((item)=> item.week),
                datasets: [{
                    label: 'Expenses each week of the month',
                    data: res.data.filtered.map((item)=> item.total),
                    backgroundColor: [
                        'rgb(213, 126, 126)',
                        'rgb(198, 213, 126)',
                        'rgb(162, 205, 205)',
                        'rgb(255, 225, 175)',
                    ],
                    borderColor: [
                    'rgb(213, 126, 126)',
                    'rgb(198, 213, 126)',   
                    'rgb(162, 205, 205)',
                    'rgb(255, 225, 175)',
                    ],
                    borderWidth: 1
                }
                ] 
            })
        ).catch(error => console.log(error))
        return () => {setPolarAreaData({}); }
    },[getUser.token])
    
    return (
        <div className="shadow-lg rounded">  
            <div className="container">
                <PolarAreaChart chartData={polarAreaData}/>
            </div>     
        </div> 
    )
}
