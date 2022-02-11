import { Product } from 'src/domain/model/product';
import { ProductEntity } from '../repositories/product/entities/product.entity';

export class ProductMapper {
    public static toDomain(productEntity: ProductEntity): Product {
        if (!productEntity) {
            return null;
        }
        return new Product(
            productEntity.id,
            productEntity.title,
            productEntity.description,
            productEntity.price,
        );
    }

    public static toDomains(productsEntity: ProductEntity[]): Product[] {
        return productsEntity.map((productEntity) => this.toDomain(productEntity))
    }
}