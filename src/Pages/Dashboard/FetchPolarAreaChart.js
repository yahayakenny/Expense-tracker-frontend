import { useEffect, useState } from "react";

import  ApiClient from "../../Components/api";
import { PolarAreaChart } from "../../Components/PolarAreaChart";

export const FetchPolarAreaChart = () => {
  const [polarAreaData, setPolarAreaData] = useState({ filtered: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    ApiClient
      .get('/query-week-graph/')
      .then((res) =>
        setPolarAreaData({
          labels: res.data.filtered.map((item) => item.week),
          datasets: [
            {
              label: "Expenses each week of the month",
              data: res.data.filtered.map((item) => item.total),
              backgroundColor: [
                "rgb(213, 126, 126)",
                "rgb(198, 213, 126)",
                "rgb(162, 205, 205)",
                "rgb(255, 225, 175)",
              ],
              borderColor: [
                "rgb(213, 126, 126)",
                "rgb(198, 213, 126)",
                "rgb(162, 205, 205)",
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
      setPolarAreaData({});
    };
  }, []);

  return (
    <div className="shadow-lg rounded">
      <div className="container">
        {polarAreaData ? <PolarAreaChart chartData={polarAreaData} /> : error}
      </div>
    </div>
  );
};
