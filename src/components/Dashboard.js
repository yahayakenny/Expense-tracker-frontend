import { FetchLineGraph } from "./FetchLineGraph";
import {FetchPieChart } from "./FetchPieChart";
import Card from "./Card";
import Table from "./Table";
import { FetchMontlyExpenses } from "./FetchMonthlyExpenses";
import './App.css'
import { FetchPolarAreaChart } from "./FetchPolarAreaChart";

const Dashboard = () => {
    return (
        <div className="container" >
            <br></br>
            <div>
                <Card/>
            </div>
            <div className="row">
                <div className=" col-md-5 col-sm-12 mb-4 mt-4 ">
                    <FetchPieChart/>
                </div>
                <div className="col-md-7 col-sm-12 mb-4 mb-4 mt-4 ">
                    <FetchLineGraph/>
                </div> 
            </div> 
            <br></br> 
            <div className= "shadow-lg">
                <Table/>
            </div>
            <br></br> 
            <div className="row">
                <div className=" col-md-5 col-sm-12 mb-4 mt-4 ">
                    <FetchMontlyExpenses/>
                </div>
                <div className="col-md-7 col-sm-12 mb-4 mb-4 mt-4 ">
                    <FetchPolarAreaChart/>
                </div> 
            </div> 
        </div>       
    )
}

export default Dashboard;
