const redis = require('redis')
const client = redis.createClient({host: 'redis'})

function recursiveWork() {
  setTimeout(() => {
    client.lpop('job', (err, data) => {
      if(!data) {
        console.log('Queue empty, exiting...')
        client.quit()
        process.exit()
      } else {
        console.log('Working on ' + data)
        return recursiveWork()
      }
    })
  }, 2000)
}

client.on('connect', function() {
  recursiveWork()
})
