import axios from "axios"

export async function API_fetchAllItems(){
    const response = await axios.get("https://api.steamapis.com/market/items/730?api_key=4kciv3gXxssXtp1iTH7uWU24Bmk") 
    const allItems = response.data
    return allItems
}

/*export async function API_fetchItem(market_hash_name){
    const response = await axios.get("https://api.steamapis.com/market/items/730?" + market_hash_name + "?api_key=4kciv3gXxssXtp1iTH7uWU24Bmk") 
    const itemPrice = response.data
    console.log("response: " + response)
    console.log("response.data: " + response.data)
    console.log("response.data.median_avg_prices_15days: " + response.data.median_avg_prices_15days)
    //return itemPrice
}*/