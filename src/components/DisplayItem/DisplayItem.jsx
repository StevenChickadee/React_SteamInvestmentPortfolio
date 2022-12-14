import "./DisplayItem.css"

import React, { useState, useEffect } from 'react'


function DisplayItem({ displayBig, item }) {

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


  if (displayBig) {
    return (
      <div className="bigItemDisplayWrapper" style={{"borderColor": checkBorderColor(item.border_color)}}>
        <div className="bigItemDisplay">{item.market_name}</div>
        <img className="bigItemDisplayImage" src={item.image} alt="item" />
        <div className="bigItemDisplayPrice">{nowPrice} $</div>
      </div>
    )
  } else {
    return (
      <div className="itemDisplayWrapper" style={{"borderColor": checkBorderColor(item.border_color)}}>
        <img className="itemDisplayImage" src={item.image} alt="item" />
        <div className="itemDisplay">{item.market_name}</div>
      </div>
    )
  }
}

export default DisplayItem


function checkBorderColor(border_color){
  if(border_color.charAt(0) !== "#"){
    return "#" + border_color
  }
  return border_color
}