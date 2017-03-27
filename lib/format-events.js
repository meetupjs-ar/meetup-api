const moment = require('moment')
const querystring = require('querystring')

// a partir de los que el API devolvió para el evento, generamos un array que tenga
// solo la información que necesitamos
module.exports = function formatEvents(meetups) {
    return meetups
        .map(event => {
            // horario de Argentina
            const date = moment.utc(event.time).subtract(3, 'hours')
            let googleMapsLink = ''
            let venueName = ''

            // hay eventos que no tienen venue por ser información solo disponible para
            // miembros del meetup, en esos casos, 'place' y 'placeAddress' son campos que van
            // a estar vacíos
            if (event.venue) {
                const query = querystring.stringify({q: `${event.venue.address_1}, ${event.venue.city}`})
                googleMapsLink = `http://maps.google.com/?${query}`

                venueName = event.venue.name
            }

            return {
                date,
                eventName: event.group.name,
                eventLink: event.link,
                place: venueName,
                placeAddress: googleMapsLink
            }
        })
}
