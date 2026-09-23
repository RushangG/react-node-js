import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Product } from './modules/products/entities/product.entity';
import { Users } from './modules/users/entities/users.entity';
import { Roles } from './modules/roles/entities/roles.entity';
import { UsersRoles } from './modules/users-roles/entities/users-roles.entity';
import { AuthUserSession } from './modules/auth-user-session/entities/auth-user-session.entity';
import { Customer } from './modules/customer/entities/customer.entity';
config(); // .env variables loaded.

export const AppDataSource = new DataSource({
  type: 'postgres',
  isolationLevel: 'SERIALIZABLE', // for transaction.
  host: process.env.DB_HOST,
  port: parseInt('process.env.DB_PORT'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Users, Roles, UsersRoles, AuthUserSession, Customer],
  synchronize: true,
  logging: false, // logs:  query and error logs
  migrations: ['src/migrations/*.ts'], //  migration files
});
