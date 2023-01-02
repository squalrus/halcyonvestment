import React from 'react';

function Overview(props) {
    const spent = `$${props.transactions.purchaseTotal.toFixed(2)}`;
    const count = props.transactions.totalCount;
    const remaining = `$${(props.founder.INVESTMENT_TOTAL - props.transactions.purchaseTotal).toFixed(2)}`;

    return (
        <div className="section">
            <p>
                After an initial investment in the <a href="https://www.halcyonbrewingco.com/online-store">Halcyon Brewing Founding Lagers</a>, each purchase is discounted. Currently saved <strong>{spent}</strong> from <strong>{count} beers</strong>{' '}
                leaving <strong>{remaining}</strong> remaining to break even!
            </p>
        </div>
    );
}

export default Overview;
