const request = require('request-promise-native')
const express = require('express')
const app = express()

const PORT = process.env.PORT

app.get('/healthz', (req, res) => res.sendStatus(200))
app.get('/api/v1', async (req, res) => {
  const {items} = await request({
    method: 'GET',
    uri: 'https://api.github.com/search/repositories',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'RisingStack'
    },
    qs: { q: 'risingstack-bootcamp' },
    json: true
  })
  res.send(items[0])
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
