import axios from "axios"

const CancelToken = axios.CancelToken
export let cancelFetchShopsByBounds

export class Shop {
  fetchShopsByBounds(lat, lng, radius) {
    if (cancelFetchShopsByBounds) {
      cancelFetchShopsByBounds()
    }
    return axios.get(
      `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${radius}`,
      {
        cancelToken: new CancelToken(c => {
          cancelFetchShopsByBounds = c
        })
      }
    )
  }
}
