const request = require('request-promise-native')
const express = require('express')
const app = express()
const cors = require('cors')
const _ = require('lodash')
app.use(cors())

const PORT = process.env.PORT

app.get('/healthz', (req, res) => res.sendStatus(200))
app.get('/api/hello', (req, res) => res.json({
  response: 'Hello world from github service in cluster!'
}))
app.get('/api/search/repo', async (req, res) => {
  try {
    const {items} = await request({
      method: 'GET',
      uri: 'http://api.github.com:443/search/repositories',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'RisingStack'
      },
      qs: { q: 'risingstack-bootcamp' },
      json: true
    })
    return res.json(_.pickBy(items[0], _.identity))
  } catch (err) {
    console.log(err)
    return res.sendStatus(err.statusCode || 500)
  }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
