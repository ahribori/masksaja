import React from "react"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: "fixed",
    zIndex: 99999,
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      right: theme.spacing(2),
      bottom: theme.spacing(2)
    }
  }
}))

const Toolbar = ({}) => {
  const classes = useStyles()
  return (
    <div className={classes.toolbar}>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button>메뉴1</Button>
        <Button variant="outlined">메뉴2</Button>
        <Button>메뉴3</Button>
      </ButtonGroup>
    </div>
  )
}

Toolbar.defaultProps = {}

export default Toolbar
