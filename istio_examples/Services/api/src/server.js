const request = require('request-promise-native')
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

app.get('/api/git', async (req, res) => {
  try {
    return res.json(JSON.parse(
      await request({
        method: 'GET',
        uri: `http://github.default.svc.cluster.local:5000/api/hello`
    })))
  } catch (err) {
    console.log(err)
    return res.sendStatus(err.statusCode || 500)
  }
})
app.get('/api/git/repo', async (req, res) => {
  try {
    return res.json(JSON.parse(
      await request({
        method: 'GET',
        uri: `http://github.default.svc.cluster.local:5000/api/search/repo`
    })))
  } catch (err) {
    console.log(err)
    return res.sendStatus(err.statusCode || 500)
  }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
