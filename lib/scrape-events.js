const cheerio = require('cheerio')
const got = require('got')
const moment = require('moment')

module.exports = async function scrapeEvents() {
    const { RADIUS } = process.env
    const { body } = await got(
        `https://www.meetup.com/es-ES/find/events/tech/?allMeetups=false&radius=${RADIUS}&userFreeform=buenos+ai&mcId=c1000296&mcName=Buenos+Aires%2C+AR`
    )
    const $ = cheerio.load(body)
    const days = $('li.event-listing-container-li')
    const dayInfo = $('li.date-indicator')
    const eventsArray = []
    days.each((dayIndex, li) => {
        const events = $(li).find('ul.event-listing-container > li')
        events.each((_, li) => {
            $(li).each((_, e) => {
                const eventDateElement = dayInfo.get(dayIndex)
                let eventDate
                if (eventDateElement) {
                    const {
                        'data-year': year,
                        'data-month': month,
                        'data-day': day
                    } = dayInfo.get(dayIndex).attribs
                    eventDate = `${year}-${month}-${day}`
                } else {
                    eventDate = moment().format('YYYY-MM-DD')
                }                
                eventsArray.push({
                    date:
                        moment.utc(
                            `${eventDate} ${$(e).find('div a').first().text().trim()}`,
                            'YYYY-MM-DD HH:mm'
                        ),
                    eventName:
                        `${$(e).find('div[itemprop="location"]').text().trim()} - ${$(e).find('a.event span[itemprop="name"]').text().trim()}`,
                    eventLink: $(e).find('a.event').prop('href'),
                    place: '',
                    attendeeCount: $(e).find('div.attendee-count').text().replace(/\n+/g, ' ')        
                })
            })
        })
    })
    return eventsArray
}