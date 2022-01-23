import { ALL_USERS_URL } from "../../Components/utils";
import React from "react";
import styled from "styled-components";
import { useAxios } from "use-axios-client";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const AllUsers = () => {
  let getUser = JSON.parse(localStorage.getItem("userInfo"));

  const { data, error, loading } = useAxios({
    url: ALL_USERS_URL,
    headers: {
      Authorization: `Bearer ${getUser.token}`,
    },
  });

  return (
    <StyledApp>
      <div className="container">
        <div className="p-1">
          <div className="container p-3">
            <h5 className="text-center">LIST OF USERS</h5>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Admin</th>
                </tr>
              </thead>
              {loading && <div>Loading...</div>}
              {error && <div>{error.message}</div>}
              {data
                ? data.map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.username}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.isAdmin ? "YES" : "NO"}</td>
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

export default AllUsers;
