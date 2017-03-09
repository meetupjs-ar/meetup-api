// it returns an array of meetup's events with an specific contract
module.exports = function formatEvents(meetups) {
    return meetups
        .map(event => {
            if (event.visibility === 'public' && event.venue) {
                return {
                    date: new Date(event.time),
                    community: event.group.name,
                    place: event.venue.name,
                    placeAddress: event.venue.lat !== 0 ? `${event.venue.lat},${event.venue.lon}` : `${event.venue.address_1}}`,
                    eventLink: event.link
                }
            }
        })
        // we discard the 'falsy' events
        .filter(e => !!e)
}
