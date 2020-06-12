// import fastify from './fastify'
import fastify from './final-fastify'

import whisperPlugin from './whisperPlugin'

// declare module './fastify' {
declare module './final-fastify' {
  interface FastifyInstance {
    mySecret: string;
  }
}

const fastifyServer = fastify()

fastifyServer.decorate('mySecret', 'Fastify ❤️ TypeScript')

fastifyServer.mySecret

fastifyServer.register(whisperPlugin, { secret: fastifyServer.mySecret })

fastifyServer.whisperSecret