import Fastify from "fastify";

import logger from "./logger";

import distance from "../v1";

const { WEBSERVER_PORT, WEBSERVER_ADRESS } = process.env;

const buildFastify = (settings = {}): void => {
  const fastify = Fastify(settings);

  fastify.register(distance, { prefix: "api" });

  fastify.listen({ port: Number(WEBSERVER_PORT), host: WEBSERVER_ADRESS });

  logger.info(`Magic happens on port ${WEBSERVER_PORT}`);
};

export default buildFastify;
