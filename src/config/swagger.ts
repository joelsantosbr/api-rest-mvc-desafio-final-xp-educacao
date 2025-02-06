import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export async function setupSwagger(fastify: FastifyInstance) {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "API REST de Produtos",
        description: "Desafio final do curso de pós graduação Arquiteto(a) de Software na XP Educação.",
        version: "1.0.0",
      },
      host: "localhost:5050",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
  });
}
