const http = require('http')
const https = require('https')
const http2 = require('http2')

function fastify (opts) {

	// Part 2 - Named Generic Parameter
	const routeMap = {
		get: {},
		post: {}
	}

	const requestListener = (req, res) => {

		// assign properties headers, params, query, & body to `req`

		const preHandler = routeMap[req.method][req.url]['preHandler'](req, res)
		return preHandler
			? routeMap[req.method][req.url]['handler'](req, res)
			: preHandler
	}

	this.get = (route, opts, handler) => {
		routeMap['get'][route] = {
			preHandler: opts.preHandler,
			handler
		}
	}

	this.post = (route, opts, handler) => {
		routeMap['post'][route] = {
			preHandler: opts.preHandler,
			handler
		}
	}

	// Part 1 - Discriminant Unions & Function Overloading
	if (!opts) {
		this.server = http.createServer(requestListener)
	}

	if (opts.secret) {
		console.log(`Shh! Don't tell anyone my secret: ${opts.secret}`)
	}

	if (opts.https && !opts.http2) {
		this.server = https.createServer(requestListener, opts.https)
	}

	if (opts.http2 && !opts.https) {
		this.server = http2.createServer(requestListener)
	}

	if (opts.https && opts.http2) {
		this.server = http2.createSecureServer(requestListener, opts.https)
	}

	this.server = http.createServer(requestListener)

	// Part 3 - Declaration Merging
	this.decorate = (key, value) => {
		this[key] = value
	}

	this.register = (plugin, opts) => {
		plugin(this, opts)
	}

	return this
}

module.exports = fastify