import { FastifyReply, FastifyRequest } from 'fastify';

export interface IProductController {
  getProducts(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getProductById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void>;
  createProduct(request: FastifyRequest<{ Body: any }>, reply: FastifyReply): Promise<void>;
  updateProduct(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply): Promise<void>;
  deleteProduct(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void>;
  findProductsByName(request: FastifyRequest<{ Querystring: { name: string } }>, reply: FastifyReply): Promise<void>;
  getProductTotal(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
