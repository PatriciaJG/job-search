// Algorithm to fetch jobs from GitHub website

var fetch = require('node-fetch')

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
  let resultCount = 1,
    onPage = 0
  const allJobs = []

  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`)
    const jobs = await res.json()
    allJobs.push(...jobs)
    resultCount = jobs.length
    console.log('got', jobs.length, 'jobs')
    onPage++
  }

  console.log('got', allJobs.length, 'jobs total')
}

fetchGithub()

module.exports = fetchGithub
