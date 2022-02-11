import { Product } from "../model/product";

export interface ProductRepository {

    saveProduct(payload: Product): Promise<Product>;

    getProducts(): Promise<Product[]>;

    getProduct(id: string): Promise<Product>;

    updateProduct(id: string, payload: Product): Promise<Product>;

    partialUpdateProduct(id: string, payload: Partial<Product>): Promise<Partial<Product>>;

    deleteProduct(id: string): Promise<Product>;

}
