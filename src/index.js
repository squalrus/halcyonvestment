import { GLOBAL } from './data/global';
import { BEERS } from './data/beers';
import { PURCHASES } from './data/purchases';
import { OPTIONS } from './chart/options';
import { beerColors } from './chart/colors';

let purchases = {
  investmentTotal: 0,
  totalCount: 0,
  purchaseList: [],
  totalOz: 0,
  purchaseData: [],
};

let beerData = {};

/**
 * Generates a chartjs consumable dataset from raw data
 * @returns chart dataset
 */
function generatePurchasesDataset() {
  let founded = [{ x: GLOBAL.FOUNDED_DATE, y: 0 }];

  let dataset = PURCHASES.map(function (element) {
    const beer = BEERS.filter((item) => {
      return item.id == element.beer;
    })[0];

    purchases.investmentTotal += element.discount || GLOBAL.DEFAULT_DISCOUNT;
    purchases.totalCount++;
    purchases.totalOz += element.oz || GLOBAL.DEFAULT_OZ;
    purchases.purchaseList.push(beer ? beer.name : element.beer);

    return {
      x: element.date,
      y: purchases.investmentTotal,
    };
  });

  purchases.purchaseData = founded.concat(dataset);
}

/**
 * Generates a chartjs consumable dataset from raw data
 * @returns beer dataset
 */
function generateBeerDataset() {
  let beerCount = {};

  // collect data as per type of beer
  PURCHASES.forEach((element) => {
    const beer = BEERS.filter((item) => {
      return item.id == element.beer;
    })[0];

    if (typeof beerCount[element.beer] === 'undefined') {
      beerCount[element.beer] = {
        count: 1,
        name: beer ? beer.name : element.beer,
      };
    } else {
      beerCount[element.beer] = {
        count: beerCount[element.beer].count + 1,
        name: beer ? beer.name : element.beer,
      };
    }
  });

  // sort elements high to low
  beerData = Object.keys(beerCount)
    .sort(function (a, b) {
      return beerCount[b].count - beerCount[a].count;
    })
    .map((key) => beerCount[key]);
}

/**
 * Calculates the anticipated payoff date based on amount spent over the current time
 * @returns estimated payoff date
 */
function calculatePayoffDate() {
  const ticksSinceFounded = new Date() - new Date(GLOBAL.FOUNDED_DATE);
  const dollarsSinceFounded = purchases.investmentTotal;
  const ticksPerDollar = ticksSinceFounded / dollarsSinceFounded;

  const ticksPayoff = ticksPerDollar * GLOBAL.INVESTMENT_TOTAL;
  const payoffDate = new Date(+new Date(GLOBAL.FOUNDED_DATE) + ticksPayoff);

  return payoffDate.toDateString();
}

generatePurchasesDataset();
generateBeerDataset();

// Render investment chart
const investmentChartContext = document.getElementById('investment-chart').getContext('2d');
const investmentChart = new Chart(investmentChartContext, {
  type: 'line',
  data: {
    datasets: [
      {
        backgroundColor: 'rgba(34, 179, 57, 0.5)',
        borderColor: 'rgb(34, 179, 57)',
        fill: true,
        data: purchases.purchaseData,
      },
    ],
  },
  options: OPTIONS.INVESTMENT_CHART,
});

// Render beer chart
const beerChartContext = document.getElementById('beer-chart').getContext('2d');
const beerChart = new Chart(beerChartContext, {
  type: 'bar',
  data: {
    labels: beerData.map((key) => key.name),
    datasets: [
      {
        label: 'Beers',
        data: beerData.map((key) => key.count),
        backgroundColor: beerColors(beerData.length),
      },
    ],
  },
  options: OPTIONS.BEER_CHART,
});

// Update data
document.getElementById('payoff-date').firstElementChild.innerText = calculatePayoffDate();
document.getElementById('total-count').firstElementChild.innerText = purchases.totalCount.toFixed(0);
document.getElementById('unique-count').firstElementChild.innerText = [...new Set(purchases.purchaseList)].length.toFixed(0);
document.getElementById('total-oz').firstElementChild.innerText = purchases.totalOz.toFixed(0);
document.getElementById('information').innerHTML = `After an initial investment in the <a href="https://www.halcyonbrewingco.com/online-store">Halcyon Brewing Founding Lagers</a>, each purchase is discounted. Currently saved <strong>$${
  purchases.investmentTotal
}</strong> from <strong>${purchases.totalCount.toFixed(0)} beers</strong> leaving <strong>$${GLOBAL.INVESTMENT_TOTAL - purchases.investmentTotal}</strong> remaining to break even!`;
