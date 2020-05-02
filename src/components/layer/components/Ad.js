import React, { useEffect } from "react"
import loadScript from "load-script"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    bottom: 0,
    width: "100%",
    height: 50,
    textShadow: "1px 1px 1px #fff"
  }
}))

const Ad = () => {
  useEffect(() => {
    loadScript("//t1.daumcdn.net/kas/static/ba.min.js", { async: true })
  }, [])
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-1iupwia2uqm2d"
        data-ad-width="320"
        data-ad-height="50"
      ></ins>
    </div>
  )
}

export default Ad
