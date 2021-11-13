import {Doughnut } from "react-chartjs-2";

export const DoughnutChart = ({ chartData }) => {
    return (
      <div>
        <Doughnut
          data={chartData}
          height = {400}
          width = {400}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Monthly Expenses"
              },
              legend: {
                display: true,
                position: "top"
             }
            } 
          }}
        />
      </div>
    );
  };;
  