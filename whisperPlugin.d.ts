import { FastifyPlugin } from "./fastify";

declare module './fastify' {
  interface FastifyInstance {
    whisperSecret: string;
  }
}

declare const whisperPlugin: FastifyPlugin<{ secret: string }>
export = whisperPlugin