import 'chartjs-adapter-date-fns';
import { ReactChart } from 'chartjs-react';
import { BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import React from 'react';
import BeerData from '../Data/BeerData';
import BioData from '../Data/BioData';
import BeerColors from '../Helpers/BeerColors';

ReactChart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const chartOptions = {
    plugins: {
        legend: false,
    },
    indexAxis: 'y',
    responsive: true,
};

let chartData = {};

BioData.purchases.forEach((element) => {
    const beer = BeerData.BeerData.filter((item) => {
        return item.id == element.beer;
    })[0];

    if (typeof chartData[element.beer] === 'undefined') {
        chartData[element.beer] = {
            count: 1,
            name: beer ? beer.name : element.beer,
        };
    } else {
        chartData[element.beer] = {
            count: chartData[element.beer].count + 1,
            name: beer ? beer.name : element.beer,
        };
    }
});

// sort elements high to low
let beerData = Object.keys(chartData)
    .sort(function (a, b) {
        return chartData[b].count - chartData[a].count;
    })
    .map((key) => chartData[key]);

const data = {
    labels: beerData.map((key) => key.name),
    datasets: [
        {
            label: 'Beers',
            data: beerData.map((key) => key.count),
            backgroundColor: BeerColors(beerData.length),
            barThickness: 'flex',
            borderColor: '#100c00',
            borderWidth: 1,
        },
    ],
};

const ChartBeer = () => {
    return <ReactChart type="bar" data={data} options={chartOptions} height={1600} />;
};

export default ChartBeer;
