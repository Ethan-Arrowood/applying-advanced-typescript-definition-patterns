import http from 'http'
import https from 'https'
import http2 from 'http2'

type ServerUnion = http.Server | https.Server | http2.Http2Server | http2.Http2SecureServer;

export interface FastifyInstance{
  server: ServerUnion;
}

interface FastifyOptions {
  secret?: string;
  https?: https.ServerOptions | http2.SecureServerOptions;
  http2?: boolean;
}

declare function fastify(opts?: FastifyOptions): ServerUnion;

export default fastify