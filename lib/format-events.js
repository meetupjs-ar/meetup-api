const moment = require('moment')

// a partir de los que el API devolvió para el evento, generamos un array que tenga
// solo la información que necesitamos
module.exports = function formatEvents(meetups) {
    return meetups
        .map(event => {
            // horario de Argentina
            const date = moment.utc(event.time).subtract(3, 'hours')

            return {
                date,
                eventName: event.group.name,
                eventLink: event.link,
                // hay eventos donde la información del venue no va a estar porque el organizador
                // consideró que esa info es privada y accesible solo para los miembros del meetup
                place: event.venue ? event.venue.name : '',
            }
        })
}
