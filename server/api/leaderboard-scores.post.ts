import { NewLeaderboardScore, leaderboardScores } from "@/db/schema";
import { db } from "@/db/client";

export default defineEventHandler(async (event) => {
  const newLeaderboardScore = await readBody<NewLeaderboardScore>(event);

  const record = await db
    .insert(leaderboardScores)
    .values(newLeaderboardScore)
    .returning()
    .get();

  return record;
});
