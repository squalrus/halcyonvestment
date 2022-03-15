module.exports = {
  OPTIONS: {
    INVESTMENT_CHART: {
      plugins: {
        legend: false,
      },
      responsive: true,
      scales: {
        x: {
          display: true,
          type: 'time',
          time: {
            unit: 'day',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Investment',
          },
        },
      },
    },
    BEER_CHART: {
      plugins: {
        legend: false,
      },
      indexAxis: 'y',
      responsive: true,
    },
  },
};
