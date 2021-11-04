import { Pie} from "react-chartjs-2";

export const PieChart = ({ chartData }) => {
    return (
      <div>
        <Pie
          data={chartData}
          height = {400}
          width = {350}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Expense Categories"
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