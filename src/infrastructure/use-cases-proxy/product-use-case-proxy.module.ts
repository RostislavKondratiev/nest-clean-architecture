import { DynamicModule, Module } from "@nestjs/common";
import { IException } from "src/domain/exceptions/exceptions.interface";
import { ProductDatabaseRepository } from "src/infrastructure/repositories/product/product-database.repository";
import { RepositoriesModule } from "src/infrastructure/repositories/repositories.module";
import { AddProductUseCase } from "src/application/product/add-product.usecase";
import { GetProductUseCase } from "src/application/product/get-product.usecase";
import { GetProductsUseCase } from "src/application/product/get-products.usecase";
import { UseCaseProxy } from "./use-case-proxy";

@Module({
    imports: [
        RepositoriesModule,
    ]
})
export class ProductUseCaseProxyModule {
    static POST_PRODUCT_USECASE_PROXY = 'postProductUseCaseProxy'; 
    static GET_PRODUCT_USECASE_PROXY = 'getProductUseCaseProxy'; 
    static GET_PRODUCTS_USECASE_PROXY = 'getProductsUseCaseProxy'; 
    static PUT_PRODUCT_USECASE_PROXY = 'putProductUseCaseProxy'; 
    static PATCH_PRODUCT_USECASE_PROXY = 'patchProductUseCaseProxy'; 
    static DELETE_PRODUCT_USECASE_PROXY = 'deleteProductUseCaseProxy';

    static register(): DynamicModule {
        return {
            module: ProductUseCaseProxyModule,
            providers: [
                { 
                    inject: [ProductDatabaseRepository],
                    provide: ProductUseCaseProxyModule.POST_PRODUCT_USECASE_PROXY,
                    useFactory: (repository: ProductDatabaseRepository) => {
                        return new UseCaseProxy(new AddProductUseCase(repository))
                    } 
                },
                {
                    inject: [ProductDatabaseRepository],
                    provide: ProductUseCaseProxyModule.GET_PRODUCTS_USECASE_PROXY,
                    useFactory: (repository: ProductDatabaseRepository) => {
                        return new UseCaseProxy(new GetProductsUseCase(repository))
                    } 
                },
                {
                    inject: [ProductDatabaseRepository],
                    provide: ProductUseCaseProxyModule.GET_PRODUCT_USECASE_PROXY,
                    useFactory: (repository: ProductDatabaseRepository) => {
                        return new UseCaseProxy(new GetProductUseCase(repository))
                    } 
                }
            ],
            exports: [
                ProductUseCaseProxyModule.POST_PRODUCT_USECASE_PROXY,
                ProductUseCaseProxyModule.GET_PRODUCTS_USECASE_PROXY,
                ProductUseCaseProxyModule.GET_PRODUCT_USECASE_PROXY
            ]
        }
    }
}