import { NotFoundException } from "src/domain/exceptions/exceptions";
import { ProductRepository } from "src/domain/repositories/product.repository";

export class GetProductUseCase {
    constructor(
        private readonly repository: ProductRepository,
    ) {}

    async execute(id: string) {
        try {
            return await this.repository.getProduct(id);
        } catch {
            throw new NotFoundException('Cannot find product with specified ID')
        }
    }
}