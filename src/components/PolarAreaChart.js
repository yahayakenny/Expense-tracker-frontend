import {  PolarArea  } from "react-chartjs-2";

export const PolarAreaChart = ({ chartData }) => {
    return (
      <div>
        <PolarArea
          data={chartData}
          height = {400}
          width = {400}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Weekly Expenses "
              },
              legend: {
                display: true,
                position: "bottom"
             }
            } 
          }}
        />
      </div>
    );
  };;