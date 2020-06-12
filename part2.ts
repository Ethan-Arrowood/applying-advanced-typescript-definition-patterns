// import fastify from './fastify'
import fastify from './final-fastify'

const server = fastify()

server.get<{
  Headers: {
    'my-header': string
  },
  Query: {
    'name': string
  },
}>('/', {
  preHandler: (req, res) => {
    req.headers
    req.query
    req.params
  }
}, (req, res) => {
  req.headers
})

server.post<{ Body: { 'name': string }}>('/', {
  preHandler: (req, res) => {
    req.body
  }
}, ( req, res) => {
  req.body
})