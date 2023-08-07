import { leaderboardScores } from "@/db/schema";
import { db } from "@/db/client";

export default defineEventHandler(async () => {
  const records = await db.select().from(leaderboardScores).all();

  return records;
});
