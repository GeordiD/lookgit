import { FastifyInstance } from 'fastify';
import { db } from '../db/client';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getAllResponse } from '../types/responses';
import { ExampleSchema, examples } from '../db/schema/examples';

export async function exampleRoutes(fastify: FastifyInstance) {
  const url = '/api/examples';

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url,
    schema: {
      response: {
        200: getAllResponse(ExampleSchema),
      },
    },
    handler: async () => {
      const results = await db.select().from(examples);

      return {
        results,
        totalCount: results.length,
      };
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url,
    schema: {
      body: z.object({
        name: z.string().min(1),
      }),
      response: {
        200: z.object({
          insertedId: z.number(),
        }),
      },
    },
    handler: async (req) => {
      const result = await db
        .insert(examples)
        .values({
          name: req.body.name,
        })
        .returning({ insertedId: examples.id });

      return result[0];
    },
  });
}
