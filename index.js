// si estamos en desarrollo, requerimos el archivo '.env'
// en producción, esa configuración se recibe directamente como variables de entorno
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
        // si el resultado del API no fue previamente cacheado
        if (!cache.get('data')) {
            // obtenemos un array de meetups que corresponden al rango es búsqueda
            const data = await getMeetups()
                // buscamos los eventos de esos meetups
                .then(meetups => meetups.map(m => getEvents(m.urlname)))
                // cuando obtengamos toda la información, vamos a tener un array de arrays,
                // donde cada uno es una lista de eventos
                .then(eventsProms => Promise.all(eventsProms))
                // generamos un array de 1 solo nivel por medio de un reduce
                // que solo concatena todos los eventos de los diferentes meetups
                .then(eventsLists => eventsLists.reduce(
                    (output, events) => output.concat(events),
                    []
                ))

            // guardamos los datos en cache por el tiempo indicado por configuración
            cache.put('data', data, cacheExpiration)
        }

        send(res, 200, cache.get('data'))
    } catch (error) {
        send(res, 500, error.message)
    }
}

module.exports = cors(handler)
