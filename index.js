// if we're in development, we require an specific configuration located at '.env'
// at production, that configuration is setted directly and we don't use that file
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const cache = require('memory-cache')
const microCors = require('micro-cors')
const { send } = require('micro')

const getEvents = require('./lib/get-events')
const getMeetups = require('./lib/get-meetups')

const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION)
const cors = microCors({
    allowMethods: ['GET']
})

async function handler (req, res) {
    try {
        // we look for the data in the memory cache
        // if it's not present, we fetch, format and store the data into the cache
        if (!cache.get('data')) {
            // 1. we get the meetups covered by the configuration
            const data = await getMeetups()
                // 2. we ask for the events of each of those meetups
                .then(meetups => meetups.map(m => getEvents(m.urlname)))
                // 3. we wait to all the promises to be fullfilled
                .then(eventsProms => Promise.all(eventsProms))
                // 4. we create an one-level array from an arrays of arrays
                .then(eventsLists => eventsLists.reduce(
                    (output, events) => output.concat(events),
                    []
                ))

            // 1 minute of living time
            cache.put('data', data, cacheExpiration)
        }

        send(res, 200, cache.get('data'))
    } catch (error) {
        send(res, 500, `Ups! Hubo un error al obtener los datos\n\n${error.message}`)
    }
}

module.exports = cors(handler)
