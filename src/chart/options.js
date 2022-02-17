module.exports = {
  OPTIONS: {
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
};
