import { useEffect, useState } from "react"
import { LineChart } from './LineChart';
import axios from 'axios';
import { DAY_URL} from "./utils";

//LINE GRAPH NOT USING TOKEN, ANOTHER JUSTIFICATION FOR REDUX
export const FetchLineGraph = ({TOKEN}) => {
    const [lineChartData, setLineChartData] = useState({});
  
    useEffect(() => {
        axios.get(DAY_URL, {
            headers:{
                "Content-Type": 'application/json' ,
                'Authorization':`Bearer ${TOKEN}`}
    
        }).then(res => 
            setLineChartData({
                labels: res.data.filtered.map((item)=> item.day),
                datasets: [{
                    label: 'Last Seven Days',
                    data: res.data.filtered.map((item)=> item.amount),
                    backgroundColor: [
                        'rgb(162, 205, 205)',
                        'rgb(213, 126, 126)',
                        'rgb(198, 213, 126)',
                        'rgb(255, 225, 175)',
                    ],
                    borderColor: [
                        'rgb(162, 205, 205)',
                        'rgb(213, 126, 126)',
                        'rgb(198, 213, 126)',
                        'rgb(255, 225, 175)',
                    ],
                    borderWidth: 1
                }
                ] 
            })
        ).catch(error => console.log(error))
        return () => {}
    },[TOKEN])

    return (
        <div className="shadow-lg rounded">  
            <div className="container">
                <LineChart chartData={lineChartData}/>
            </div>     
        </div>
    )
}
