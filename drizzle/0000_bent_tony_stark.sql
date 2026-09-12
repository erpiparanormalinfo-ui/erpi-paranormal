CREATE TABLE `erpi_announcements` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`kind` text NOT NULL,
	`url` text NOT NULL,
	`published_at` text NOT NULL,
	`expires_at` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`pinned` integer DEFAULT 0 NOT NULL,
	`author_id` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_announcements_status_date` ON `erpi_announcements` (`status`,`published_at`);--> statement-breakpoint
CREATE TABLE `erpi_feed_cache` (
	`key` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`checked_at` integer NOT NULL
);
