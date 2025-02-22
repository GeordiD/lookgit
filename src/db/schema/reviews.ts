import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { pullRequests } from './pullRequests';
import { InferSelectModel } from 'drizzle-orm';
import { ghUsers } from './ghUser';

export const reviews = sqliteTable('reviews', {
  id: integer().primaryKey(),
  ghUserId: integer().references(() => ghUsers.id),
  pullRequestId: integer().references(() => pullRequests.id),
  state: text().notNull(),
});

export type Review = InferSelectModel<typeof reviews>;
