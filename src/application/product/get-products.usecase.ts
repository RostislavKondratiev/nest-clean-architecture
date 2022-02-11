import { ProductRepository } from "src/domain/repositories/product.repository";

export class GetProductsUseCase {
    constructor(
        private readonly repository: ProductRepository,
    ) {}

    async execute() {
        return await this.repository.getProducts(); 
    }
}