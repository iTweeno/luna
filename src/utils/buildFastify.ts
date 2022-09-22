import Fastify, { FastifyInstance } from "fastify";

import logger from "./logger";

import distance from "../v1";

const { WEBSERVER_PORT, WEBSERVER_ADRESS } = process.env;

const buildFastify = (settings = {}, port = Number(WEBSERVER_PORT), host = WEBSERVER_ADRESS): FastifyInstance => {
  const fastify = Fastify(settings);

  fastify.register(distance, { prefix: "api" });

  fastify.listen({ port, host });

  logger.info(`Magic happens on port ${WEBSERVER_PORT}`);

  return fastify;
};

export default buildFastify;
