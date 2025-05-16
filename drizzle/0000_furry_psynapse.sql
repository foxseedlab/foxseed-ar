CREATE TABLE `character_click_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guest_name` text NOT NULL,
	`content_id` text NOT NULL,
	`device_inner_width` integer NOT NULL,
	`device_inner_height` integer NOT NULL,
	`user_agent` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `enter_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guest_name` text NOT NULL,
	`device_inner_width` integer NOT NULL,
	`device_inner_height` integer NOT NULL,
	`user_agent` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `marker_found_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guest_name` text NOT NULL,
	`marker_id` text NOT NULL,
	`device_inner_width` integer NOT NULL,
	`device_inner_height` integer NOT NULL,
	`user_agent` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL
);
