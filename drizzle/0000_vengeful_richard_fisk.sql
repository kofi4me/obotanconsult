CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`service` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`field` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`evidence` text NOT NULL,
	`file_key` text,
	`file_name` text,
	`file_size` integer,
	`slot` integer NOT NULL,
	`reserved_slot` integer,
	`status` text DEFAULT 'new' NOT NULL,
	`admin_notes` text DEFAULT '' NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_submissions_reserved_slot` ON `submissions` (`reserved_slot`);--> statement-breakpoint
CREATE INDEX `idx_submissions_created_at` ON `submissions` (`created_at`);