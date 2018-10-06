# meetup-api

[![Build Status](https://travis-ci.org/meetupjs-ar/meetup-api.svg?branch=master)](https://travis-ci.org/meetupjs-ar/meetup-api) [![Greenkeeper badge](https://badges.greenkeeper.io/meetupjs-ar/meetup-api.svg)](https://greenkeeper.io/)

Microservicio que devuelve un JSON con los próximos eventos de los meetups indicados por configuración

[meetup-api](https://meetup-api.now.sh/)

## Como funciona

-   Usa el [API de meetup](https://www.meetup.com/es-ES/meetup_api/) para obtener los meetups que apliquen para la configuración dada (un rango de distancia sobre una latitud y una longitud)
-   Usa [memory-cache](https://github.com/ptarjan/node-cache) para almacenar los resultados por un tiempo determinado (indicado por configuración), para que no se estén haciendo pedidos todo el tiempo

## Desarrollo

> Antes de empezar, duplicar el archivo `.env-template`, nombrarlo como `.env` y reemplazar por los valores que se necesiten

```bash
npm install
npm run dev
```

## License

MIT
