import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ChartWidget({ widget }) {
  const data = {
    labels: widget.labels,
    datasets: [
      {
        label: widget.name,
        data: widget.data,
        backgroundColor: widget.chartType === 'bar' ? 'rgba(75, 192, 192, 0.6)' : [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
      },
    ],
  };

  return (
    <div className="widget">
      <h3>{widget.name}</h3>
      {widget.chartType === 'bar' && <Bar data={data} />}
      {widget.chartType === 'pie' && <Pie data={data} />}
    </div>
  );
}

export default ChartWidget;
