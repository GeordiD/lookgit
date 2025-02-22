import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const ghUsers = sqliteTable('gh_users', {
  id: integer().primaryKey(),
  login: text().notNull(),
  avatarUrl: text(),
  email: text().notNull(),
  name: text().notNull(),
});
