import {Line} from "react-chartjs-2";

export const LineChart = ({ chartData }) => {
    return (
      <div>
        <Line
          data={chartData}
          height = {400}
          width = {400}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Last Seven Days"
              },
              legend: {
                display: true,
                position: "bottom"
             },
             scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            } 
          }}
        />
      </div>
    );
  };;