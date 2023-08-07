import { InferModel, sql } from "drizzle-orm";
import { sqliteTable, integer, text, blob } from "drizzle-orm/sqlite-core";

export const leaderboardScores = sqliteTable("leaderboard_scores", {
  id: integer("id").primaryKey(),
  winner: integer("winner"),
  player1: text("player1"),
  player2: text("player2"),
  gameState: blob("game_state", { mode: "json" }).$type<number[][]>(),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
});

export type LeaderboardScore = InferModel<typeof leaderboardScores>;
export type NewLeaderboardScore = InferModel<
  typeof leaderboardScores,
  "insert"
>;
