import React, { useCallback, useEffect, useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "../appbar/AppBar"
import Toolbar from "./Toolbar"
import LinearProgress from "@material-ui/core/LinearProgress"
import API from "../../api/API"
import Info from "../info/Info"
import ShopOverlay from "./ShopOverlay"
import axios from "axios"
import tippy from "tippy.js"
import "tippy.js/dist/tippy.css"

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%",
    height: "100%"
  },
  progress: {
    position: "fixed",
    zIndex: 9999,
    width: "100%",
    top: 56,
    [theme.breakpoints.up("sm")]: {
      top: 64
    }
  }
}))

const Map = () => {
  const [pending, setPending] = useState(true)
  const [kakao] = useState(window.kakao)
  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [info, setInfo] = useState("")
  const classes = useStyles()
  const debouncedBounds = useDebounce(bounds, 300)

  /**
   * 장소 검색
   * @param keyword 검색어
   */
  const searchPlace = keyword => {
    setPending(true)
    const places = new kakao.maps.services.Places()
    places.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const firstItem = result[0]
        const { x, y } = firstItem
        const moveLatLng = new kakao.maps.LatLng(y, x)
        map.panTo(moveLatLng)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.")
      } else {
        alert("서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
      }
      setPending(false)
    })
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      setPending(true)
      navigator.geolocation.getCurrentPosition(
        position => {
          const { coords } = position
          const { latitude, longitude } = coords
          const moveLatLng = new kakao.maps.LatLng(latitude, longitude)
          map.panTo(moveLatLng)
          setBounds(getBounds())
          setPending(false)
        },
        () => {
          setPending(false)
        }
      )
    } else {
      setPending(false)
    }
  }

  const removeAllShopOverlays = () =>
    document.querySelectorAll("[data-shop-code]").forEach(e => e.parentNode.removeChild(e))

  const setShopOverlays = shops => {
    removeAllShopOverlays()
    shops.forEach(shop => {
      const {
        // code, // 판매기관코드
        // name, // 판매기관명
        // type, // 판매처 유형 (약국: 01, 우체국: 02, 농협: 03)
        // addr, // 주소
        // tel, // 연락처
        // stock_d, // 입고일
        // stock_t, // 입고시간
        // stock_cnt, // 입고수량
        // sold_cnt, // 판매수량
        // remain_cnt, // 잔고수량
        // sold_out, // 완판여부
        lat, // 위도
        lng // 경도
      } = shop

      const overlay = new kakao.maps.CustomOverlay({
        map,
        clickable: true,
        position: new kakao.maps.LatLng(lng, lat),
        content: renderToStaticMarkup(<ShopOverlay {...shop} />),
        zIndex: 99999
      })
      overlay.setMap(map)
    })
  }

  const handleSearch = searchText => {
    if (searchText) {
      searchPlace(searchText)
    }
  }

  const getBounds = useCallback(() => {
    return map.getBounds()
  }, [map])

  useEffect(() => {
    const container = document.getElementById("map") //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.4019528117587, 127.10828323199647), //지도의 중심좌표.
      level: 5 //지도의 레벨(확대, 축소 정도)
    }

    const map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
    setMap(map)
    setPending(false)
  }, [kakao.maps])

  useEffect(() => {
    const onChange = function() {
      const level = map.getLevel()
      if (level <= 6) {
        setBounds(getBounds())
        setInfo("")
      } else {
        removeAllShopOverlays()
        setInfo("지도를 좀 더 확대해주세요")
      }
    }

    if (map) {
      getLocation()
      kakao.maps.event.addListener(map, "zoom_changed", onChange)
      kakao.maps.event.addListener(map, "center_changed", onChange)
    }
  }, [map])

  useEffect(() => {
    if (bounds) {
      // 남서쪽
      const swBounds = bounds.getSouthWest()
      // 북동쪽
      const neBounds = bounds.getNorthEast()

      const { Ga: lon1, Ha: lat1 } = swBounds
      const { Ga: lon2, Ha: lat2 } = neBounds

      setPending(true)
      API.Shop.fetchShopsByBounds(lat1, lat2, lon1, lon2)
        .then(response => {
          const shops = response.data
          setShopOverlays(shops)
          setPending(false)
        })
        .catch(thrown => {
          if (!axios.isCancel(thrown)) {
            setPending(false)
          }
        })
    }
  }, [debouncedBounds])

  return (
    <>
      <AppBar onSearch={handleSearch} />
      <Toolbar pending={pending} onLocationButtonClick={getLocation} />
      {pending && <LinearProgress color="secondary" className={classes.progress} />}
      {info && <Info message={info} />}
      <div id="map" className={classes.map} />
    </>
  )
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
export default Map
