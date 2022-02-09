import { useEffect, useState } from "react";

import ApiClient from "../../Components/api";
import { PieChart } from "../../Components/PieChart";

export const FetchPieChart = () => {
  const [pieChartData, setPieChartData] = useState({});
  const [error, setError] = useState("");


  useEffect(() => {
    ApiClient
      .get('/query-category/')
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
  }, []);

  return (
    <div className="shadow-lg rounded">
      <div className="container">
       {pieChartData ? <PieChart chartData={pieChartData} /> : error}
      </div>
    </div>
  );
};
