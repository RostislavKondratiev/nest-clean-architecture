import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://mongodb:27017'
        )
    ],
    exports: [
        MongooseModule
    ]
})
export class DatabaseModule {

}