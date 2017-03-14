const formatEvents = require('./format-events')
const makeRequest = require('./make-request')

// devuelve un array de arrays donde cada uno es una lista de eventos de un meetup en particular
module.exports = function getEvents (meetupID) {
    return makeRequest(`https://api.meetup.com/${meetupID}/events`)
        .then(formatEvents)
}
