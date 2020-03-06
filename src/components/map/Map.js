import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "../appbar/AppBar"
import Toolbar from "../toolbar/Toolbar"

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%",
    height: "100%"
  }
}))

const Map = () => {
  const classes = useStyles()

  const handleSearch = searchText => {}

  useEffect(() => {
    const kakao = window.kakao
    const container = document.getElementById("map") //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    }

    const map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
  }, [])

  return (
    <>
      <AppBar onSearch={handleSearch} />
      <Toolbar />
      <div id="map" className={classes.map} />
    </>
  )
}

export default Map
