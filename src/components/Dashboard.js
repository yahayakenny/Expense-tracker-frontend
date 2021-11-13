import { FetchLineGraph } from "./FetchLineGraph";
import {FetchPieChart } from "./FetchPieChart";
import Card from "./Card";
import Table from "./Table";
import { FetchMontlyExpenses } from "./FetchMonthlyExpenses";
import '../css/App.css'
import { FetchPolarAreaChart } from "./FetchPolarAreaChart";
import Side from "./Side";


const Dashboard = ({TOKEN, name}) => {
    return (
        <div className="container" >
            <br></br> <br></br> 
            <div className = "hero padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 hero-text d-flex align-items-center">
                            <div>
                                <h3>Welcome {name}</h3>
                                <h5>Here is a summary of your spending this month..</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br> <br></br> 
            <div className="row">
                <div className="col-md-9">
                    <div>
                        <Card TOKEN = {TOKEN}/>
                    </div>
                    <div className="row">
                        <div className=" col-md-5 col-sm-12 mb-4 mt-4 ">
                            <FetchPieChart TOKEN = {TOKEN}/>
                        </div>
                        <div className="col-md-7 col-sm-12 mb-4 mb-4 mt-4 ">
                            <FetchLineGraph TOKEN = {TOKEN}/>
                        </div> 
                    </div> 
                    <br></br> 
                </div>
                <div className="col-md-3">
                    <Side TOKEN = {TOKEN}/>
                </div>
            </div>
            <div className= "shadow-lg">
                <Table TOKEN = {TOKEN}/>
            </div>
            <br></br> 
            <div className="row">
                <div className=" col-md-5 col-sm-12 mb-4 mt-4 ">
                    <FetchMontlyExpenses TOKEN = {TOKEN}/>
                </div>
                <div className="col-md-7 col-sm-12 mb-4 mb-4 mt-4 ">
                    <FetchPolarAreaChart TOKEN = {TOKEN}/>
                </div> 
            </div> 
            <br></br>
        </div>       
    )
}

export default Dashboard;
