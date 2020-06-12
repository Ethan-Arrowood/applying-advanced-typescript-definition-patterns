// import fastify from './fastify'
import fastify from './final-fastify'

const fastifyServer1 = fastify() // - http
fastifyServer1.server
const fastifyServer2 = fastify({ secret: 'OpenJS World is 🔥' }) // - http
const fastifyServer3 = fastify({ https: {} }) // - https
const fastifyServer4 = fastify({ http2: true }) // - http2
fastifyServer4.server
const fastifyServer5 = fastify({ https: {}, http2: true }) // - http2 secure
fastifyServer5.server
