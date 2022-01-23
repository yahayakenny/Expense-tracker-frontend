import React from "react";
import { useSelector } from "react-redux";

const Side = () => {
  const cardData = useSelector((state) => state.card);

  return (
    <div className="row">
      <div className="col-md-4">
        <div
          className="card mb-3 shadow-lg text-center rounded"
          style={{ height: "214px", color: "white" }}
        >
          <h5
            style={{ backgroundColor: "rgb(198, 213, 126)" }}
            className="card-header"
          >
            Categories
          </h5>
          <div
            style={{ fontSize: "70px", backgroundColor: "rgb(198, 213, 126)" }}
            className="card-body"
          >
            {cardData.categoryCount}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card mb-3 shadow-lg text-center rounded"
          style={{ height: "214px", color: "white" }}
        >
          <h5
            style={{ backgroundColor: "rgb(213, 126, 126" }}
            className="card-header"
          >
            Income
          </h5>
          <div
            style={{ fontSize: "70px", backgroundColor: "rgb(213, 126, 126" }}
            className="card-body"
          >
            {cardData.incomeCount}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card mb-3 shadow-lg text-center rounded"
          style={{ height: "214px", color: "white" }}
        >
          <h5
            style={{ backgroundColor: "rgb(198, 213, 126)" }}
            className="card-header"
          >
            Expenses
          </h5>
          <div
            style={{ fontSize: "70px", backgroundColor: "rgb(198, 213, 126)" }}
            className="card-body text-center"
          >
            {cardData.expenseCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Side;
