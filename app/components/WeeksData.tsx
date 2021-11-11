import { Week } from ".prisma/client";
import { ChartData } from "chart.js";
import compareAsc from "date-fns/compareAsc";
import { Line } from "react-chartjs-2";
import { useLoaderData } from "remix";
import {
  getAverageEarned,
  getAverageWorked,
  getTotalDaysWorked,
  getTotalEarnedEuros,
  getTotalWorkedHours,
} from "~/lib/week";

export const WeeksData = () => {
  const weeks = useLoaderData<Week[]>();

  const items = weeks.sort((a, b) => compareAsc(new Date(a.start), new Date(b.start)));

  const chartData: ChartData<"line"> = {
    labels: new Array(items.length).fill({}).map((_, idx) => `Week ${idx + 1}`),
    datasets: [
      {
        label: "# Hours worked",
        data: items.map((v) => v.hours),
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
      },
      {
        label: "# Earnings made",
        data: items.map((v) => v.earnings),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  return (
    <div className="mt-10 mb-3 space-y-1">
      <h1 className="mb-3 text-3xl font-bold">Track work data</h1>

      <p>
        <span className="font-semibold">Weeks worked: </span>
        <span className="font-mono">{items.length} weeks</span>
      </p>
      <p>
        <span className="font-semibold">Days worked: </span>
        <span className="font-mono">{getTotalDaysWorked(items)}</span>
      </p>
      <p>
        <span className="font-semibold">Hours worked: </span>
        <span className="font-mono">{getTotalWorkedHours(items)}</span>
      </p>
      <p>
        <span className="font-semibold">Average Hours: </span>
        <span className="font-mono">{getAverageWorked(items)}</span>
      </p>
      <p>
        <span className="font-semibold">Total Earned: </span>
        <span className="font-mono">{getTotalEarnedEuros(items)}</span>
      </p>
      <p>
        <span className="font-semibold">Average Earned: </span>
        <span className="font-mono">{getAverageEarned(items)}</span>
      </p>

      <Line
        options={{
          animation: false,
          scales: {
            x: {
              type: "category",
              min: 0,
              max: 10,
            },
            y: {
              type: "linear",
              min: 0,
            },
          },
          plugins: { legend: { labels: { font: { family: '"Raleway", sans-serif' } } } },
        }}
        data={chartData}
      />
    </div>
  );
};
