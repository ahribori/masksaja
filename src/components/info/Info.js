import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  info: {
    position: "fixed",
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    width: 240,
    height: 80,
    marginTop: -40,
    marginLeft: -120,
    fontSize: 15
  }
}))

const Info = ({ message }) => {
  const classes = useStyles()
  return <div className={classes.info}>{message}</div>
}

export default Info
