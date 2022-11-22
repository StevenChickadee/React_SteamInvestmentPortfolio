//Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

//Package import
import { v4 as uuidv4 } from 'uuid'

//Components
import List from '../components/List';

function Portfolio() {

  //Hooks
  //States
  const [portfolioList, setPortfolioList] = useState([]) //State with array of items in Portfolio


  //Adds new entity into portfolioList
  function addToPortfolioList(item, buyPrice, quantity, goalPrice, /*TO-DO fee,*/ date, note) { //Adds item with economy into portfolioList state. Unique ID for each item is created | -item: item, economy: {buyPrice, quantity, goalPrice}, history:history[], date:dd/mm/yyy

    //To-DO Fetch data
    //const { data: itemData, loading: API_loading, error: API_error } = useFetch("")

    //TO-DO wait for data from API call
    //useEffect(() => {

    const nowPrice = 100

    const economy = {
      buyPrice: buyPrice,
      quantity: quantity,
      goalPrice: goalPrice,
      totalPrice: buyPrice * quantity,
      nowPrice: nowPrice,
      toGoalPiece: goalPrice - nowPrice,
      toGoalTotal: (goalPrice * quantity) - (nowPrice * quantity)
      //TO-DO
      //percentage: 
      //increaseDecrease:
      //increaseDecreaseAfterFees: 

    }

    const history = [
      { date: formatDate(date), price: buyPrice },
      { date: formatDate(new Date()), price: nowPrice }
    ]


    setPortfolioList([
      ...portfolioList,
      { id: uuidv4(), item: item, economy: economy, history: history, date: date, note: note }])

    //}, [itemData])
  }

  function sellFromPortfolioList() {

  }

  //Deletes entity from portfolioList
  function deleteFromPortfolioList(id) {
    setPortfolioList(portfolioList.filter((entity) => entity.id !== id))
  }

  //Edits economy of specif portfolioList entity
  function editEconomyInPortfolioList(economy, id) {
    setPortfolioList(
      portfolioList.map((entity) => {
        if (entity.id === id) {
          return {
            ...entity,
            economy: economy
          }
        }
        return entity;
      })
    )
  }

  function updatePortfolioList() {

  }

  //Formats date into DD/MM/YYYY standard
  function formatDate(date) {
    return [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getFullYear(),
    ].join('/');
  }

  //JSX
  return (
    <div>
      <h1>Portfolio</h1>
      <List
        list={portfolioList}
        editListEntity={editEconomyInPortfolioList}
        deleteListEntity={deleteFromPortfolioList} />
      <Link to="/portfolio/addItem" >+ Add Item</Link>
    </div>
  );
}

export default Portfolio;