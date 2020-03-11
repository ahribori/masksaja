import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    zIndex: 1000,
    right: 0,
    bottom: 0,
    width: 200,
    padding: theme.spacing(1),
    textAlign: "right",
    textShadow: "1px 1px 1px #fff",
    fontSize: 10,
    [theme.breakpoints.up("sm")]: {
      fontSize: 11
    }
  }
}))

const About = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div>개발: 정현승</div>
      <div>문의: ahribori@gmail.com</div>
      <div>지도 및 로컬 API 지원 : kakao</div>
    </div>
  )
}

export default About
