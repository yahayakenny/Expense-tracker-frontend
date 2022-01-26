import "../../Styles/App.css"

import React from "react";
import { commas } from "../../Helpers/Helpers";
import { useSelector } from "react-redux";

const Card = () => {
  const cardData = useSelector((state) => state.card);
  const settings = useSelector((state) => state.settings);
  return (
    <div className="row">
      <div className="col-md-4">
        <div
          className="card card-dashboard text-white mb-3 shadow-lg text-center"
          style={{ backgroundColor: "rgb(162, 205, 205)" }}
        >
          <div className="card-header">Expenses for the Month</div>
          <div className="card-body">
            <i className="fas fa-chart-line" style={{ fontSize: "70px" }}></i>
            <br></br>
            <br></br>
            <h1 className="card-text">
              {settings.currency ? settings.currency : "£"}
              {cardData ? commas(cardData.expense) : cardData.expense}
            </h1>
          </div>
          <div className="card-footer">
            Spending Limit: {settings.currency ? settings.currency : "£"}
            {settings.limit ? settings.limit : 0}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card card-dashboard text-white mb-3 shadow-lg text-center"
          style={{ backgroundColor: "rgb(213, 126, 126)" }}
        >
          <div className="card-header">Income for the Month</div>
          <div className="card-body">
            <i className="fas fa-chart-pie" style={{ fontSize: "70px" }}></i>
            <br></br>
            <br></br>
            <h1 className="card-text">
              {settings.currency ? settings.currency : "£"}
              {cardData ? commas(cardData.income) : cardData.income}
            </h1>
          </div>
        </div>
      </div>
      <div className="col-md-4 text-center">
        <div
          className="card card-dashboard text-white mb-3 shadow-lg"
          style={{ backgroundColor: "rgb(198, 213, 126)" }}
        >
          <div className="card-header">Net for the Month</div>
          <div className="card-body">
            <i
              className="fas fa-chart-bar"
              style={{ color: "", fontSize: "70px" }}
            ></i>
            <br></br>
            <br></br>
            <h1 className="card-text">
              {settings.currency ? settings.currency : "£"}
              {cardData ? commas(cardData.net) : cardData.net}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
