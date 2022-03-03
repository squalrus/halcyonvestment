import { GLOBAL } from './data/global';
import { BEERS } from './data/beers';
import { PURCHASES } from './data/purchases';
import { OPTIONS } from './chart/options';
import { randomColors } from './chart/colors';

let investmentTotal = 0;
let totalCount = 0;
let totalList = [];
let totalOz = 0;

/**
 * Generated a chartjs consumable dataset from raw data
 * @returns chart dataset
 */
function generateDataset() {
  let founded = [{ x: GLOBAL.FOUNDED_DATE, y: 0 }];

  let dataset = PURCHASES.map(function (element) {
    const beer = BEERS.filter((item) => {
      return item.id == element.beer;
    })[0];

    investmentTotal += element.discount || GLOBAL.DEFAULT_DISCOUNT;
    totalCount++;
    totalOz += element.oz || GLOBAL.DEFAULT_OZ;
    totalList.push(beer ? beer.name : element.beer);

    return {
      x: element.date,
      y: investmentTotal,
    };
  });

  return founded.concat(dataset);
}

function generateBeerDataset() {
  let beerCount = {};

  PURCHASES.forEach((element) => {
    if (typeof beerCount[element.beer] === 'undefined') {
      beerCount[element.beer] = 1;
    } else {
      beerCount[element.beer] = beerCount[element.beer] + 1;
    }
  });

  return Object.values(beerCount);
}

function generateBeerLabels() {
  let beerCount = {};

  PURCHASES.forEach((element) => {
    const beer = BEERS.filter((item) => {
      return item.id == element.beer;
    })[0];

    const key = beer ? beer.name : element.beer;

    if (typeof beerCount[key] === 'undefined') {
      beerCount[key] = 1;
    } else {
      beerCount[key] = beerCount[key] + 1;
    }
  });

  return Object.keys(beerCount);
}

// Render chart
const investmentChartContext = document.getElementById('investment-chart').getContext('2d');
const investmentChart = new Chart(investmentChartContext, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Current Investment',
        backgroundColor: 'rgba(34, 179, 57, 0.5)',
        borderColor: 'rgb(34, 179, 57)',
        fill: true,
        data: generateDataset(),
      },
    ],
  },
  options: OPTIONS,
});

// Render chart
const beerChartContext = document.getElementById('beer-chart').getContext('2d');
const beerChart = new Chart(beerChartContext, {
  type: 'pie',
  data: {
    labels: generateBeerLabels(),
    datasets: [
      {
        labels: 'Current Investment',
        data: generateBeerDataset(),
        backgroundColor: randomColors(20),
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Update data
document.getElementById('total-count').firstElementChild.innerText = totalCount.toFixed(0);
document.getElementById('unique-count').firstElementChild.innerText = [...new Set(totalList)].length.toFixed(0);
document.getElementById('total-oz').firstElementChild.innerText = totalOz.toFixed(0);
document.getElementById(
  'information'
).innerHTML = `After an initial investment in the <a href="https://www.halcyonbrewingco.com/online-store">Halcyon Brewing Founding Lagers</a>, each purchase is discounted. Currently saved <strong>$${investmentTotal}</strong> from <strong>${totalCount.toFixed(
  0
)} beers</strong> leaving <strong>$${GLOBAL.INVESTMENT_TOTAL - investmentTotal}</strong> remaining to break even!`;
