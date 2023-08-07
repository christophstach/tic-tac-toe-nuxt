CREATE TABLE `leaderboard_scores` (
	`id` integer PRIMARY KEY NOT NULL,
	`winner` integer,
	`player1` text,
	`player2` text,
	`game_state` blob,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
