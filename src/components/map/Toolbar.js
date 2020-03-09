import React from "react"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { GpsFixed, Autorenew } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: "fixed",
    zIndex: 1000,
    right: theme.spacing(1),
    top: theme.spacing(8),
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(10),
      right: theme.spacing(2)
    }
  }
}))

const Toolbar = ({ pending, onLocationButtonClick, onRenewButtonClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.toolbar}>
      <ButtonGroup
        orientation="vertical"
        variant="outlined"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button disabled={pending} onClick={() => onLocationButtonClick()}>
          <GpsFixed />
        </Button>

        <Button disabled={pending} onClick={() => onRenewButtonClick()}>
          <Autorenew />
        </Button>
      </ButtonGroup>
    </div>
  )
}

Toolbar.defaultProps = {
  onLocationButtonClick: () => {},
  onRenewButtonClick: () => {}
}

export default Toolbar
