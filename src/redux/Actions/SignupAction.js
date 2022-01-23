import { BASE_URL } from "../../Components/utils";
import axios from "axios";
import store from "../store/Store";

export const SignUpAction = (
  first_name,
  last_name,
  email,
  username,
  password,
  setError,
  history
) => {
  axios
    .post(`${BASE_URL}/users/register`, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username,
      password: password,
    })
    .then((res) => {
      let data = res.data;
      store.dispatch({
        type: "VALIDATE_SIGNUP",
        data: {
          name: data.name,
          token: data.token,
          isAdmin: data.isAdmin,
        },
      });
      alert("User successfully created");
      history.push('/')
    })
    .catch((error) => {
      if (error.response.status === 401) {
        setError("Error: Invalid Credentials");
      }
    });
};
