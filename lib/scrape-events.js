const cheerio = require('cheerio')
const got = require('got')
const moment = require('moment')

module.exports = async function scrapeEvents(date = moment().format('YYYY-MM-DD')) {
    const {
        RADIUS
    } = process.env;
    const { body } = await got(
        `https://www.meetup.com/es-ES/find/events/tech/?allMeetups=false&radius=${RADIUS}&userFreeform=buenos+ai&mcId=c1000296&mcName=Buenos+Aires%2C+AR`
    )
    const $ = cheerio.load(body)
    const events = $(`li[data-uniqselector=".container-${date}"] ul.event-listing-container > li`)
    const eventsArray = [];
    events.each((_, li) => {
        $(li).each((_, e) => {
            eventsArray.push({
                date:
                    moment.utc(date + ' ' + $(e).find('div a').first().text().trim(), 'YYYY-MM-DD HH:mm'),
                eventName:
                    `${$(e).find('div[itemprop="location"]').text().trim()} - ${$(e).find('a.event span[itemprop="name"]').text().trim()}`,
                eventLink: $(e).find('a.event').prop('href'),
                place: '',
                attendeeCount: $(e).find('div.attendee-count').text().replace(/\n+/g, ' ')        
            })
        })
    })
    return eventsArray;
}
