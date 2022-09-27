import { GLOBAL } from './data/global';
import { BEERS } from './data/beers';
import { PURCHASES } from './data/purchases';
import { OPTIONS } from './chart/options';
import { beerColors } from './chart/colors';

let purchaseData = {
  investmentTotal: 0,
  totalCount: 0,
  purchaseList: [],
  totalOz: 0,
  purchaseData: [],
};

let beerData = {};

let drinkingData = {
  wetDays: 0,
  dryDays: 0,
};

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

    purchaseData.investmentTotal += element.discount || GLOBAL.DEFAULT_DISCOUNT;
    purchaseData.totalCount++;
    purchaseData.totalOz += element.oz || GLOBAL.DEFAULT_OZ;
    purchaseData.purchaseList.push(beer ? beer.name : element.beer);

    return {
      x: element.date,
      y: purchaseData.investmentTotal,
    };
  });

  purchaseData.purchaseData = founded.concat(dataset);
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
 * Calculates (actually just returns) the investment date
 * @returns investment date
 */
function calculateInvestmentDate() {
  const investmentDate = new Date(GLOBAL.FOUNDED_DATE);
  return investmentDate.toDateString();
}

/**
 * Calculates the anticipated payoff date based on amount spent over the current time
 * @returns estimated payoff date
 */
function calculatePayoffDate() {
  const ticksSinceFounded = new Date() - new Date(GLOBAL.FOUNDED_DATE);
  const dollarsSinceFounded = purchaseData.investmentTotal;
  const ticksPerDollar = ticksSinceFounded / dollarsSinceFounded;

  const ticksPayoff = ticksPerDollar * GLOBAL.INVESTMENT_TOTAL;
  const payoffDate = new Date(+new Date(GLOBAL.FOUNDED_DATE) + ticksPayoff);

  return payoffDate.toDateString();
}

/**
 * Calculates the number of days between membership date and today
 * @returns number of days as a member
 */
function calculateDaysInvested() {
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const diff = new Date().getTime() - new Date(GLOBAL.FOUNDED_DATE).getTime();

  return (diff / millisecondsInDay).toFixed(0);
}

/**
 * Calculates the percentage paid off to the final amount
 * @returns percent paid off, by amount
 */
function calculatePercentPaidOff() {
  return ((purchaseData.investmentTotal / GLOBAL.INVESTMENT_TOTAL) * 100).toFixed(1) + '%';
}

/**
 * Calculate number of wet vs dry days
 * @returns updated drinkingData object
 */
function calculateStreaks() {
  const startDate = new Date(GLOBAL.FOUNDED_DATE);
  const today = new Date();
  let tempDate = startDate;

  while (tempDate.toDateString() !== today.toDateString()) {
    let isMatch = !!PURCHASES.filter((item) => {
      return new Date(item.date).toDateString() == tempDate.toDateString();
    }).length;

    if (isMatch) {
      drinkingData.wetDays++;
    } else {
      drinkingData.dryDays++;
    }

    tempDate.setDate(tempDate.getDate() + 1);
  }

  return drinkingData;
}

generatePurchasesDataset();
generateBeerDataset();
calculateStreaks();

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
        data: purchaseData.purchaseData,
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
        barThickness: 'flex',
        borderColor: '#100c00',
        borderWidth: 1,
      },
    ],
  },
  options: OPTIONS.BEER_CHART,
});

/**
 * Set the value of a DOM element
 * @param {string} id DOM id
 * @param {string} val value to set to the DOM element
 */
function setDOM(id, val) {
  document.getElementById(id).firstElementChild.innerText = val;
}

// Update visual beer data
setDOM('investment-date', calculateInvestmentDate());
setDOM('days-invested', calculateDaysInvested());
setDOM('payoff-percent', calculatePercentPaidOff());
setDOM('payoff-date', calculatePayoffDate());

// Update visual beer data
setDOM('total-count', purchaseData.totalCount.toFixed(0));
setDOM('unique-count', [...new Set(purchaseData.purchaseList)].length.toFixed(0));
setDOM('total-oz', purchaseData.totalOz.toFixed(1));
document.getElementById('information').innerHTML = `After an initial investment in the <a href="https://www.halcyonbrewingco.com/online-store">Halcyon Brewing Founding Lagers</a>, each purchase is discounted. Currently saved <strong>$${
  purchaseData.investmentTotal
}</strong> from <strong>${purchaseData.totalCount.toFixed(0)} beers</strong> leaving <strong>$${GLOBAL.INVESTMENT_TOTAL - purchaseData.investmentTotal}</strong> remaining to break even!`;

// Update visual drinking data
setDOM('wet-days', drinkingData.wetDays.toFixed(0));
setDOM('dry-days', drinkingData.dryDays.toFixed(0));
