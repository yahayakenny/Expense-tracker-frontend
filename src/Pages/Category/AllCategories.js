import React, { useEffect, useState } from "react";

import ApiClient from "../../Components/api";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import styled from "styled-components";
import { useHistory } from "react-router";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const AllCategory = ({ getCategory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);
  let getUser = JSON.parse(localStorage.getItem("userInfo"));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    ApiClient.get("/category/")
      .then((res) => {
        setTableData(res.data.filtered);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, [history, getUser.token]);

  const handleDelete = (id) => {
    ApiClient.delete(`/category/${id}/`)
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
        <div className="p-4 mt-4 mb-4 shadow-lg">
          <div className="container p-3">
            <h5 className="text-center">All Categories</h5>
          </div>
          <div className="table-responsive">
            <table className="">
              <thead>
                <tr>
                  <th scope="col">Name</th>
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
                          <td onClick={() => getCategory(item.id)}>
                            <Link to="update-category/">
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

export default AllCategory;
