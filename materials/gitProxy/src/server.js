const express = require('express')
const app = express()
const request = require('request-promise-native')

const PORT = process.env.PORT || 8888

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

const server = app.listen(PORT, () => console.log('Git proxy listening on port ' + PORT + '!'))
