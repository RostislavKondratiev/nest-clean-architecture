import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { productSchema } from "./product/schema/product.schema";
import { ProductDatabaseRepository } from "./product/product-database.repository";
import { userSchema } from "./user/schema/user.schema";
import { UserDatabaseRepository } from "./user/user-database.repository";


const schemas: ModelDefinition[] = [
    {name: 'Product', schema: productSchema},
    {name: 'User', schema: userSchema }
];

@Module({
    imports: [MongooseModule.forFeature(schemas)],
    providers: [ProductDatabaseRepository, UserDatabaseRepository],
    exports: [ProductDatabaseRepository, UserDatabaseRepository]
})
export class RepositoriesModule {
}