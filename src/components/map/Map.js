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
import tippy, { hideAll } from "tippy.js"
import "tippy.js/dist/tippy.css"
import { cancelFetchShopsByBounds } from "../../api/Shop"
import FilterDialog from "./FilterDialog"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import { Close } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%",
    height: "100%"
  },
  progress: {
    position: "fixed",
    zIndex: 9999,
    width: "100%"
  },
  dimmer: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    pointerEvents: "none"
  }
}))

const Map = ({ serviceOpen }) => {
  const [pending, setPending] = useState(true)
  const [shops, setShops] = useState([])
  const [filteredShops, setFilteredShops] = useState([])
  const [kakao] = useState(window.kakao)
  const [map, setMap] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [info, setInfo] = useState("")
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState({})
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const classes = useStyles()
  const debouncedBounds = useDebounce(bounds, 500)

  const getBounds = useCallback(() => {
    return map.getBounds()
  }, [map])

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
        map.setLevel(3)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setError("검색 결과가 없습니다.")
      } else {
        setError("서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
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
          console.log("getLocation", latitude, longitude)
          const moveLatLng = new kakao.maps.LatLng(latitude, longitude)
          map.panTo(moveLatLng)
          setBounds(getBounds())
          setPending(false)
        },
        () => {
          setPending(false)
          setError("내 위치를 불러올 수 없습니다.")
        }
      )
    } else {
      setError("위치를 불러올 수 없습니다.")
    }
  }

  const renew = () => {
    const level = map.getLevel()
    if (level <= 5) {
      setBounds(getBounds())
    }
  }

  const removeAllShopOverlays = () => {
    document.querySelectorAll("[data-shop-code]").forEach(e => e.parentNode.removeChild(e))
  }

  const setShopOverlays = shops =>
    setTimeout(() => {
      hideAll()
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
          position: new kakao.maps.LatLng(lat, lng),
          content: renderToStaticMarkup(<ShopOverlay {...shop} />),
          zIndex: 99999
        })
        overlay.setMap(map)
        tippy("[data-tippy-content]", { allowHTML: true })
      })
    }, 0)

  const handleSearch = searchText => {
    if (searchText) {
      searchPlace(searchText)
    }
  }

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
      if (level <= 5) {
        setBounds(getBounds())
        setInfo("")
      } else {
        removeAllShopOverlays()
        if (cancelFetchShopsByBounds) {
          cancelFetchShopsByBounds()
          setPending(false)
        }
        setInfo("지도를 좀 더 확대해주세요")
      }
    }

    if (map) {
      // 맵 처음 로딩되었을때 위치정보 요청하는 것 제거
      getLocation()
      kakao.maps.event.addListener(map, "tilesloaded", onChange)
      kakao.maps.event.addListener(map, "zoom_start", () => {
        hideAll()
      })
      kakao.maps.event.addListener(map, "dragstart", () => {
        hideAll()
      })
    }
  }, [map])

  useEffect(() => {
    if (bounds) {
      // 남서쪽

      // const swBounds = bounds.getSouthWest()
      // // 북동쪽
      // const neBounds = bounds.getNorthEast()
      //
      // const { Ga: lon1, Ha: lat1 } = swBounds
      // const { Ga: lon2, Ha: lat2 } = neBounds

      const center = map.getCenter()
      const { Ha: lat, Ga: lng } = center
      const level = map.getLevel()
      const radius = (level + 4) ** 2 * 12
      console.log("radius", radius)

      // set dummy data
      // setShopOverlays(dummyShops)

      console.log("center", center)
      if (serviceOpen) {
        setPending(true)
        API.Shop.fetchShopsByBounds(lat, lng, radius)
          .then(response => {
            const shops = response.data.stores
            setShops(shops)
          })
          .catch(thrown => {
            if (!axios.isCancel(thrown)) {
              setError("데이터를 가져오지 못했습니다.")
            }
          })
          .finally(() => {
            setPending(false)
          })
      }
    }
  }, [debouncedBounds])

  useEffect(() => {
    const { hideEmpty } = filter
    console.log("hideEmpty", hideEmpty)
    if (hideEmpty) {
      setFilteredShops(shops.filter(shop => shop.remain_stat && shop.remain_stat !== "empty"))
    } else {
      setFilteredShops(shops)
    }
  }, [filter, shops])

  useEffect(() => {
    console.log("setShopOverlays", filteredShops)
    setShopOverlays(filteredShops)
  }, [filteredShops])

  return (
    <>
      <AppBar onSearch={handleSearch} />
      <Toolbar
        pending={pending}
        onLocationButtonClick={getLocation}
        onRenewButtonClick={renew}
        onFilterButtonClick={() => setFilterDialogOpen(true)}
      />
      {pending && (
        <>
          <LinearProgress color="secondary" className={classes.progress} />
          {/*<div className={classes.dimmer}>*/}
          {/*  <CircularProgress size={50} thickness={5} />*/}
          {/*</div>*/}
        </>
      )}
      {info && <Info message={info} />}
      <FilterDialog
        open={filterDialogOpen}
        onFilterChange={values => setFilter(values)}
        handleClose={() => setFilterDialogOpen(false)}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        message={error}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setError(null)}
            >
              <Close />
            </IconButton>
          </React.Fragment>
        }
      />
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
