import React, { useCallback, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "../appbar/AppBar"
import Toolbar from "./Toolbar"
import LinearProgress from "@material-ui/core/LinearProgress"
import API from "../../api/API"
import Info from "../info/Info"

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
    if (map) {
      getLocation()
      kakao.maps.event.addListener(map, "idle", function() {
        const level = map.getLevel()
        if (level <= 6) {
          setBounds(getBounds())
          setInfo("")
        } else {
          setInfo("지도를 좀 더 확대해주세요")
        }
      })
    }
  }, [map])

  useEffect(() => {
    if (bounds) {
      // 남서쪽
      const swBounds = bounds.getSouthWest()
      // 북동쪽
      const neBounds = bounds.getNorthEast()

      // const { Ga: lon1, Ha: lat1 } = swBounds
      // const { Ga: lon2, Ha: lat2 } = neBounds

      // API.Shop.fetchShopsByBounds(lat1, lat2, lon1, lon2).then(response => {
      //   console.log(response)
      // })
    }
  }, [bounds])

  return (
    <>
      <AppBar onSearch={handleSearch} />
      {!pending && <Toolbar pending={pending} onLocationButtonClick={getLocation} />}
      {pending && <LinearProgress color="secondary" className={classes.progress} />}
      {info && <Info message={info} />}
      <div id="map" className={classes.map} />
    </>
  )
}

export default Map
