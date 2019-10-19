// si estamos en desarrollo, requerimos el archivo '.env'
// en producción, esa configuración se recibe directamente como variables de entorno
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const cache = require('memory-cache')
const microCors = require('micro-cors')
const { send } = require('micro')

const scrapeEvents = require('./lib/scrape-events')

const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION)
const cors = microCors({
    allowMethods: ['GET']
})

async function handler(req, res) {
    try {
        // si el resultado del API no fue previamente cacheado
        if (!cache.get('data')) {
            // obtenemos un array de meetups que corresponden al rango es búsqueda
            const data = await scrapeEvents()
            // guardamos los datos en cache por el tiempo indicado por configuración
            cache.put('data', data, cacheExpiration)
        }

        send(res, 200, cache.get('data'))
    } catch (error) {
        send(res, 500, error.message)
    }
}

module.exports = cors(handler)
