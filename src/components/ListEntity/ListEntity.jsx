import "./ListEntity.css"

//Imports
import React from 'react';

//components
import DisplayItem from '../DisplayItem/DisplayItem';
import DisplayPrice from '../DisplayPrice/DisplayPrice';

//Services
import { 
    deleteFromPortfolioList as tLS_deleteFromPortfolioList, 
    sellFromPortfolioList as tLS_sellFromPortfolioList, 
    editInPortfolioList as tLS_editInPortfolioList } from '../../services/tLS_portfolioList'

function ListEntity({ listEntity }) {

    //Handlers
    function handleDelete(e) {
        e.preventDefault()
        tLS_deleteFromPortfolioList(listEntity.id)
        window.location.reload(false)
    }

    function handleSell(e){

    }

    function handleEdit(buyPrice, quantity, goalPrice, note){
        tLS_editInPortfolioList(listEntity.id, buyPrice, quantity, goalPrice, note)
        window.location.reload(false)
    }

    //JSX
    return (
        <li>
            <form className="listEntity">
                <DisplayItem item={listEntity.item} />
                <DisplayPrice economy={listEntity.economy} date={listEntity.date} note={listEntity.note} editInList={handleEdit} />
                <button className="button" onClick={handleDelete}>Delete</button>
                <button className="button">Sold</button>
            </form>
        </li>
    );
}

export default ListEntity;

