import { Exclude, Expose } from "class-transformer";
import { Product } from "src/domain/model/product";

@Exclude()
export class ProductPresenter {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
    }
}