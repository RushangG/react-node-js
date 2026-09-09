import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Product } from './modules/products/entities/product.entity';
import { Users } from './modules/users/entities/users.entity';
import { Roles } from './modules/roles/entities/roles.entity';
import { UsersRoles } from './modules/users-roles/entities/users-roles.entity';
config(); // .env variables loaded.

export const AppDataSource = new DataSource({
  type: 'postgres',
  isolationLevel: 'SERIALIZABLE',
  host: process.env.DB_HOST,
  port: parseInt('process.env.DB_PORT'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Users, Roles, UsersRoles],
  synchronize: true, // set to false in production
  logging: true, // Enable query and error logging
  migrations: ['src/migrations/*.ts'], // Path to your migration files
});
