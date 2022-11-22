import React from 'react'
import "./DisplayItem.css"

function DisplayItem({ displayAddItem, item }) {

  if (displayAddItem) {
    return (
      <div className="addItemDisplayDiv" border-color={item.border_color}>
        <div className="addItemDisplay">{item.market_name}</div>
        <img className="addItemDisplayImage" src={item.image} alt="item" />
        <div className="addItemDisplay">{item.prices.safe} $</div>
      </div>
    )
  } else {
    return (
      <div className="displayDiv" border-color={item.border_color}>
        <img className="displayImage" src={item.image} alt="item" />
        <div className="display">{item.market_name}</div>
      </div>
    )
  }
}

export default DisplayItem