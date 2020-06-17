/*------Algorithm to fetch jobs from GitHub website------*/

var fetch = require('node-fetch') // require = to include modules (nodejs)

/*Storing jobs in keys in the redis data base*/

const redis = require('redis')
const client = redis.createClient()

const { promisify } = require('util')
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client)

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
  console.log('fetching github')

  let resultCount = 1,
    onPage = 0
  const allJobs = []

  //Fetch all pages
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`)
    const jobs = await res.json()
    allJobs.push(...jobs)
    resultCount = jobs.length
    console.log('got', jobs.length, 'jobs')
    onPage++
  }

  //Filter algorithm

  const jrJobs = allJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase()
    let isJunior = true

    //algo logic
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect') ||
      jobTitle.includes('lead')
    ) {
      return false
    }
    return true
  })

  console.log('Filtered down to Junior Jobs', jrJobs.length)

  //Set in Redis
  console.log('got', allJobs.length, 'jobs total')
  const success = await setAsync('github', JSON.stringify(jrJobs))

  console.log({ success })
}

module.exports = fetchGithub
