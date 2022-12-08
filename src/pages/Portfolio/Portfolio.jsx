import "./Portfolio.css"

//Imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from "react-query"

//Services
import { API_fetchAllItems } from "../../services/API_items"
import {
  getPortfolioList as tLS_getPortfolioList,
  updatePortfolioList as tLS_updatePortfolioList
} from '../../services/tLS_portfolioList'
import { getTotal as tLS_getTotal } from '../../services/tLS_total';

//Components
import List from '../../components/List';
import DisplayTotal from '../../components/DisplayTotal/DisplayTotal';

function Portfolio() {

  //Hooks
  //States
  const [portfolioList, setPortfolioList] = useState([]) //State with array of items in Portfolio
  const [total, setTotal] = useState(0)

  //Effects
  useEffect(() => {
    setPortfolioList(tLS_getPortfolioList())
    setTotal(tLS_getTotal())
  }, [])

  //Fetch
  const { isError, isSuccess, isLoading, data: API_allItems, error } = useQuery(
    ["allItems"],
    API_fetchAllItems,
    { staleTime: 43200000 } //12 hours
  )
  if (isLoading) {
    console.log("Loading... ")
  }
  if (isError) {
    console.log("Error:" + error)
  }
  if (isSuccess) {
    console.log("Update fetch successful")
    update(tLS_getPortfolioList(), API_allItems.data)
  }


  function update(tLS_portfolioList, API_allItems) {
    if (tLS_portfolioList && API_allItems) {
      tLS_portfolioList.forEach(investment => {
        const newItem = API_allItems.find(item => item.nameID === investment.item.nameID)
        tLS_updatePortfolioList(investment.id, newItem)
      })
      console.log("Update successful")
    }
  }

  //JSX
  return (
    <div className="portfolioWrapper">
      <h1>Portfolio</h1>

      {portfolioList.length > 0 ? (
        <DisplayTotal total={total} />
      ) : null}

      <List list={portfolioList} />
      <Link to="/portfolio/addItem" >+ Add Item</Link>
    </div>
  );
}

export default Portfolio;