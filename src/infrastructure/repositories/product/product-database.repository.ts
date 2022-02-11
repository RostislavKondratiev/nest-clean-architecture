import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { Product } from "src/domain/model/product";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { ProductMapper } from "src/infrastructure/mapper/product.mapper";
import { ProductEntity } from "./entities/product.entity";


@Injectable()
export class ProductDatabaseRepository implements ProductRepository {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductEntity>) {
    }

    async saveProduct(payload: Product): Promise<Product> {
        let productCreated = await new this.productModel(payload).save();
        return ProductMapper.toDomain(productCreated);
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return ProductMapper.toDomains(products);
    }

    async getProduct(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        return ProductMapper.toDomain(product);
    }

    async updateProduct(id: string, payload: Product): Promise<Product> {
        const product = await this.productModel.findByIdAndUpdate(id, payload, { returnOriginal: false }).exec();
        return ProductMapper.toDomain(product);
    }

    async partialUpdateProduct(id: string, payload: Partial<Product>): Promise<Partial<Product>> {
        const fieldsToUpdate = Object.keys(payload).reduce((acc, key) => ({[key]: 1, ...acc}), {});
        const product = await this.productModel.findByIdAndUpdate(
            id, 
            payload, 
            { returnOriginal: false, fields: fieldsToUpdate }
        ).exec();
        return product;
    }

    async deleteProduct(id: string): Promise<Product> {
        const product = await this.productModel.findByIdAndDelete(id).exec();
        return ProductMapper.toDomain(product);
    }
}