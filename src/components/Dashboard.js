import { FetchLineGraph } from "./FetchLineGraph";
import {FetchPieChart } from "./FetchPieChart";
import Card from "./Card";
import Table from "./Table";
import { FetchMontlyExpenses } from "./FetchMonthlyExpenses";
import '../css/App.css'
import { FetchPolarAreaChart } from "./FetchPolarAreaChart";
import Side from "./Side";
import styled from "styled-components";
import {useSelector, } from 'react-redux';

const StyledApp = styled.div`
        color: ${(props) => props.theme.fontColor}
    `;

const Dashboard = () => {
    let getUser = JSON.parse(localStorage.getItem('userInfo'))
    const cardData = useSelector(state => state.card)
    const settings = useSelector(state => state.settings)

    return (
        <StyledApp>
            <div className="container" >
            <br></br> <br></br> 
            <div className = "hero padding">
                <div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 hero-text d-flex align-items-center">
                            <div>
                                <h3>Welcome {getUser.name}</h3>
                                <h5>Here is a summary of your spending this month..</h5>
                            {
                                cardData.expense > settings.limit ? (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    You have reached your spending limit for the month
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>) : null
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
                        <Card settings = {settings}/>
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
                </div> 
            </div>
            <div>
                <Side/>
            </div>
            <br></br> <br></br> 
            <div className= "shadow-lg">
                <Table settings = {settings}/>
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
            <br></br>
        </div>       
        </StyledApp>
    )
}

export default Dashboard;
