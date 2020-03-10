import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme"
import classes from "./App.module.css"
import Map from "./components/map"
import Layer from "./components/layer"
import Agreement from "./components/notice/Agreement"

function App() {
  const serviceOpen = true

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
