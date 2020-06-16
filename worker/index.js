//Runs a node process where we are importing the library
//And then
var CronJob = require('cron').CronJob

const fetchGithub = require('./tasks/fetch-github.js')

//fetch github jobs every minute
new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles')
