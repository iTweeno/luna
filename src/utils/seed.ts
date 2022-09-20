import prisma from "./prismaClient";

import logger from "./logger";

import { readFileSync, writeFileSync } from "fs";

const { NODE_ENV } = process.env;

const path = NODE_ENV === "dev" || NODE_ENV === "seed" ? "./src/data.json" : "./data.json";

const config = JSON.parse(readFileSync(path, "utf8"));

const seedDb = async () => {
  try {
    if (!config.seeded) {
      await prisma.search_prompts.deleteMany();

      await prisma.search_prompts.createMany({
        data: config.books,
      });

      logger.info("Database seeded");

      writeFileSync(path, JSON.stringify({ ...config, seeded: true }));
    }
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

if (NODE_ENV === "seed") {
  seedDb();
}

export default seedDb;
