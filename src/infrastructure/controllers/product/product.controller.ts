import { Controller, UseGuards, Get, Param, Post, Body, Inject } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/use-cases-proxy/use-case-proxy";
import { AddProductUseCase } from "src/application/product/add-product.usecase";
import { GetProductUseCase } from "src/application/product/get-product.usecase";
import { GetProductsUseCase } from "src/application/product/get-products.usecase";
import { CreateProductDto } from "./request/create-product.dto";
import { ProductPresenter } from "./presenters/product.presenter";
import { ProductUseCaseProxyModule } from "src/infrastructure/use-cases-proxy/product-use-case-proxy.module";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(
        @Inject(ProductUseCaseProxyModule.GET_PRODUCTS_USECASE_PROXY)
        private readonly getProductsUseCase: UseCaseProxy<GetProductsUseCase>,
        @Inject(ProductUseCaseProxyModule.GET_PRODUCT_USECASE_PROXY)
        private readonly getProductUseCase: UseCaseProxy<GetProductUseCase>,
        @Inject(ProductUseCaseProxyModule.POST_PRODUCT_USECASE_PROXY)
        private readonly postProductUseCase: UseCaseProxy<AddProductUseCase> 
    ) {}

    @Get()
    async getProductsList(): Promise<{products: ProductPresenter[]}> {
        const result = await this.getProductsUseCase.getInstance().execute();
        return { products: result.map((product) => new ProductPresenter(product)) }
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        const result = await this.getProductUseCase.getInstance().execute(id);
        return { product: new ProductPresenter(result) };
    }
 
    @Post()
    async addProduct(@Body() productToCreate: CreateProductDto): Promise<{product: ProductPresenter}> {
        const result = await this.postProductUseCase.getInstance().execute(productToCreate);
        return { product: new ProductPresenter(result) };
    }
}
