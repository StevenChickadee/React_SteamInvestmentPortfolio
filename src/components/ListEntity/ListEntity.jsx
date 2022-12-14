import "./ListEntity.css"

//Imports
import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

//components
import DisplayItem from '../DisplayItem/DisplayItem';
import DisplayPrice from '../DisplayPrice/DisplayPrice';
import DisplayChart from '../DisplayChart/DisplayChart'

//Services
import {
    deleteFromPortfolioList as tLS_deleteFromPortfolioList,
    sellFromPortfolioList as tLS_sellFromPortfolioList,
    editInPortfolioList as tLS_editInPortfolioList
} from '../../services/tLS_portfolioList'


function ListEntity({ listEntity }) {

    const [navigate, setNavigate] = useState(false)

    //Handlers
    function handleClick() {
        setNavigate(true)
    }

    function handleDelete(e) {
        e.preventDefault()
        tLS_deleteFromPortfolioList(listEntity.id)
        window.location.reload(false)
    }

    //TO-DO
    function handleSell(e) {
        /*e.preventDefault()
        tLS_sellFromPortfolioList(listEntity.id)
        window.location.reload(false)*/
    }

    function handleEdit(buyPrice, quantity, goalPrice, note) {
        tLS_editInPortfolioList(listEntity.id, buyPrice, quantity, goalPrice, note)
        window.location.reload(false)
    }

    //JSX
    if (navigate) {
        return (
            <Navigate to={"/portfolio/" + listEntity.id} replace={true} state={listEntity} />
        )
    } else {
        return (
            <li>
                <form className="listEntity" onClick={handleClick}>
                    <DisplayItem item={listEntity.item} />
                    <DisplayChart />
                    <DisplayPrice economy={listEntity.economy} date={listEntity.date} note={listEntity.note} editInList={handleEdit} />
                    <button className="button" onClick={handleDelete}>Delete</button>
                    <button className="button">Sold</button>
                </form>
            </li>
        );
    }
}

export default ListEntity;

