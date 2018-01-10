const express = require('express')
const app = express()

let healthy = true
setTimeout(() => { healthy = false }, process.env.SHOULD_FAIL_WITHIN)

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/healthz', (req, res) => {
  if(healthy) {
    return res.sendStatus(200)
  } else {
    return res.sendStatus(500)
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
