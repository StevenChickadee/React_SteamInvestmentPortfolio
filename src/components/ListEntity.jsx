//Imports
import React from 'react';

//components
import DisplayItem from './DisplayItem/DisplayItem';
import DisplayPrice from './DisplayPrice/DisplayPrice';

function ListEntity({ listEntity, editListEntity, deleteListEntity, sellListEntity }) {

    //JSX
    return (
        <li>
            <form className="listEntity">
                <DisplayItem item={listEntity.item} />
                <DisplayPrice economy={listEntity.economy} date={listEntity.date} note={listEntity.note} />
                <button className="button">Delete</button>
                <button className="button">Sold</button>
            </form>
        </li>
    );
}

export default ListEntity;

