import { db } from "../../db/client";
import { NewLeaderboardScore, leaderboardScores } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const newLeaderboardScore = await readBody<NewLeaderboardScore>(event);

  const record = await db
    .insert(leaderboardScores)
    .values(newLeaderboardScore)
    .returning()
    .get();

  return record;
});
