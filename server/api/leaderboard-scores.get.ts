import { db } from "../../db/client";
import { leaderboardScores } from "../../db/schema";

export default defineEventHandler(async () => {
  const records = await db.select().from(leaderboardScores).all();

  return records;
});
