const formatEvents = require('./format-events')
const makeRequest = require('./make-request')

// it returns a promise to an array of arrays, where each one corresponds
// to a list of events of each meetup
module.exports = function getEvents (meetupID) {
    return makeRequest(`https://api.meetup.com/${meetupID}/events`)
        .then(formatEvents)
}
