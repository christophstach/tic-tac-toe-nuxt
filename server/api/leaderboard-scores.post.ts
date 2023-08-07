import { db } from "../../schema/db";
import { leaderboardScores, NewLeaderboardScore } from "../../schema/tables";

export default defineEventHandler(async (event) => {
  const newLeaderboardScore = await readBody<NewLeaderboardScore>(event);

  const record = await db
    .insert(leaderboardScores)
    .values(newLeaderboardScore)
    .returning()
    .get();

  return record;
});
