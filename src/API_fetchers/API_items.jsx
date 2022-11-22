import axios from "axios"

export async function fetchAllItems(){
    const response = await axios.get("https://api.steamapis.com/market/items/730?api_key=4kciv3gXxssXtp1iTH7uWU24Bmk") 
    const allItems = response.data
    return allItems
}

/*TO-DO
export async function fetchItem(){
    const response = await axios.get("https://api.steamapis.com/market/items/730?api_key=4kciv3gXxssXtp1iTH7uWU24Bmk") 
    const item = response.data
    return item
}*/