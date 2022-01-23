import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        height={400}
        width={400}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Monthly Expenses ",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};
