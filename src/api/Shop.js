import axios from "axios"

const CancelToken = axios.CancelToken
export let cancelFetchShopsByBounds

export class Shop {
  fetchShopsByBounds(lat1, lat2, lon1, lon2) {
    if (cancelFetchShopsByBounds) {
      cancelFetchShopsByBounds()
    }
    return axios.get(
      `http://api.adrinerdp.co/getSpots?lon1=${lon1}&lon2=${lon2}&lat1=${lat1}&lat2=${lat2}&fbclid=IwAR09XPXYvHaeIZh93DN2I5fUd1vZmFgVj7B0i9bppCxHUfy3Iur7W2b6zEo`,
      {
        cancelToken: new CancelToken(c => {
          cancelFetchShopsByBounds = c
        })
      }
    )
  }
}
