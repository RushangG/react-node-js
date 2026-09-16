import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Users } from './users/entities/users.entity';
import { Name } from './name/entities/name.entity';
import { AppDataSource } from './data-source';
import { getRepositoryToken } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 4000);

  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }

  let userRepo = AppDataSource.getRepository(Users);
  let nameRepo = AppDataSource.getRepository(Name);

  let user = await userRepo.find();

  console.log('user Data : ', user);

  async function hashPassword(password: string) {
    let hash = bcrypt.hash(password, 10);
    return hash;
  }

  let User1 = {
    username: 'examuser',
    passwordHash: await hashPassword('Exam@123'),
  };

  let User2 = {
    username: 'examadmin',
    passwordHash: await hashPassword('Admin@123'),
    role: 'admin',
  };

  let newUser1 = await userRepo.create(User1);
  let saveUser1 = await userRepo.save(newUser1);

  let newUser2 = await userRepo.create(User2);
  let saveUser2 = await userRepo.save(newUser2);

  let name = {
    email: 'user1@gmail.com',
    name: 'user1',
    course: 'Btech',
    user_id: saveUser1,
  };

  let newName = nameRepo.create(name);
  let saveName = await nameRepo.save(newName);

  let NameRecord = await userRepo.findOne({
    where: {
      username: 'examuser',
    },
    relations: {
      Names: true,
    },
  });
  console.log('newUser1 :', saveUser1);
  console.log('newUser2 :', saveUser2);
  console.log('newName1 :', saveName);

  console.log('NameRecord :', NameRecord);
}
void bootstrap();
