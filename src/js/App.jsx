import BeerData from './Data/BeerData';
import BioData from './Data/BioData';
import FounderData from './Data/FounderData';
import { calculateInvestmentDate, calculateDaysInvested, calculatePercentPaidOff, calculatePayoffDate, calculateWetDays, calculateDryDays } from './Helpers/PurchaseHelpers';

import Bio from './Components/Bio';
import ChartBeer from './Components/ChartBeer';
import ChartPurchases from './Components/ChartPurchases';
import Dataset from './Components/Dataset';
import Overview from './Components/Overview';

function App() {
    let transactions = { purchaseTotal: 0, totalCount: 0, totalOz: 0, purchaseList: [] };

    BioData.purchases.map((purchase) => {
        transactions.purchaseTotal += purchase.discount || FounderData.DEFAULT_DISCOUNT;
        transactions.totalCount++;
        transactions.totalOz += purchase.oz || FounderData.DEFAULT_OZ;
        transactions.purchaseList.push(BeerData.GetBeerName(purchase.beer) || purchase.beer);
    });

    const investmentDataset = {
        title: 'Investment details',
        items: [
            {
                label: 'investment date',
                value: calculateInvestmentDate(BioData.foundedDate),
                isSmall: true,
            },
            {
                label: 'days as member',
                value: calculateDaysInvested(BioData.foundedDate),
            },
            {
                label: 'paid off',
                value: calculatePercentPaidOff(transactions.purchaseTotal, FounderData.INVESTMENT_TOTAL),
            },
            {
                label: 'payoff date',
                value: calculatePayoffDate(BioData.foundedDate, transactions.purchaseTotal, FounderData.INVESTMENT_TOTAL),
                isSmall: true,
            },
        ],
    };

    const beerDataset = {
        title: 'Beer details',
        items: [
            {
                label: 'total beers',
                value: transactions.totalCount.toFixed(0),
            },
            {
                label: 'unique beers',
                value: [...new Set(transactions.purchaseList)].length.toFixed(0),
            },
            {
                label: 'total ozs',
                value: transactions.totalOz.toFixed(1),
            },
        ],
    };

    const drinkingDataset = {
        title: 'Drinking details',
        items: [
            { label: 'wet days', value: calculateWetDays(BioData.foundedDate, BioData.purchases) },
            { label: 'dry days', value: calculateDryDays(BioData.foundedDate, BioData.purchases) },
        ],
    };

    return (
        <div class="container">
            <h1>HALCYONvestment</h1>
            <Bio bio={BioData} />
            <Overview founder={FounderData} transactions={transactions} />
            <ChartPurchases />
            <Dataset dataset={investmentDataset} />
            <Dataset dataset={beerDataset} />
            <Dataset dataset={drinkingDataset} />
            <ChartBeer />
        </div>
    );
}

export default App;
