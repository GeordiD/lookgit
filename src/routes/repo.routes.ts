import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { repos } from '../db/schema/repos';
import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { octokit } from '../utils/github';

export async function repoRoutes(fastify: FastifyInstance) {
  const url = '/api/repos';
  const tags = ['repos'];

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: `${url}/:repoId/sync`,
    schema: {
      body: z.any(),
      response: {
        200: z.any(),
      },
      tags,
    },

    handler: async (req, reply) => {
      // Theoretically, schema.params should do this but it's throwing off swagger
      const { repoId } = req.params as { repoId: string };

      const repo = await db.query.repos.findFirst({
        where: eq(repos.id, Number.parseInt(repoId)),
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
