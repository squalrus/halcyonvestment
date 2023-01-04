import { HalcyonDefaults, GetBeerName } from './Data/HalcyonData';
import { MemberData } from './Data/MemberData';
import { PurchaseHelper } from './Helpers/PurchaseHelper';

import Bio from './Components/Bio';
import ChartBeer from './Components/ChartBeer';
import ChartPurchases from './Components/ChartPurchases';
import Dataset from './Components/Dataset';
import Overview from './Components/Overview';

function App() {
    let transactions = { purchaseTotal: 0, totalCount: 0, totalOz: 0, purchaseList: [] };
    const Helper = PurchaseHelper();

    MemberData.purchases.map((purchase) => {
        transactions.purchaseTotal += purchase.discount || HalcyonDefaults.DEFAULT_DISCOUNT;
        transactions.totalCount++;
        transactions.totalOz += purchase.oz || HalcyonDefaults.DEFAULT_OZ;
        transactions.purchaseList.push(GetBeerName(purchase.beer) || purchase.beer);
    });

    const investmentDataset = {
        title: 'Investment details',
        items: [
            {
                label: 'investment date',
                value: Helper.FormatDate(MemberData.foundedDate),
                isSmall: true,
            },
            {
                label: 'days as member',
                value: Helper.CalculateDaysInvested(MemberData.foundedDate),
            },
            {
                label: 'paid off',
                value: Helper.CalculatePercentPaidOff(transactions.purchaseTotal, HalcyonDefaults.INVESTMENT_TOTAL),
            },
            {
                label: 'payoff date',
                value: Helper.CalculatePayoffDate(MemberData.foundedDate, transactions.purchaseTotal, HalcyonDefaults.INVESTMENT_TOTAL),
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
            { label: 'wet days', value: Helper.CalculateWetDays(MemberData.foundedDate, MemberData.purchases) },
            { label: 'dry days', value: Helper.CalculateDryDays(MemberData.foundedDate, MemberData.purchases) },
        ],
    };

    return (
        <div class="container">
            <h1>HALCYONvestment</h1>
            <Bio bio={MemberData} />
            <Overview founder={HalcyonDefaults} transactions={transactions} />
            <ChartPurchases />
            <Dataset dataset={investmentDataset} />
            <Dataset dataset={beerDataset} />
            <Dataset dataset={drinkingDataset} />
            <ChartBeer />
        </div>
    );
}

export default App;
