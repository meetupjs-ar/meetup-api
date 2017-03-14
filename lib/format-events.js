// a partir de los que el API devolvió para el evento, generamos un array que tenga
// solo la información que necesitamos
module.exports = function formatEvents(meetups) {
    return meetups
        .map(event => {
            if (event.visibility === 'public' && event.venue) {
                return {
                    date: new Date(event.time),
                    eventName: event.group.name,
                    eventLink: event.link,
                    place: event.venue.name,
                    placeAddress: event.venue.lat !== 0 ? `${event.venue.lat},${event.venue.lon}` : `${event.venue.address_1}`
                }
            }
        })
        // descartamos los vacios
        .filter(e => !!e)
}
