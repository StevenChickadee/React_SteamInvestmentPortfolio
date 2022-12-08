import "./DisplayItem.css"

import React, { useState, useEffect } from 'react'


function DisplayItem({ displayAddItem, item }) {

  const [nowPrice, setNowPrice] = useState(0)

  useEffect(() => {
    //Gets newest price data
    if (parseFloat(item.prices.safe_ts.last_24h) > 0) {
      setNowPrice(parseFloat(item.prices.safe_ts.last_24h))
    } else if (parseFloat(item.prices.safe_ts.last_7d) > 0) {
      setNowPrice(parseFloat(item.prices.safe_ts.last_7d))
    } else if (parseFloat(item.prices.safe_ts.last_30d) > 0) {
      setNowPrice(parseFloat(item.prices.safe_ts.last_30d))
    } else if (parseFloat(item.prices.safe_ts.last_90d) > 0) {
      setNowPrice(parseFloat(item.prices.safe_ts.last_90d))
    } else {
      setNowPrice(parseFloat(item.prices.safe))
    }
  }, [])

  //TO-DO border color
  if (displayAddItem) {
    return (
      <div className="addItemDisplayWrapper" border-color={item.border_color}>
        <div className="addItemDisplay">{item.market_name}</div>
        <img className="addItemDisplayImage" src={item.image} alt="item" />
        <div className="addItemDisplayPrice">{nowPrice} $</div>
      </div>
    )
  } else {
    return (
      <div className="itemDisplayWrapper" border-color={item.border_color}>
        <img className="itemDisplayImage" src={item.image} alt="item" />
        <div className="itemDisplay">{item.market_name}</div>
      </div>
    )
  }
}

export default DisplayItem