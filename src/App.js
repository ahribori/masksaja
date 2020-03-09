import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme"
import classes from "./App.module.css"
import Map from "./components/map"
import About from "./components/about/About"
import Notice from "./components/notice/Notice"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <Map />
        <About />
        <Notice />
      </div>
    </ThemeProvider>
  )
}

export default App
