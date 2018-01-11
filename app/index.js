const express = require('express')
const app = express()

// READINESS_PROBE_DELAY = failureThreshold * periodSeconds * 1000
const READINESS_PROBE_DELAY = 4000
const state = { 
  isShutdown: false,
  healthy: true
}
console.log(process.pid)
if(process.env.SHOULD_FAIL_WITHIN) {
  setTimeout(() => { state.healthy = false }, process.env.SHOULD_FAIL_WITHIN)
}

process.on('SIGTERM', () => { 
  state.isShutdown = true
  setTimeout( function gracefulShutdown () {
    server.close()
    // db close
    process.exit()
  }, READINESS_PROBE_DELAY)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/healthz', (req, res) => {
  if (state.isShutdown) {
    return res.send(503, 'Service is shutting down')
  }

  if(state.healthy) {
    return res.sendStatus(200)
  } else {
    return res.sendStatus(500)
  }
})

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'))
