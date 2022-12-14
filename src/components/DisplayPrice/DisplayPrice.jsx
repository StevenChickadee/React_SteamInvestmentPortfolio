import "./DisplayPrice.css"

import React, { useState } from 'react'

function DisplayPrice({ displayAddItem, economy, date, note, addToList, editInList }) {
  //Hooks
  //States
  const [buyPriceEdit, setBuyPriceEdit] = useState(displayAddItem ? 0 : economy.buyPrice)
  const [quantityEdit, setQuantityEdit] = useState(displayAddItem ? 1 : economy.quantity)
  const [goalPriceEdit, setGoalPriceEdit] = useState(displayAddItem ? 0 : economy.goalPrice)
  const [dateEdit, setDateEdit] = useState(displayAddItem ? new Date() : date)
  const [noteEdit, setNoteEdit] = useState(displayAddItem ? "" : note)

  const [readOnly, setReadOnly] = useState(true)

  //Handlers
  function handleBuyPriceEdit(e) {
    setBuyPriceEdit(e.target.value)
  }
  function handleQuantityEdit(e) {
    setQuantityEdit(e.target.value)
  }
  function handleGoalPriceEdit(e) {
    setGoalPriceEdit(e.target.value)
  }
  function handleNoteEdit(e) {
    setNoteEdit(e.target.value)
  }
  function handleDateEdit(e) {
    setDateEdit(e.target.value)
  }
  function handleAddItem(e) {
    e.preventDefault()
    if (checkInputs(buyPriceEdit, quantityEdit, goalPriceEdit)) {
      addToList(buyPriceEdit, quantityEdit, goalPriceEdit, dateEdit, noteEdit)
    }
  }
  function handleReadOnly(e) {
    e.preventDefault()
    if (!readOnly) {
      if (checkInputs(buyPriceEdit, quantityEdit, goalPriceEdit)) {
        editInList(buyPriceEdit, quantityEdit, goalPriceEdit, noteEdit)
      }
    }
    setReadOnly(!readOnly)
  }

  //Help functions
  function checkInputs(buyPrice, quantity, goalPrice) {
    if (isNumber(buyPrice) && isNumber(quantity) && isNumber(goalPrice) && buyPrice >= 0 && quantity > 0 && goalPrice >= 0) {
      return true
    }
    return false
  }
  function isNumber(input) {
    if (typeof input === "string" && input.trim() === "") {
      return false
    }
    return !isNaN(input)
  }

  const display = displayAddItem ? "addPriceDisplay" : "priceDisplay"
  const displayEditable = displayAddItem ? "addPriceDisplayEditable" : "priceDisplayEditable"

  if (displayAddItem) {
    return (
      <div className="addPriceDisplayWrapper">
        <input className={displayEditable} onChange={handleBuyPriceEdit} type="text" placeholder="Buy Price" />
        <input className={displayEditable} onChange={handleQuantityEdit} type="text" placeholder="Quantity" />
        <input className={displayEditable} onChange={handleGoalPriceEdit} type="text" placeholder="Price Goal" />
        <input className={displayEditable} onChange={handleDateEdit} type="date" />
        <input className={displayEditable} onChange={handleNoteEdit} type="text" placeholder="Note" />
        <button className="priceDisplaybutton" onClick={handleAddItem}>Add Item</button>
      </div>
    )
  } else {
    return (
      <div className="priceDisplayWrapper">
        <input className={displayEditable} onChange={handleBuyPriceEdit} type="text" value={buyPriceEdit} readOnly={readOnly} />
        <input className={displayEditable} onChange={handleQuantityEdit} type="text" value={quantityEdit} readOnly={readOnly} />
        <input className={displayEditable} onChange={handleGoalPriceEdit} type="text" value={goalPriceEdit} readOnly={readOnly} />
        <div className={display}>TotalInvested: {economy.totalPrice.toFixed(2)} $</div>
        {economy.quantity === 1 ? (
          <div>
            <div className={display}>NowPrice: {economy.nowPrice.toFixed(2)} $</div>
            <div className={display}>2Goal: {economy.toGoalTotal.toFixed(2)} $</div>
          </div>
        ) : null}
        {economy.quantity > 1 ? (
          <div>
            <div className={display}>NowPrice/Piece: {economy.nowPrice.toFixed(2)} $</div>
            <div className={display}>NowPrice/Total: {economy.totalNowPrice.toFixed(2)} $</div>
            <div className={display}>2Goal/Piece: {economy.toGoalPiece.toFixed(2)} $</div>
            <div className={display}>2Goal/Total: {economy.toGoalTotal.toFixed(2)} $</div>
          </div>
        ) : null}
        <div className={display}>Date of purchase: {date}</div>
        <input className={displayEditable} onChange={handleNoteEdit} type="text" value={noteEdit} readOnly={readOnly} />
        <button className="priceDisplaybutton" onClick={handleReadOnly}>Edit</button>
      </div>
    )
  }

}

export default DisplayPrice