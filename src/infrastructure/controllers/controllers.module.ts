import { Module } from "@nestjs/common";
import { AuthUseCaseProxyModule } from "../use-cases-proxy/auth-use-case-proxy.module";
import { ProductUseCaseProxyModule } from "../use-cases-proxy/product-use-case-proxy.module";
import { AuthController } from "./auth/auth.controller";
import { ProductController } from "./product/product.controller";

@Module({
    imports: [
        ProductUseCaseProxyModule.register(),
        AuthUseCaseProxyModule.register()
    ],
    controllers: [
        ProductController,
        AuthController
    ]
})
export class ControllersModule {
}