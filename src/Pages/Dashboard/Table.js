import "../../Styles/App.css"

import { useEffect, useState } from "react";

import ApiClient from "../../Components/api";
import { commas } from "../../Helpers/Helpers";
import styled from "styled-components";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const Table = ({ settings }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    ApiClient
      .get('/query-most-recent-expenses/'
       )
      .then((res) => setTableData(res.data.filtered))
      .catch((error) => console.log(error));
    return () => {
      setTableData({});
    };
  }, []);

  return (
    <StyledApp>
      <div>
        <div className="container">
          <div className="p-3">
            <div className="container p-3">
              <h5 className="text-center">Most Recent Expenses</h5>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              {tableData
                ? tableData.map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <td key={item.index}>{item.name}</td>
                          <td key={item.index}>{item.category.name}</td>
                          <td key={item.index}>
                            {" "}
                            {settings.currency ? settings.currency : "£"}
                            {item ? commas(item.amount) : item.amount}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </table>
            <br></br>
          </div>
        </div>
      </div>
    </StyledApp>
  );
};

export default Table;
