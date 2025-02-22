import { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { repos } from './repos';

export const pullRequests = sqliteTable('pull_requests', {
  id: integer().primaryKey(),
  repoId: integer()
    .notNull()
    .references(() => repos.id),
  name: text().notNull(),
  number: integer(),
});

export type PullRequest = InferSelectModel<typeof pullRequests>;
