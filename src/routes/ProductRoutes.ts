import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { ProductController } from "../controllers/ProductController";

const productController = new ProductController();

const ErrorResponse = Type.Object({
  error: Type.String(),
});

const productSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  price: Type.Number(),
  category: Type.String(),
});

const productRoutes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider().get(
    "/products",
    {
      schema: {
        summary: "Listar todos os produtos",
        description: "Retorna uma lista de todos os produtos disponíveis.",
        tags: ["Products"],
        response: {
          200: Type.Array(productSchema),
          404: ErrorResponse,
          500: ErrorResponse,
        },
      },
    },
    productController.getProducts.bind(productController)
  );

  fastify.withTypeProvider().get(
    "/products/:id",
    {
      schema: {
        summary: "Obter produto por ID",
        description: "Retorna um único produto pelo seu ID.",
        tags: ["Products"],
        params: Type.Object({
          id: Type.String(),
        }),
        response: {
          200: productSchema,
          404: ErrorResponse,
          500: ErrorResponse,
        },
      },
    },
    productController.getProductById.bind(productController)
  );

  fastify.withTypeProvider().post(
    "/products",
    {
      schema: {
        summary: "Criar um novo produto",
        description: "Cria um novo produto na base de dados.",
        tags: ["Products"],
        body: Type.Object({
          name: Type.String(),
          price: Type.Number(),
          category: Type.String(),
        }),
        response: {
          201: productSchema,
          500: ErrorResponse,
        },
      },
    },
    productController.createProduct.bind(productController)
  );

  fastify.withTypeProvider().put(
    "/products/:id",
    {
      schema: {
        summary: "Atualizar um produto",
        description: "Atualiza os detalhes de um produto existente.",
        tags: ["Products"],
        params: Type.Object({
          id: Type.String(),
        }),
        body: Type.Object({
          name: Type.String(),
          price: Type.Number(),
          category: Type.String(),
        }),
        response: {
          200: productSchema,
          404: ErrorResponse,
          500: ErrorResponse,
        },
      },
    },
    productController.updateProduct.bind(productController)
  );

  fastify.withTypeProvider().delete(
    "/products/:id",
    {
      schema: {
        summary: "Excluir um produto",
        description: "Remove um produto da base de dados.",
        tags: ["Products"],
        params: Type.Object({
          id: Type.String(),
        }),
        response: {
          204: Type.Null(),
          500: ErrorResponse,
        },
      },
    },
    productController.deleteProduct.bind(productController)
  );

  fastify.withTypeProvider().get(
    "/products/search",
    {
      schema: {
        summary: "Buscar produtos por nome",
        description: "Busca produtos pelo nome (suporta busca parcial).",
        tags: ["Products"],
        querystring: Type.Object({
          name: Type.String(),
        }),
        response: {
          200: Type.Array(productSchema),
          404: ErrorResponse,
          500: ErrorResponse,
        },
      },
    },
    productController.findProductsByName.bind(productController)
  );

  fastify.withTypeProvider().get(
    "/products/total",
    {
      schema: {
        summary: "Obter o total de produtos",
        description: "Retorna o número total de produtos na base de dados.",
        tags: ["Products"],
        response: {
          200: Type.Object({
            total: Type.Number(),
          }),
          500: ErrorResponse,
        },
      },
    },
    productController.getProductTotal.bind(productController)
  );
};

export default productRoutes;
