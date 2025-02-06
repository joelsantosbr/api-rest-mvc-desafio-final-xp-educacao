import { Product } from "../entities/Product";

export interface IProductModel {
    create(product: Product): Promise<Product>;
    getAll(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;
    deleteById(id: number): Promise<void>;
    updateById(id: number, product: Product): Promise<Product | null>;
    findByName(name: string): Promise<Product[] | null>;
    getTotal(): Promise<number>;
}
