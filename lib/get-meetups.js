const makeRequest = require('./make-request')
const queryOptions = {
    query: {
        category: process.env.CATEGORIES,
        country: 'ar',
        key: process.env.MEETUP_API_KEY,
        lat: process.env.LAT,
        lon: process.env.LON,
        radius: process.env.RADIUS,
        sign: true
    }
}

// it returns a promise to the all the meetups that matches the options
module.exports = function getMeetups () {
    return makeRequest('https://api.meetup.com/find/groups', queryOptions)
}
