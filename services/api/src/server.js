const express = require('express')
const app = express()

const PORT = process.env.PORT

app.get('/healthz', (req, res) => res.sendStatus(200))
app.get('/api/v1', (req, res) => res.json('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
