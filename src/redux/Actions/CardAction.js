import axios from "axios";
import { NET_URL } from "../../Components/utils";
import store from "../store/Store";
let getUser = JSON.parse(localStorage.getItem("userInfo"));

export const CardAction = () => {
  axios
    .get(NET_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUser.token}`,
      },
    })
    .then((res) => {
      let data = res.data.filtered[0];
      console.log("data from card", data);
      store.dispatch({
        type: "CARD_DATA",
        data: {
          expense: data.expense,
          income: data.income,
          net: data.net,
          incomeCount: data.incomeCount,
          expenseCount: data.expenseCount,
          categoryCount: data.categoryCount,
        },
      });
    })
    .catch((error) => console.log(error));
};
