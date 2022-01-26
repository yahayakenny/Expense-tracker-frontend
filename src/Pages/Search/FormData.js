import React, { useState } from "react";

import { DATE_RANGE_URL } from "../../Components/utils";
import { FetchExpenses } from "../Expenses/FetchExpenses";
import axios from "axios";
import { commas } from "../../Helpers/Helpers";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

export const FormData = () => {
  const [from_date, setFromDate] = useState("");
  const [to_date, setToDate] = useState("");
  const [select, setSelect] = useState("");
  const [data, setData] = useState({ filtered: [] });
  const [error, setError] = useState("");
  let getUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const settings = useSelector((state) => state.settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(DATE_RANGE_URL, {
        params: {
          from_date: from_date,
          to_date: to_date,
          select: select,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        if (res.data.filtered.length === 0) {
          setError("No results found");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Invalid parameters");
        }
      });
  };
  return (
    <StyledApp>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 mb-4 mt-4 shadow-lg">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4" style={{ width: "100%" }}>
                  <label className="form-label" htmlFor="from_date">
                    From:
                  </label>
                  <input
                    type="date"
                    id="from_date"
                    className="form-control"
                    onChange={(e) => setFromDate(e.target.value)}
                    value={from_date}
                  />
                </div>
                <div className="form-outline mb-4" style={{ width: "100%" }}>
                  <label className="form-label" htmlFor="to_date">
                    To:
                  </label>
                  <input
                    type="date"
                    id="to_date"
                    className="form-control"
                    onChange={(e) => setToDate(e.target.value)}
                    value={to_date}
                  />
                </div>
                <br></br>
                <select
                  style={{
                    width: "100%",
                    height: "38px",
                    borderWidth: "none",
                    padding: "3px",
                  }}
                  className="form-select"
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}
                >
                  <option selected>Select an option</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <br></br>
                <br></br>
                <button
                  type="submit"
                  className="btn btn-block mb-4"
                  style={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "rgb(213, 126, 126)",
                  }}
                >
                  Search
                </button>
              </form>
              {data.total ? (
                <div
                  className="card text-white mb-3 shadow-lg text-center rounded"
                  style={{ backgroundColor: "rgb(213, 126, 126)" }}
                >
                  <div className="card-header">Total</div>
                  <div className="card-body">
                    <h1 className="card-text">
                      {settings.currency ? settings.currency : "£"}
                      {commas(data.total)}
                    </h1>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-8 col-sm-12 mb-4 mt-4">
            <div className="container">
              <FetchExpenses data={data} error={error} settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </StyledApp>
  );
};
