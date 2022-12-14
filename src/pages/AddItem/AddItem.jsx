import "./AddItem.css"

//Imports
import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { useQuery } from "react-query"

//Services
import { API_fetchAllItems } from "../../services/API_items"
import { addToPortfolioList as tLS_addToPortfolioList } from '../../services/tLS_portfolioList'

//Components
import SearchBar from "../../components/SearchBar/SearchBar"
import DisplayItem from "../../components/DisplayItem/DisplayItem"
import DisplayPrice from "../../components/DisplayPrice/DisplayPrice"

function AddItem() {

    //Hooks
    //States
    const [item, setItem] = useState(null)
    const [navigate, setNavigate] = useState(false)


    //Fetch
    const { isError, isSuccess, isLoading, data: API_allItems, error } = useQuery(
        ["allItems"],
        API_fetchAllItems,
        { staleTime: 43200000 } //12 hours

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

    function addToList(buyPrice, quantity, goalPrice, date, note) {
        tLS_addToPortfolioList(item, buyPrice, quantity, goalPrice, date, note)
        setNavigate(true);
    }

    //JSX
    if (navigate) {
        return (
            <Navigate to="/portfolio" replace={true} />
        )
    } else {
        return (
            <div className="addItemWrapper">
                <h1>Add Item</h1>

                {API_allItems ? (
                    <SearchBar placeholder={"Search items..."} data={API_allItems.data} setItemWithClickedItem={(item) => setItemWithClickedItem(item)} />
                ) : null}

                {item ? (
                    <div>
                        <DisplayItem displayBig={true} item={item} />
                        <DisplayPrice displayAddItem={true} addToList={addToList} />
                    </div>
                ) : null}

                <Link to="/portfolio">X Back</Link>
            </div>
        )
    }
}

export default AddItem