// it returns an array of meetup's events with an specific contract
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
        // we discard the 'falsy' events
        .filter(e => !!e)
}
