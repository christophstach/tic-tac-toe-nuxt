import { db } from "../../schema/db";
import { leaderboardScores } from "../../schema/tables";

export default defineEventHandler(async () => {
  const records = await db.select().from(leaderboardScores).all();

  return records;
});
