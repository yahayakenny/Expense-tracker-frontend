import { useEffect, useState } from "react";

import  ApiClient from "../../Components/api";
import { LineChart } from "../../Components/LineChart";

export const FetchLineGraph = () => {
  const [lineChartData, setLineChartData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    ApiClient
      .get('/query-day-graph/')
      .then((res) =>
        setLineChartData({
          labels: res.data.filtered.map((item) => item.day),
          datasets: [
            {
              label: "Last Seven Days",
              fill: false,
              lineTension: 0.1,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBackgroundColor: "#fff",
              pointRadius: 1,
              pointHoverRadius: 1,
              pointHitRadius: 10,
              data: res.data.filtered.map((item) => item.amount),
              backgroundColor: [
                "rgb(162, 205, 205)",
                "rgb(213, 126, 126)",
                "rgb(198, 213, 126)",
                "rgb(255, 225, 175)",
              ],
              borderColor: [
                "rgb(162, 205, 205)",
                "rgb(213, 126, 126)",
                "rgb(198, 213, 126)",
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
      setLineChartData({});
    };
  }, []);

  return (
    <div className="shadow-lg rounded">
      <div className="container">
        { lineChartData ? <LineChart chartData={lineChartData}/> : error}
      </div>
    </div>
  );
};
