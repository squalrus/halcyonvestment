import 'chartjs-adapter-date-fns';
import { ReactChart } from 'chartjs-react';
import { LineController, LineElement, PointElement, CategoryScale, LinearScale, TimeScale, Filler, Tooltip } from 'chart.js';
import React from 'react';
import BeerData from '../Data/BeerData';
import BioData from '../Data/BioData';
import FounderData from '../Data/FounderData';

ReactChart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, TimeScale, Filler, Tooltip);

const chartOptions = {
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
};

let investmentTotal = 0;

let founded = [{ x: BioData.foundedDate, y: 0 }];

let dataset = BioData.purchases.map(function (element) {
    const beer = BeerData.BeerData.filter((item) => {
        return item.id == element.beer;
    })[0];

    investmentTotal += element.discount || FounderData.DEFAULT_DISCOUNT;

    return {
        x: element.date,
        y: investmentTotal,
    };
});

const data = {
    datasets: [
        {
            backgroundColor: 'rgba(34, 179, 57, 0.5)',
            borderColor: 'rgb(34, 179, 57)',
            fill: true,
            data: founded.concat(dataset),
        },
    ],
};

const ChartPurchases = () => {
    return <ReactChart type="line" data={data} options={chartOptions} height={200} />;
};

export default ChartPurchases;
