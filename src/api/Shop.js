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

export const dummyShops = [
  {
    code: 9999,
    name: "약국이름",
    addr: "약국주소에요 1234",
    lat: 37.40193158922029,
    lng: 127.10356120748075,
    remain_stat: "plenty",
  },
  {
    code: 9141999,
    name: "약국이름",
    addr: "약국주소에요 1234",
    lat: 37.40193158922029,
    lng: 127.09356120748075,
    remain_stat: "some",
  },
  {
    code: 9995395,
    name: "약국이름",
    addr: "약국주소에요 1234",
    lat: 37.40193158922029,
    lng: 127.11356120748075,
    remain_stat: "few",
  },
  {
    code: 9995395,
    name: "약국이름",
    addr: "약국주소에요 1234",
    lat: 37.40413158922029,
    lng: 127.11356120748075,
    remain_stat: "empty",
  }
]
