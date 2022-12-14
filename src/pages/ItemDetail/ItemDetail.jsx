import "./ItemDetail.css"

//Imports
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

//components
import DisplayItem from '../../components/DisplayItem/DisplayItem'
import DisplayPrice from '../../components/DisplayPrice/DisplayPrice'
import DisplayChart from '../../components/DisplayChart/DisplayChart'

function ItemDetail() {
    //Hooks
    //States
    const [item, setItem] = useState(null)
    const location = useLocation()

    useEffect(() => {
        setItem(location.state)
    }, [])

    if (item) {
        return (
            <div className="itemDetailWrapper">
                <h1>Item Detail</h1>
                <DisplayItem displayBig={true} item={item.item} />
                <DisplayChart />
                <DisplayPrice economy={item.economy} date={item.date} note={item.note} />
                <Link to="/portfolio">X Back</Link>
            </div>
        )
    } else {
        <div>Loading...</div>
    }
}

export default ItemDetail