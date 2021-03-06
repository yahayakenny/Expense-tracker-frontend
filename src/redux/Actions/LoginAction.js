import { BASE_URL } from "../../Components/utils";
import axios from "axios";
import store from "../store/store";

export const LoginAction = (username, password, history, setError, setLoading) => {
  axios
    .post(`${BASE_URL}/users/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      let data = res.data;
      store.dispatch({
        type: "VALIDATE_LOGIN",
        data: {
          name: data.name,
          token: data.token,
          isAdmin: data.isAdmin,
        },
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data) {
        setLoading(true)
        window.location.href = 'dashboard/';
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        setError("Error: Invalid Credentials");
      }
    });
};
