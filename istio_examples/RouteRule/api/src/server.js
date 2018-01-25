const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT
const VERSION = process.env.VERSION

app.get('/healthz', (req, res) => res.sendStatus(200))
app.get('/api', (req, res) => {
  console.log(JSON.stringify(req.headers))
  res.json(`Hello World! ${VERSION} ... header version received from ui: ${req.headers.version}`)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
