import React, { useEffect, useState } from 'react'

function DisplayPrice({ displayAddItem, economy, date, note, addToList, updateInList }) {

  //Hooks
  //States
  const [buyPriceEdit, setBuyPriceEdit] = useState(economy.buyPrice ?? 0)
  const [quantityEdit, setQuantityEdit] = useState(economy.quantity ?? 1)
  const [goalPriceEdit, setGoalPriceEdit] = useState(economy.goalPrice ?? 0)
  const [dateEdit, setDateEdit] = useState(date ?? new Date())
  const [noteEdit, setNoteEdit] = useState(note ?? "")

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
  const classname = economy.totalPrice ? "display" : "displayEditable"
  return (
    <div className={classname}>
      <input className={classname} onChange={handleBuyPriceEdit} type="text" placeholder="Buy Price" readOnly={readOnly} value={buyPriceEdit} />
      <input className={classname} onChange={handleQuantityEdit} type="text" placeholder="Quantity" readOnly={readOnly} value={quantityEdit} />
      <input className={classname} onChange={handleGoalPriceEdit} type="text" placeholder="Price Goal" readOnly={readOnly} value={goalPriceEdit} />
      {economy.totalPrice && <div className="display">TP: {economy.totalPrice}</div>}
      {economy.nowPrice && <div className="display">NP: {economy.nowPrice}</div>}
      {economy.toGoalPiece && <div className="display">2Goal/Piece: {economy.toGoalPiece}</div>}
      {economy.toGoalTotal && <div className="display">2Goal/Total: {economy.toGoalTotal}</div>}
      {date && <div className="display">Date of invest: {date}</div>}
      <input className={classname} onChange={handleNoteEdit} type="text" placeholder="Note" readOnly={readOnly} value={noteEdit} />
      <button className="button" onClick={handleReadOnly}>{economy.totalPrice ? "Edit" : "Add Item"}</button>
    </div>
  )

}

export default DisplayPrice