import { FastifyInstance } from "fastify";
import distance from "./controllers/search";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(distance, { prefix: "v1" });
};
