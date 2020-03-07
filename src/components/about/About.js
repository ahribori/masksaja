import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    zIndex: 9999,
    right: 0,
    bottom: 0,
    width: 200,
    fontSize: 11,
    padding: theme.spacing(1),
    textAlign: "right"
  }
}))

const About = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div>개발: 정현승</div>
      <div>문의: ahribori@gmail.com</div>
    </div>
  )
}

export default About
