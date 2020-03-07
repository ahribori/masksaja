import React from "react"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { GpsFixed } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: "fixed",
    zIndex: 99999,
    right: theme.spacing(1),
    top: theme.spacing(8),
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(10),
      right: theme.spacing(2)
    }
  }
}))

const Toolbar = ({ pending, onLocationButtonClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.toolbar}>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button variant={"outlined"} disabled={pending} onClick={() => onLocationButtonClick()}>
          <GpsFixed />
        </Button>
        {/*<Button variant="outlined">메뉴2</Button>*/}
        {/*<Button>메뉴3</Button>*/}
      </ButtonGroup>
    </div>
  )
}

Toolbar.defaultProps = {
  onLocationChange: () => {}
}

export default Toolbar
