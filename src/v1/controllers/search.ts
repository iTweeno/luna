import { FastifyInstance } from "fastify";
import ApiError from "../../utils/ApiError";
import { search } from "../services/search";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/search/:term", async (req, res) => {
    try {
      const { term } = req.params as { term: string };

      const { skip } = req.query as { skip: string };

      return await search(term, Number(skip));
    } catch (e: any | ApiError) {
      return res.code(e.statusCode || 500).send(e.message);
    }
  });
};
