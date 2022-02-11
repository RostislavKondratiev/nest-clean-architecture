import { BadRequestException } from "src/domain/exceptions/exceptions";
import { IException } from "src/domain/exceptions/exceptions.interface";
import { Product } from "src/domain/model/product";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { ProductCommand } from "./commands/product.command";
import { ProductFactory } from "./factory/product.factory";

export class AddProductUseCase {
    private readonly productFactory: ProductFactory;
    constructor(
        private readonly repository: ProductRepository,
        ) {
            this.productFactory = new ProductFactory();
        }

    async execute(content: ProductCommand): Promise<Product> {
        try {
            const product = this.productFactory.createProduct(content);
            return this.repository.saveProduct(product);
        } catch {
            throw new BadRequestException('Cannot create product');
        }
    }
}