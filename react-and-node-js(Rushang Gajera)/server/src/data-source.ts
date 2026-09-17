import { DataSource } from 'typeorm';
import { Name } from './name/entities/name.entity';
import { Users } from './users/entities/users.entity';
import { Message } from './message/entities/message.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'examdb',
  synchronize: true,
  logging: false,
  entities: [Users, Name, Message],
});
