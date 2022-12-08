import React from 'react'

function DisplayTotal({ total }) {
    return (
        <div className="displayTotalWrapper">
            <div className="displayTotal">TotalValueInvested: {total.totalValueInvested.toFixed(2)} $</div>
            <div className="displayTotal">TotalWorthNow: {total.totalWorthNow.toFixed(2)} $</div>
            <div className="displayTotal">Total +-: {total.totalIncreaseDecrease.toFixed(2)} $</div>
            <div className="displayTotal">Total %: {total.totalPercentage.toFixed(2)} %</div>

            <div className="displayTotal">MomentaryValueInvested: {total.momentaryValueInvested.toFixed(2)} $</div>
            <div className="displayTotal">MomentaryWorthNow: {total.momentaryWorthNow.toFixed(2)} $</div>
            <div className="displayTotal">Momentary +-: {total.momentaryIncreaseDecrease.toFixed(2)} $</div>
            <div className="displayTotal">Momentary %: {total.momentaryPercentage.toFixed(2)} %</div>
            
        </div>
    )
}

export default DisplayTotal