//Imports
import React, { useState } from "react"

//CSS
import "./SearchBar.css"
//import SearchIcon from "@material-ui/icons/Search"
//import CloseIcon from "@material-ui/icons/Close"

function SearchBar({ placeholder, data, setItemWithClickedItem }) {
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    function handleFilter(event) {
        const searchWord = event.target.value
        setWordEntered(searchWord)
        const newFilter = data.filter((item) => {
            //TO-DO make fuzzy search
            return item.market_name.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    function handleItemClick(item) {
        setItemWithClickedItem(item)
        clearInput()
    }

    function clearInput() {
        setFilteredData([])
        setWordEntered("")
    }



    return (
        <div className="search">
            <div className="searchInputs">
                <input value={wordEntered} onChange={handleFilter} type="text" placeholder={placeholder} />
                <div className="searchIcon">
                    {wordEntered.length === 0 ? (<div>?</div>) : (<div id="clearButton" onClick={clearInput}>X</div>)}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <ul className="searchResult">
                    {filteredData.slice(0, 15).map((item, key) => {
                        return (
                            <li className="searchResultItem" key={key} onClick={() => handleItemClick(item)}>
                                {item.market_name}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default SearchBar