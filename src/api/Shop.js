import axios from "axios"

export class Shop {
  fetchShopsByBounds(lat1, lat2, lon1, lon2) {
    return axios.get(
      `http://api.adrinerdp.co/getSpots?lon1=${lon1}&lon2=${lon2}&lat1=${lat1}&lat2=${lat2}&fbclid=IwAR09XPXYvHaeIZh93DN2I5fUd1vZmFgVj7B0i9bppCxHUfy3Iur7W2b6zEo`
    )
  }
}
