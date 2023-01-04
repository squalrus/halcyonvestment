import React from 'react';
import 'chartjs-adapter-date-fns';
import { LineController, LineElement, PointElement, CategoryScale, LinearScale, TimeScale, Filler, Tooltip } from 'chart.js';
import { ReactChart } from 'chartjs-react';

import { BeerData, HalcyonDefaults } from '../Data/HalcyonData';
import { MemberData } from '../Data/MemberData';

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

let founded = [{ x: MemberData.foundedDate, y: 0 }];

let dataset = MemberData.purchases.map(function (element) {
    const beer = BeerData.filter((item) => {
        return item.id == element.beer;
    })[0];

    investmentTotal += element.discount || HalcyonDefaults.DEFAULT_DISCOUNT;

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
