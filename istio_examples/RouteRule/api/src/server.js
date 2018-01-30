const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT
const VERSION = process.env.VERSION

app.get('/healthz', (req, res) => res.sendStatus(200))
app.get('/api', (req, res) => res.json({
  requestedVersion: req.headers.version,
  version: VERSION
}))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

// TODO: remove this part
setInterval(() => {
  require('request')(`http://api.default.svc.cluster.local/api`, (error, response, body) => {
    console.log(error || body)
  })
}, 1000)
