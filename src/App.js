import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme"
import classes from "./App.module.css"
import Map from "./components/map"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <Map />
      </div>
    </ThemeProvider>
  )
}

export default App
