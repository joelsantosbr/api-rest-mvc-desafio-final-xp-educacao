import { FastifyReply, FastifyRequest } from 'fastify';
import { IProductController } from '../domain/interfaces/IProductController';
import { Product } from '../domain/entities/Product';
import { ProductModel } from '../models/Product';

export class ProductController implements IProductController {
  private productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  async getProducts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const products = await this.productModel.getAll();
      
      if (products.length === 0) {
        reply.code(404).send({ error: 'Products not found' });
        return;
      }

      reply.code(200).send(products);
    } catch (error) {
      reply.code(500).send({ error: 'Error retrieving products' });
    }
  }

  async getProductById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const product = await this.productModel.getById(Number(request.params.id));

      if (!product) {
        reply.code(404).send({ error: 'Product not found' });
        return;
      }

      reply.code(200).send(product);
    } catch (error) {
      reply.code(500).send({ error: 'Error retrieving product' });
    }
  }

  async createProduct(
    request: FastifyRequest<{ Body: Product }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const newProduct = await this.productModel.create(request.body);
      reply.code(201).send(newProduct);
    } catch (error) {
      reply.code(500).send({ error: 'Error creating product' });
    }
  }

  async updateProduct(
    request: FastifyRequest<{ Params: { id: string }; Body: Product }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const updatedProduct = await this.productModel.updateById(Number(request.params.id), request.body);

      if (!updatedProduct) {
        reply.code(404).send({ error: 'Product not found' });
        return;
      }

      reply.code(200).send(updatedProduct);
    } catch (error) {
      reply.code(500).send({ error: 'Error updating product' });
    }
  }

  async deleteProduct(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      await this.productModel.deleteById(Number(request.params.id));
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ error: 'Error deleting product' });
    }
  }

  async findProductsByName(
    request: FastifyRequest<{ Querystring: { name: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const product = await this.productModel.findByName(request.query.name);

      if (!product) {
        reply.code(404).send({ error: 'Products not found' });
        return;
      }

      reply.code(200).send(product);
    } catch (error) {
      reply.code(500).send({ error: 'Error searching products' });
    }
  }

  async getProductTotal(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const total = await this.productModel.getTotal();
      reply.code(200).send({ total });
    } catch (error) {
      reply.code(500).send({ error: 'Error retrieving total products' });
    }
  }
}
