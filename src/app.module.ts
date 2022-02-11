import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [DatabaseModule, ControllersModule],
})
export class AppModule {}
