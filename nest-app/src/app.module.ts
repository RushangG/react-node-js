import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';

import { AppDataSource } from './data-source';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import { ChatGateway } from './modules/websocket/chat.gateway';

import { LoggerMiddleware } from './middleware/logger.middleware';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { RolesModule } from './modules/roles/roles.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { UsersRolesModule } from './modules/users-roles/users-roles.module';
import { AuthUserSessionModule } from './modules/auth-user-session/auth-user-session.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    TypeOrmModule.forRoot(AppDataSource.options), // use the options from data-source.ts
    ProductsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    FileUploadModule,
    UsersRolesModule,
    AuthUserSessionModule,

    // for module base router
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          { path: '', module: ProductsModule },
          { path: '', module: UsersModule },
          { path: '', module: AuthModule },
          { path: '', module: RolesModule },
          { path: '', module: FileUploadModule },
          { path: '', module: UsersRolesModule },
          { path: '', module: AuthUserSessionModule },
        ],
      },
    ]),

    CustomersModule,

  

    // ThrottlerModule.forRoot({
    //   throttlers: [
    //     {
    //       ttl: 60000, // Time to live in seconds
    //       limit: 5, // Maximum number of requests within the ttl
    //       blockDuration: 30000, // Block for 30 seconds.
    //     },
    //   ],
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: 'APP_GUARD',
    //   useClass: ThrottlerGuard,
    // },
    ChatGateway,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'Users', method: RequestMethod.POST })
      .forRoutes(UsersController);
  }
}
