// src/components/PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Customize colors as needed
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            const percentage = ((value / chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
