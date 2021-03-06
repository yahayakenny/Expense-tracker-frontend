import { useEffect, useState } from "react";

import ApiClient from "../../Components/api";
import { BarChart } from "../../Components/BarChart";

export const FetchMontlyExpenses = () => {
  const [barChartData, setBarChartData] = useState({ filtered: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    ApiClient
      .get('/query-month-graph/', )
      .then((res) =>
        setBarChartData({
          labels: res.data.filtered.map((item) => item.month),
          datasets: [
            {
              label: "Monthly Expenses",
              data: res.data.filtered.map((item) => item.amount),
              backgroundColor: [
                "rgb(255, 225, 175)",
                "rgb(162, 205, 205)",
                "rgb(213, 126, 126)",
                "rgb(198, 213, 126)",
                "rgb(88, 61, 114)",
                "rgb(159, 95, 128)",
                "rgb(255, 186, 147)",
                "rgb(255, 142, 113)",
                "rgb(75, 56, 105)",
                "rgb(102, 78, 136)",
                "rgb(99, 180, 184)",
                "rgb(169, 228, 215)",
              ],
              borderColor: [
                "rgb(255, 225, 175)",
                "rgb(162, 205, 205)",
                "rgb(213, 126, 126)",
                "rgb(198, 213, 126)",
                "rgb(88, 61, 114)",
                "rgb(159, 95, 128)",
                "rgb(255, 186, 147)",
                "rgb(255, 142, 113)",
                "rgb(75, 56, 105)",
                "rgb(102, 78, 136)",
                "rgb(99, 180, 184)",
                "rgb(169, 228, 215)",
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
      setBarChartData({});
    };
  }, []);

  return (
    <div className="shadow-lg rounded">
      <div className="container">
        {barChartData ? <BarChart chartData={barChartData} /> : error}
      </div>
    </div>
  );
};
