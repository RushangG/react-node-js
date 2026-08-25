import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/products.module';
import { AppDataSource } from '../data-source';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file 
    TypeOrmModule.forRoot(AppDataSource.options), // use the options from data-source.ts
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
