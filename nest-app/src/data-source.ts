import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Product } from './products/entities/product.entity';

config(); // .env variables loaded.

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt('process.env.DB_PORT'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: true, // set to false in production
  logging: true,
});
