import Swagger from '@fastify/swagger';
import SwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export const setupSwagger = (fastify: FastifyInstance) => {
  fastify.register(Swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'LookGit',
        description: 'Metrics for your code review',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      // TODO - will probably need this once we have auth
      // components: {
      //   securitySchemes: {
      //     apiKey: {
      //       type: 'apiKey',
      //       name: 'apiKey',
      //       in: 'header',
      //     },
      //   },
      // },
    },
  });

  fastify.register(SwaggerUi, {
    routePrefix: '/api-docs',
  });
};
