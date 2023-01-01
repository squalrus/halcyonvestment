/**
 * Calculates (actually just returns) the investment date
 * @returns investment date
 */
function calculateInvestmentDate(foundedDate) {
    const investmentDate = new Date(foundedDate);
    return investmentDate.toDateString();
}

/**
 * Calculates the number of days between membership date and today
 * @returns number of days as a member
 */
function calculateDaysInvested(foundedDate) {
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const diff = new Date().getTime() - new Date(foundedDate).getTime();

    return (diff / millisecondsInDay).toFixed(0);
}

/**
 * Calculates the percentage paid off to the final amount
 * @returns percent paid off, by amount
 */
function calculatePercentPaidOff(purchaseTotal, investmentTotal) {
    return ((purchaseTotal / investmentTotal) * 100).toFixed(1) + '%';
}

/**
 * Calculates the anticipated payoff date based on amount spent over the current time
 * @returns estimated payoff date
 */
function calculatePayoffDate(foundedDate, investmentTotal, payoffTotal) {
    const ticksSinceFounded = new Date() - new Date(foundedDate);
    const dollarsSinceFounded = investmentTotal;
    const ticksPerDollar = ticksSinceFounded / dollarsSinceFounded;

    const ticksPayoff = ticksPerDollar * payoffTotal;
    const payoffDate = new Date(+new Date(foundedDate) + ticksPayoff);

    return payoffDate.toDateString();
}

/**
 * Calculate number of wet days
 * @returns updated drinkingData object
 */
function calculateWetDays(foundedDate, purchases) {
    let wetDays = 0;
    const startDate = new Date(foundedDate);
    const today = new Date();
    let tempDate = startDate;

    while (tempDate.toDateString() !== today.toDateString()) {
        let isMatch = !!purchases.filter((item) => {
            return new Date(item.date).toDateString() == tempDate.toDateString();
        }).length;

        if (isMatch) {
            wetDays++;
        }

        tempDate.setDate(tempDate.getDate() + 1);
    }

    return wetDays;
}

/**
 * Calculate number of dry days
 * @returns updated drinkingData object
 */
function calculateDryDays(foundedDate, purchases) {
    let dryDays = 0;
    const startDate = new Date(foundedDate);
    const today = new Date();
    let tempDate = startDate;

    while (tempDate.toDateString() !== today.toDateString()) {
        let isMatch = !!purchases.filter((item) => {
            return new Date(item.date).toDateString() == tempDate.toDateString();
        }).length;

        if (!isMatch) {
            dryDays++;
        }

        tempDate.setDate(tempDate.getDate() + 1);
    }

    return dryDays;
}

export { calculateInvestmentDate, calculateDaysInvested, calculatePercentPaidOff, calculatePayoffDate, calculateWetDays, calculateDryDays };
