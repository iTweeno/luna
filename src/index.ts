import "dotenv/config";

import logger from "./utils/logger";

import buildFastify from "./utils/buildFastify";

import prisma from "./utils/prismaClient";

import seedDbIfNeeded from "./utils/seed";

(async (): Promise<void> => {
  try {
    buildFastify();

    await seedDbIfNeeded();

    logger.info("Server started");
  } catch (error) {
    logger.error(error);

    await prisma.$disconnect();

    process.exit(-1);
  } finally {
    await prisma.$disconnect();
  }
})();
