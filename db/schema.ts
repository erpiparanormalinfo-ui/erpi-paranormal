import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const announcements=sqliteTable('erpi_announcements',{
 id:text('id').primaryKey(),title:text('title').notNull(),summary:text('summary').notNull(),kind:text('kind').notNull(),url:text('url').notNull(),publishedAt:text('published_at').notNull(),expiresAt:text('expires_at'),status:text('status').notNull().default('draft'),pinned:integer('pinned').notNull().default(0),authorId:text('author_id').notNull(),updatedAt:text('updated_at').notNull()
},t=>[index('idx_announcements_status_date').on(t.status,t.publishedAt)]);
export const feedCache=sqliteTable('erpi_feed_cache',{key:text('key').primaryKey(),payload:text('payload').notNull(),checkedAt:integer('checked_at').notNull()});
