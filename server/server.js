const express = require("express")
const path = require("path")
const app = express()
const port = 4444

app.use("/", express.static(path.resolve(__dirname, "../build")))

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"))
})
app.use((err, req, res, next) => {
  res.sendStatus(500)
})

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
