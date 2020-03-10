import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme"
import classes from "./App.module.css"
import Map from "./components/map"
import Layer from "./components/layer"
import Agreement from "./components/notice/Agreement"
import { isPast } from "date-fns"

function App() {
  const serviceOpen = isPast(new Date("2020-03-11 08:00:00"))
  console.log("serviceOpen", serviceOpen)

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <Map serviceOpen={serviceOpen} />
        <Layer />
        <Agreement serviceOpen={serviceOpen} />
      </div>
    </ThemeProvider>
  )
}

export default App
