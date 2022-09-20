import { PrismaClient } from "@prisma/client";

import logger from "./logger";

const prisma = new PrismaClient();

logger.info("Prisma client created");

export default prisma;
