
import http from 'http'
import https from 'https'
import http2 from 'http2'

type RequestGeneric = {
  Headers?: unknown;
  Query?: unknown;
  Params?: unknown;
  Body?: unknown;
}

type FastifyRequest<R extends RequestGeneric = RequestGeneric> = {
  headers: R['Headers'];
  query: R['Query'];
  params: R['Params'];
  body: R['Body'];
}

type FastifyRouteHandler<R extends RequestGeneric = RequestGeneric> = (
  req: FastifyRequest<R>,
  res: unknown
) => void

type FastifyRouteOpts<R extends RequestGeneric = RequestGeneric> = {
  preHandler: FastifyRouteHandler<R>
}
type FastifyRoute = <R extends RequestGeneric = RequestGeneric>(
  route: string,
  opts: FastifyRouteOpts<R>,
  handler: FastifyRouteHandler<R>
) => void

type ServerUnion = http.Server | https.Server | http2.Http2SecureServer | http2.Http2Server

type FastifyHttpOptions = {
  secret?: string;
}
type FastifyHttpsOptions = FastifyHttpOptions & {
  https: https.ServerOptions;
}
type FastifyHttp2Options = FastifyHttpOptions & {
  http2: true;
}
type FastifyHttp2SecureOptions = FastifyHttpOptions & {
  http2: true;
  https: http2.SecureServerOptions;
}

export interface FastifyInstance<Server extends ServerUnion = http.Server> {
  server: Server
  get: FastifyRoute
  post: FastifyRoute
  decorate: (key: string, value: any) => void;
  register: <PluginOpts>(
    plugin: FastifyPlugin<PluginOpts>,
    opts: PluginOpts
  ) => void;
}

export interface FastifyPlugin<PluginOpts> {
  (instance: FastifyInstance, opts: PluginOpts): void;
}

declare function fastify(opts: FastifyHttp2SecureOptions): FastifyInstance<http2.Http2SecureServer>
declare function fastify(opts: FastifyHttp2Options): FastifyInstance<http2.Http2Server>
declare function fastify(opts: FastifyHttpsOptions): FastifyInstance<https.Server>
declare function fastify(opts?: FastifyHttpOptions): FastifyInstance<http.Server>

export default fastify