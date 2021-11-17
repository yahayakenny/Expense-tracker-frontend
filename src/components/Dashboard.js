import { FetchLineGraph } from "./FetchLineGraph";
import {FetchPieChart } from "./FetchPieChart";
import Card from "./Card";
import Table from "./Table";
import { FetchMontlyExpenses } from "./FetchMonthlyExpenses";
import '../css/App.css'
import { FetchPolarAreaChart } from "./FetchPolarAreaChart";
import Side from "./Side";
import styled from "styled-components";
import { useState } from "react/cjs/react.development";

const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor}
    `;

const Dashboard = ({TOKEN, name, settings}) => {
    const [setExpense, setGetExpense] = useState('')
    const handleExpense = (expense) => {
        setGetExpense(expense)
    }

    return (
        <StyledApp>
            <div className="container" >
            <br></br> <br></br> 
            <div className = "hero padding">
                <div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 hero-text d-flex align-items-center">
                            <div>
                                <h3>Welcome {name}</h3>
                                <h5>Here is a summary of your spending this month..</h5>
                            {
                                setExpense > settings.limit ? (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    You have reached your spending limit for the month
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>) : ''
                            }
                            </div>
                        </div>
                        <div>     
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col-md-12">
                    <div>
                        <Card TOKEN = {TOKEN} getExpense={handleExpense} settings = {settings}/>
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
            </div>
            <div>
                <Side TOKEN = {TOKEN}/>
            </div>
            <br></br> <br></br> 
            <div className= "shadow-lg">
                <Table TOKEN = {TOKEN} settings = {settings}/>
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
        </StyledApp>
    )
}

export default Dashboard;
