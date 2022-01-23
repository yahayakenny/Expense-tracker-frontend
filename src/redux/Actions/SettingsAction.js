import axios from "axios";
import { SETTINGS_URL } from "../../Components/utils";
import store from "../store/Store";

let getUser = JSON.parse(localStorage.getItem("userInfo"));
export const SettingsAction = () => {
  axios
    .get(SETTINGS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUser.token}`,
      },
    })
    .then((res) => {
      let data = res.data[0];
      store.dispatch({
        type: "SETTINGS_DATA",
        data: {
          currency: data.currency,
          limit: data.limit,
        },
      });
    })
    .catch((error) => console.log(error));
};
