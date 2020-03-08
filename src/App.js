import React, { useState } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme"
import classes from "./App.module.css"
import Map from "./components/map"
import About from "./components/about/About"
import Notice from "./components/notice/Notice"
import ErrorNotice from "./components/notice/ErrorNotice"

function App() {
  const [error, setError] = useState(null)
  useState(() => {
    window.onerror = err => {
      setError(err)
    }
  })

  return <ErrorNotice />

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
