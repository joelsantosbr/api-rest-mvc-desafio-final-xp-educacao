import sqlite3 from "sqlite3";

import database from "../infra/database";
import { Product } from "../domain/entities/Product";
import { IProductModel } from "../domain/interfaces/IProductModel";

export class ProductModel implements IProductModel {
  private async run(query: string, params: any[] = []): Promise<void> {
      return new Promise((resolve, reject) => {
          database.run(query, params, function (err) {
              if (err) reject(err);
              else resolve();
          });
      });
  }

  private async runWithLastID(query: string, params: any[]): Promise<number> {
      return new Promise((resolve, reject) => {
          database.run(query, params, function (this: sqlite3.RunResult | void, err) {
              if (err) {
                  reject(err);
              } else {
                  resolve((this as sqlite3.RunResult).lastID);
              }
          });
      });
  }

  private async getWithParams<T>(query: string, params: any[]): Promise<T | null> {
      return new Promise((resolve, reject) => {
          database.get(query, params, (err, row) => {
              if (err) {
                  reject(err);
              } else {
                  resolve((row as T) || null);
              }
          });
      });
  }

  private async allWithParams<T>(query: string, params: any[] = []): Promise<T[]> {
      return new Promise((resolve, reject) => {
          database.all(query, params, (err, rows) => {
              if (err) reject(err);
              else resolve((rows as T[]) || []);
          });
      });
  }

  async create(product: Product): Promise<Product> {
      const lastID = await this.runWithLastID(
          `INSERT INTO products (name, price, category) VALUES (?, ?, ?)`,
          [product.name, product.price, product.category]
      );
      return { id: lastID, ...product };
  }

  async getAll(): Promise<Product[]> {
      return this.allWithParams<Product>(`SELECT * FROM products`);
  }

  async getById(id: number): Promise<Product | null> {
      return this.getWithParams<Product>(`SELECT * FROM products WHERE id = ?`, [id]);
  }

  async deleteById(id: number): Promise<void> {
      await this.run(`DELETE FROM products WHERE id = ?`, [id]);
  }

  async updateById(id: number, product: Product): Promise<Product | null> {
      const existingProduct = await this.getById(id);
      if (!existingProduct) return null;

      await this.run(
          `UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?`,
          [product.name, product.price, product.category, id]
      );

      return this.getById(id);
  }

  async findByName(name: string): Promise<Product[] | null> {
    const result = await this.allWithParams<Product>(`SELECT * FROM products WHERE name LIKE ? COLLATE NOCASE`, [`%${name}%`]);
    return result;
  }

  async getTotal(): Promise<number> {
      const result = await this.getWithParams<{ total: number }>(
          `SELECT COUNT(*) as total FROM products`,
          []
      );
      return result ? result.total : 0;
  }
}
