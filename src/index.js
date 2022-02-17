import { INVESTMENT_TOTAL, DEFAULT_DISCOUNT, SPECIALTY_DISCOUNT, FOUNDED_DATE } from './data/variables';
import { BEERS } from './data/beers';
import { PURCHASES } from './data/purchases';

import { OPTIONS } from './chart/options';

let investmentTotal = -INVESTMENT_TOTAL;

function generateDataset() {
  let founded = [{ x: FOUNDED_DATE, y: -INVESTMENT_TOTAL }];

  let dataset = PURCHASES.map(function (element, index) {
    const beer = BEERS.filter((item) => {
      return item.id == element.beer;
    })[0];

    const discount = beer ? beer.discount || DEFAULT_DISCOUNT : DEFAULT_DISCOUNT;
    investmentTotal += discount;

    return {
      x: element.date,
      y: investmentTotal,
    };
  });

  return founded.concat(dataset);
}

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Current Investment',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        fill: true,
        data: generateDataset(),
      },
    ],
  },
  options: OPTIONS,
});

document.getElementById(
  'information'
).innerHTML = `After an initial investment of <strong>$${INVESTMENT_TOTAL}</strong> in the <a href="https://www.halcyonbrewingco.com/online-store">Halcyon Brewing Founding Lagers</a>, each purchase grants <strong>$${DEFAULT_DISCOUNT}</strong> off pint pours and <strong>$${SPECIALTY_DISCOUNT}</strong> off Halcyon specialty pours. Current investment at <strong>$${investmentTotal}</strong>!`;
