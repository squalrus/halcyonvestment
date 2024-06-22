import React from 'react';
import 'chartjs-adapter-date-fns';
import { BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import { ReactChart } from 'chartjs-react';

import { ColorHelper } from '../Helpers/ColorHelper';
import { BeerData } from '../Data/HalcyonData';
import { MemberData } from '../Data/MemberData';

ReactChart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const chartOptions = {
    plugins: {
        legend: false,
    },
    indexAxis: 'y',
    responsive: true,
};

let chartData = {};

MemberData.purchases.forEach((element) => {
    const beer = BeerData.filter((item) => {
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
            backgroundColor: ColorHelper(beerData.length),
            barThickness: 'flex',
            borderColor: '#100c00',
            borderWidth: 1,
        },
    ],
};

const ChartBeer = () => {
    return <ReactChart type="pie" data={data} options={chartOptions} height={800} />;
};

export default ChartBeer;
