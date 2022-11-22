//Imports
import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { useQuery } from "react-query"

//Fetchers
import { fetchAllItems } from "../API_fetchers/API_items"

//Components
import SearchBar from "../components/SearchBar/SearchBar"
import DisplayItem from "../components/DisplayItem/DisplayItem"
import DisplayPrice from "../components/DisplayPrice/DisplayPrice"

function AddItem() {

    //Hooks
    //States
    const [item, setItem] = useState(null)


    //Fetch
    const { isError, isSuccess, isLoading, data: API_allItems, error } = useQuery(
        ["allItems"],
        fetchAllItems,
        { staleTime: 1000000 }
    )
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error}</div>
    }

    //Functions
    function setItemWithClickedItem(item) {
        setItem(item)
    }

    function addToPortfolioList(buyPrice, quantity, goalPrice, date, note) {
        //portfolioLocation.state(item, buyPrice, quantity, goalPrice, date, note)
        return (<Navigate to="/portfolio" />)
    }

    //JSX
    return (
        <div>
            <h1>Add Item</h1>

            {API_allItems ? (
                <SearchBar placeholder={"Search items..."} data={API_allItems.data} setItemWithClickedItem={(item) => setItemWithClickedItem(item)} />
            ) : null}

            {item ? (
                <div>
                    <DisplayItem displayAddItem={true} item={item} />
                    <DisplayPrice displayAddItem={true} addToList={addToPortfolioList} />
                </div>
            ) : null}

            <Link to="/portfolio">X</Link>
        </div>
    )
}

export default AddItem