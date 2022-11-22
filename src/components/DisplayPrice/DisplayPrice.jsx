import React, { useState } from 'react'

function DisplayPrice({ displayAddItem, economy, date, note, addToList, updateInList }) {

  //Hooks
  //States
  const [buyPriceEdit, setBuyPriceEdit] = useState(displayAddItem ? 0 : economy.buyPrice)
  const [quantityEdit, setQuantityEdit] = useState(displayAddItem ? 1 : economy.quantity)
  const [goalPriceEdit, setGoalPriceEdit] = useState(displayAddItem ? 0 : economy.goalPrice)
  const [dateEdit, setDateEdit] = useState(new Date())
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
    if (buyPriceEdit >= 0 && quantityEdit > 0 && goalPriceEdit >= 0)
      addToList(buyPriceEdit, quantityEdit, goalPriceEdit, dateEdit, noteEdit)
  }
  function handleReadOnly(e) {
    e.preventDefault()
    setReadOnly(!readOnly)
  }

  if (displayAddItem) {
    return (
      <div className="addItemDisplayDiv">
        <input className="addItemDisplayEditable" onChange={handleBuyPriceEdit} type="text" placeholder="Buy Price" />
        <input className="addItemDisplayEditable" onChange={handleQuantityEdit} type="text" placeholder="Quantity" />
        <input className="addItemDisplayEditable" onChange={handleGoalPriceEdit} type="text" placeholder="Price Goal" />
        <input className="addItemDisplayEditableDate" onChange={handleDateEdit} type="date" placeholder="Date" />
        <input className="addItemDisplayEditable" onChange={handleNoteEdit} type="text" placeholder="Note" />
        <button className="addItemButton" onClick={handleAddItem}>Add Item</button>
      </div>
    )
  } else {
    return (
      <div className="displayDiv">
        <input className="displayEditable" onChange={handleBuyPriceEdit} type="text" placeholder={economy.buyPrice} readOnly={readOnly} />
        <input className="displayEditable" onChange={handleQuantityEdit} type="text" placeholder={economy.quantity} readOnly={readOnly} />
        <input className="displayEditable" onChange={handleGoalPriceEdit} type="text" placeholder={economy.goalPrice} readOnly={readOnly} />
        <div className="display">TP: {economy.totalPrice}</div>
        <div className="display">NP: {economy.nowPrice}</div>
        <div className="display">2Goal/Piece: {economy.toGoalPiece}</div>
        <div className="display">2Goal/Total: {economy.toGoalTotal}</div>
        <div className="display">Date of invest: {date}</div>
        <input className="displayEditable" onChange={handleNoteEdit} type="text" placeholder={note} readOnly={readOnly} />
        <button className="button" onClick={handleReadOnly}>Edit</button>
      </div>
    )
  }
}

export default DisplayPrice