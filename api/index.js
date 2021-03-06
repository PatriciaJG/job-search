const express = require('express')
const app = express()
const port = 3005

var redis = require('redis')
const client = redis.createClient()

const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)

app.get('/jobs', async (req, res) => {
  const jobs = await getAsync('github')
  console.log(JSON.parse(jobs).length)

  return res.send('Hello World!')
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
