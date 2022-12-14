//Package import
import { v4 as uuidv4 } from 'uuid'

import { calculateTotal } from './tLS_total'

//Keys
const LOCAL_STORAGE_KEY_PORTFOLIOLIST = "steamPortfolioApp_portfolioList"


export function addToPortfolioList(item, buyPrice, quantity, goalPrice, /*TO-DO fee,*/ date, note) {

    //Gets portfolioList from LOCAL STORAGE
    let portfolioList = getPortfolioList()

    //Format date input
    const dateForm = formatDate( new Date(date))

    //Parse inputs into float
    const buyPricePar = parseFloat(buyPrice)
    const quantityPar = parseFloat(quantity)
    const goalPricePar = parseFloat(goalPrice)

    //Gets newest price data
    const nowPricePar = getNewestPriceData(item)

    //Create economy object and calculate all variables
    const economy = {
        buyPrice: buyPricePar,
        quantity: quantityPar,
        goalPrice: goalPricePar,
        totalPrice: buyPricePar * quantityPar,
        nowPrice: nowPricePar,
        totalNowPrice: nowPricePar * quantityPar,
        toGoalPiece: goalPricePar - nowPricePar,
        toGoalTotal: (goalPricePar * quantityPar) - (nowPricePar * quantityPar)
        //TO-DO
        //percentage: 
        //increaseDecrease:
        //increaseDecreaseAfterFees: 
    }

    //Create price history
    const history = [
        { date: dateForm, price: buyPricePar }
    ]

    //Add into list
    if (portfolioList) {
        portfolioList = [
            ...portfolioList,
            { id: uuidv4(), item: item, economy: economy, history: history, date: dateForm, note: note }]
    } else {
        portfolioList = [{ id: uuidv4(), item: item, economy: economy, history: history, date: dateForm, note: note }]
    }

    //Calculates total earnings
    calculateTotal(portfolioList)
    //Send to LOCAL STORAGE
    setPortfolioList(portfolioList)
}

export function editInPortfolioList(id, buyPrice, quantity, goalPrice, note) {
    //Gets portfolioList from LOCAL STORAGE
    let portfolioList = getPortfolioList()

    //Parse inputs into float
    const buyPricePar = parseFloat(buyPrice)
    const quantityPar = parseFloat(quantity)
    const goalPricePar = parseFloat(goalPrice)

    if (portfolioList) {
        portfolioList.forEach(investment => {
            if (investment.id === id) {
                investment.economy.buyPrice = buyPricePar
                investment.economy.quantity = quantityPar
                investment.economy.goalPrice = goalPricePar
                investment.note = note
                investment.history[0].price = buyPricePar
            }
        })
    }

    //Calculates total earnings
    calculateTotal(portfolioList)
    //Send to LOCAL STORAGE
    setPortfolioList(portfolioList)
}

export function updatePortfolioList(id, item) {
    //Gets portfolioList from LOCAL STORAGE
    let portfolioList = getPortfolioList()

    //Gets newest price data
    const nowPricePar = getNewestPriceData(item)

    if (portfolioList) {
        portfolioList.forEach(investment => {
            if (investment.id === id) {
                investment.economy.nowPrice = nowPricePar
                investment.economy.totalNowPrice = nowPricePar * investment.economy.quantity
                investment.economy.toGoalPiece = investment.economy.goalPrice - nowPricePar
                investment.economy.toGoalTotal = (investment.economy.goalPrice * investment.economy.quantity) - (nowPricePar * investment.economy.quantity)

                const lastHistoryElem = investment.history[investment.history.length - 1]

                //If last entry in history array is older then 24 HOURS, add new entry
                if (isOlderThan24Hours(lastHistoryElem.date)) {
                    investment.history.push({ date: formatDate(new Date()), price: nowPricePar })
                }
            }
        })
    }


    //Calculates total earnings
    calculateTotal(portfolioList)
    //Send to LOCAL STORAGE
    setPortfolioList(portfolioList)
}

export function deleteFromPortfolioList(id) {

    //Gets portfolioList from LOCAL STORAGE
    let portfolioList = getPortfolioList()

    if (portfolioList) {
        portfolioList = portfolioList.filter(investment => investment.id !== id)
    }

    //Calculates total earnings
    calculateTotal(portfolioList)
    //Send to LOCAL STORAGE
    setPortfolioList(portfolioList)
}

//TO-DO
export function sellFromPortfolioList(id) {

}

export function getPortfolioList() {
    const returnedPortfolioList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PORTFOLIOLIST))
    return returnedPortfolioList ?? ([])
}

export function setPortfolioList(portfolioList) {
    localStorage.setItem(LOCAL_STORAGE_KEY_PORTFOLIOLIST, JSON.stringify(portfolioList))
}

//TO-DO
//Formats date into DD/MM/YYYY standard
function formatDate(date) {
    return date.toUTCString()
}

function isOlderThan24Hours(date) {
    //Date consts
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1)

    return (twentyFourHoursAgo > new Date(date))
}

function getNewestPriceData(item) {
    if (parseFloat(item.prices.safe_ts.last_24h) > 0) {
        return parseFloat(item.prices.safe_ts.last_24h)
    } else if (parseFloat(item.prices.safe_ts.last_7d) > 0) {
        return parseFloat(item.prices.safe_ts.last_7d)
    } else if (parseFloat(item.prices.safe_ts.last_30d) > 0) {
        return parseFloat(item.prices.safe_ts.last_30d)
    } else if (parseFloat(item.prices.safe_ts.last_90d) > 0) {
        return parseFloat(item.prices.safe_ts.last_90d)
    }
        return parseFloat(item.prices.safe)
}