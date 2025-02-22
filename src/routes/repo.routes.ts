import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { repos } from '../db/schema/repos';
import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { octokit } from '../utils/github';

export async function repoRoutes(fastify: FastifyInstance) {
  const url = '/api/repos';

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: `${url}/:repoId/sync`,
    schema: {
      params: z.object({
        repoId: z.coerce.number(),
      }),
    },
    handler: async (req, reply) => {
      const repo = await db.query.repos.findFirst({
        where: eq(repos.id, req.params.repoId),
      });

      if (!repo) {
        return reply.status(404).send();
      }

      const result = await octokit.rest.pulls.list({
        owner: repo.owner,
        repo: repo.name,
        sort: 'updated',
        state: 'all',
        per_page: 100,
        direction: 'desc',
      });

      return reply.send({
        data: result.data,
      });
    },
  });
}
