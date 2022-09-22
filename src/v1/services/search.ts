import ISearch from "../../types/search";
import ApiError from "../../utils/ApiError";
import logger from "../../utils/logger";

import prisma from "../../utils/prismaClient";

import { getQueryFromSearchPhrase } from "../../utils/utils";

const search = async (term: string, skip = 0): Promise<ISearch[]> => {
  if (isNaN(skip)) {
    skip = 0;
  }

  if (term.length < 3) {
    throw new ApiError(400, "Term must be at least 3 characters long");
  }

  try {
    const query = getQueryFromSearchPhrase(term);

    const results = await prisma.$queryRaw`
    SELECT id,
    title,
    content,
    ts_rank("textSearch",to_tsquery('english', ${query})) AS rank 
    FROM "search_prompts"
    WHERE
      "textSearch" @@ to_tsquery('english', ${query})
    ORDER BY rank DESC
    LIMIT 10 OFFSET ${skip};
  `;

    return results as ISearch[];
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

export { search };
