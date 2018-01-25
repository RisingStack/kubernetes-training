const request = require('request-promise-native')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT

// DNS-based Kubernetes service discovery
const GITHUB_SERVICE_URL = `http://github.${process.env.POD_NAMESPACE}`

app.get('/healthz', (req, res) => res.sendStatus(200))
app.get('/api/v1', (req, res) => res.json('Hello World!'))
app.get('/api/v1/git', async (req, res) => {
  const response = await request({
    method: 'GET',
    uri: `${GITHUB_SERVICE_URL}/api/v1`
  })
  res.json(response)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
