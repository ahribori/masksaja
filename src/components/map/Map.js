import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "../appbar/AppBar"
import Toolbar from "./Toolbar"
import LinearProgress from "@material-ui/core/LinearProgress"

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
  const [map, setMap] = useState(null)
  const kakao = window.kakao
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

  useEffect(() => {
    const container = document.getElementById("map") //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    }

    const map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
    setMap(map)
    setPending(false)
  }, [kakao.maps])

  return (
    <>
      <AppBar onSearch={handleSearch} />
      {!pending && <Toolbar pending={pending} onLocationButtonClick={getLocation} />}
      {pending && <LinearProgress color="secondary" className={classes.progress} />}
      <div id="map" className={classes.map} />
    </>
  )
}

export default Map
