import { sql } from 'drizzle-orm';
import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';

export const enterLogs = sqliteTable('enter_logs', {
  id: int('id').primaryKey({ autoIncrement: true }),
  guestName: text('guest_name').notNull(),
  deviceInnerWidth: int('device_inner_width').notNull(),
  deviceInnerHeight: int('device_inner_height').notNull(),
  userAgent: text('user_agent').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ','now'))`),
});

export const markerFoundLogs = sqliteTable('marker_found_logs', {
  id: int('id').primaryKey({ autoIncrement: true }),
  guestName: text('guest_name').notNull(),
  markerId: text('marker_id').notNull(),
  deviceInnerWidth: int('device_inner_width').notNull(),
  deviceInnerHeight: int('device_inner_height').notNull(),
  userAgent: text('user_agent').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ','now'))`),
});

export const characterClickLogs = sqliteTable('character_click_logs', {
  id: int('id').primaryKey({ autoIncrement: true }),
  guestName: text('guest_name').notNull(),
  contentId: text('content_id').notNull(),
  deviceInnerWidth: int('device_inner_width').notNull(),
  deviceInnerHeight: int('device_inner_height').notNull(),
  userAgent: text('user_agent').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ','now'))`),
});
