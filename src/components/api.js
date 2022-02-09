import axios from "axios";
let getUser = JSON.parse(localStorage.getItem("userInfo"));

const ApiClient = getUser
  ? axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUser.token}`,
      },
    })
  : axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });
export default ApiClient;
