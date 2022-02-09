import React, { useEffect, useRef, useState } from "react";

import  ApiClient from "../../Components/api";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import { commas } from "../../Helpers/Helpers";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const AllExpenses = ({ getExpense, }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [csv, setCsv] = useState("");
  const csvLink = useRef();
  const history = useHistory();
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);
  let getUser = JSON.parse(localStorage.getItem("userInfo"));
  const settings = useSelector((state) => state.settings);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    ApiClient
      .get('/expense/')
      .then((res) => setTableData(res.data))
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Error!");
        }
      });
    history.push("/all-expenses");
    return () => {};
  }, [history, getUser.token]);

  const handleDelete = (id) => {
    ApiClient
      .delete(`/expense/${id}/`)
      .then((res) => {
        const filtered_data = tableData.filter((item) => item.id !== id);
        alert("item deleted successfully");
        setTableData(filtered_data);
      })
      .catch((error) => console.log(error));
  };

  // https://stackoverflow.com/questions/53504924/reactjs-download-csv-file-on-button-click
  const handleCsv = () => {
    ApiClient
      .get('/expense/export-csv')
      .then((res) => setCsv(res.data))
      .catch((error) => console.log(error));
    csvLink.current.link.click();
  };

  // https://stackoverflow.com/questions/68356665/how-to-download-excel-file-with-axios-vuejs
  const handleExcel = () => {
    ApiClient
      .get('/expense/export-excel')
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        const filename = `expenses.xls`;
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.log(error));
  };

  const handlePdf = () => {
   ApiClient
      .get('/expense/export-pdf', {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        const filename = "expenses.pdf";
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledApp>
      <div className="container">
        <div className="p-4 mt-5 mb-4 shadow-lg">
          <div className="container p-3">
            <h5 className="text-center">All Expenses</h5>
          </div>
          <div className="table-responsive">
            <div className="container">
              <div className="row d-grid gap-2">
                <div className="col-md-4 col-sm-4 text-center">
                  <br></br>
                  <button
                    style={{
                      color: "white",
                      width: "100%",
                      backgroundColor: "rgb(162, 205, 205)",
                    }}
                    onClick={handleCsv}
                    className="btn btn-lg"
                  >
                    Export CSV
                  </button>
                  <CSVLink
                    data={csv}
                    filename="expenses.csv"
                    className="hidden"
                    ref={csvLink}
                    target="_blank"
                  />
                </div>
                <div className="col-md-4 col-sm-4 text-center">
                  <br></br>
                  <button
                    style={{
                      backgroundColor: "rgb(213, 126, 126)",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={handleExcel}
                    className="btn btn-lg"
                  >
                    Export Excel
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 text-center">
                  <br></br>
                  <button
                    style={{
                      backgroundColor: "rgb(198, 213, 126)",
                      width: "100%",
                      color: "white",
                    }}
                    onClick={handlePdf}
                    className="btn btn-lg"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
            <br></br> <br></br>
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              {currentData
                ? currentData.map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.category.name}</td>
                          <td>
                            {settings.currency ? settings.currency : "£"}
                            {item ? commas(item.amount) : item.amount}
                          </td>
                          <td onClick={() => getExpense(item.id)}>
                            <Link to="update-expense/">
                              <i
                                className="fas fa-edit"
                                style={{ color: "rgb(198, 213, 126)" }}
                              ></i>
                            </Link>
                          </td>
                          <td onClick={() => handleDelete(item.id)}>
                            <i
                              className="fas fa-trash"
                              style={{ color: "rgb(213, 126, 126)" }}
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                : error}
            </table>
            <br></br>
            <Pagination
              totalData={tableData.length}
              dataPerPage={dataPerPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </StyledApp>
  );
};

export default AllExpenses;
