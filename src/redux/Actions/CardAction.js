import { NET_URL } from "../../Components/utils";
import axios from "axios";
import store from "../store/store";

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
