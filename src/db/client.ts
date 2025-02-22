import { drizzle } from 'drizzle-orm/libsql';
import { examples } from './schema/examples';
import { users } from './schema/users';
import { repos } from './schema/repos';
import { pullRequests } from './schema/pullRequests';
import { reviews } from './schema/reviews';
import { ghUsers } from './schema/ghUser';

export const db = drizzle(process.env.DB_FILE_NAME!, {
  schema: {
    examples,
    users,
    repos,
    pullRequests,
    reviews,
    ghUsers,
  },
});
