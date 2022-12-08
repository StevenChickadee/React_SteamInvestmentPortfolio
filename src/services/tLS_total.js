//Keys
const LOCAL_STORAGE_KEY_TOTAL = "steamPortfolioApp_total"

//Calculates total earnings
export function calculateTotal(portfolioList) {

    //Inititate total object
    let total = {
        totalValueInvested: 0,
        totalWorthNow: 0,
        totalIncreaseDecrease: 0,
        totalPercentage: 0,
        //TO-DO % with fees
        momentaryValueInvested: 0,
        momentaryWorthNow: 0,
        momentaryIncreaseDecrease: 0,
        momentaryPercentage: 0
        //TO-DO % with fees
    }

    //Go thru list and calculate total earnings
    if (portfolioList.length > 0) {
        let buyPrice = 0
        let nowPrice = 0

        portfolioList.forEach(investment => {
            buyPrice += investment.economy.buyPrice * investment.economy.quantity
            nowPrice += investment.economy.nowPrice * investment.economy.quantity
        });

        total.totalValueInvested = buyPrice
        total.totalWorthNow = nowPrice
        total.totalIncreaseDecrease = nowPrice - buyPrice
        total.totalPercentage = total.totalIncreaseDecrease / total.totalValueInvested * 100
        //TO-DO % with fees
        total.momentaryValueInvested = buyPrice
        total.momentaryWorthNow = nowPrice
        total.momentaryIncreaseDecrease = nowPrice - buyPrice
        total.momentaryPercentage = total.momentaryIncreaseDecrease / total.momentaryValueInvested * 100
        //TO-DO % with fees
    }

    //Set total to LOCAL STORAGE
    setTotal(total)
}

//TO-DO
export function sellTotal() {

}

export function getTotal() {
    const returnedPortfolioList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TOTAL))
    return returnedPortfolioList ?? ({})
}

export function setTotal(total) {
    localStorage.setItem(LOCAL_STORAGE_KEY_TOTAL, JSON.stringify(total))
}