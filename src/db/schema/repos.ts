import { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const repos = sqliteTable('repos', {
  id: integer().primaryKey(),
  owner: text().notNull(),
  name: text().notNull(),
  url: text().notNull(),
});

export type Repo = InferSelectModel<typeof repos>;
