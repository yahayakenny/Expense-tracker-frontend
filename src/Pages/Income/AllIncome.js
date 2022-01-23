import { ALL_INCOME_URL, BASE_URL } from "../../Components/utils";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import { commas } from "../../Helpers/Helpers";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const AllIncome = ({ getIncome }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);
  let getUser = JSON.parse(localStorage.getItem("userInfo"));
  const settings = useSelector((state) => state.settings);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get(ALL_INCOME_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser.token}`,
        },
      })
      .then((res) => setTableData(res.data))
      .catch((error) => console.log(error));
    history.push("/all-income");

    return () => {};
  }, [history, getUser.token]);

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/income/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser.token}`,
        },
      })
      .then((res) => {
        const filtered_data = tableData.filter((item) => item.id !== id);
        alert("item deleted successfully");
        setTableData(filtered_data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledApp>
      <div className="container">
        <br></br>
        <div className="p-4 mt-4 mb-4 shadow-lg">
          <div className="container p-3 ">
            <h5 className="text-center">All Income</h5>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
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
                          <td>{item.description}</td>
                          <td>
                            {settings.currency ? settings.currency : "£"}
                            {item ? commas(item.amount) : item.amount}
                          </td>
                          <td onClick={() => getIncome(item.id)}>
                            <Link to="update-income/">
                              <i
                                class="fas fa-edit"
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
                : ""}
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

export default AllIncome;
