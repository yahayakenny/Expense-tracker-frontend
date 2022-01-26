import { useEffect, useState } from "react";

import { CATEGORY_URL } from "../../Components/utils";
import { PieChart } from "../../Components/PieChart";
import axios from "axios";

export const FetchPieChart = () => {
  const [pieChartData, setPieChartData] = useState({});
  let getUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [error, setError] = useState("");


  useEffect(() => {
    axios
      .get(CATEGORY_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser.token}`,
        },
      })
      .then((res) =>
        setPieChartData({
          labels: res.data.filtered.map((item) => item.category),
          datasets: [
            {
              label: "Expenses for the month",
              data:res.data.filtered.map((item) => item.amount),
              backgroundColor: [
                "rgb(198, 213, 126)",
                "rgb(213, 126, 126)",
                "rgb(162, 205, 205)",
                "rgb(201, 150, 204)",
                "rgb(255, 225, 175)",
              ],
              borderColor: [
                "rgb(198, 213, 126)",
                "rgb(213, 126, 126)",
                "rgb(162, 205, 205)",
                "rgb(201, 150, 204)",
                "rgb(255, 225, 175)",
              ],
              borderWidth: 1,
            },
          ],
        })
      )
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Error!");
        }
      });
    return () => {
      setPieChartData({});
    };
  }, [getUser.token]);

  return (
    <div className="shadow-lg rounded">
      <div className="container">
       {pieChartData ? <PieChart chartData={pieChartData} /> : error}
      </div>
    </div>
  );
};
