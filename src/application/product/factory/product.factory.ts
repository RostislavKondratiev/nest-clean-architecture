import { Product } from "src/domain/model/product";
import { ProductCommand } from "../commands/product.command";

export class ProductFactory {
    public createProduct(productCommand: ProductCommand): Product {
        return new Product(
            '',
            productCommand.title,
            productCommand.description,
            productCommand.price,
        )
    }
}