import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { AppDataSource } from '../../data-source';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log('Received service createProductDto:', createProductDto); // log

    const product = this.productRepo.create(createProductDto);

    return this.productRepo.save(product);
  }

  async findAll() {
    const products = await this.productRepo.find({
      relations: {
        user_id: true,
      },
    });

    // const products = await AppDataSource.createQueryBuilder()
    //   .select('Product')

    //   .from(Product, 'Product')
    //   .leftJoinAndSelect('Product.user_id', 'Users')
    //   .getMany();

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  async findOne(id: number) {
    // const product = await this.productRepo.findOneBy({ id });
    const product = await this.productRepo
      .createQueryBuilder('Product')
      .where('Product.id = :id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepo.delete(id);
    return `This action removes a #${id} product`;
  }

  async findByUserId(userId: number) {
    // const products = await this.productRepo.find({
    //   where: { user_id: { id: userId } },
    // });

    const products = await this.productRepo
      .createQueryBuilder('Product')
      .where('Product.user_id = :userId', { userId })
      .getMany();

    return products;
  }

  // only for transaction testing purpose
  async productsFindByName(name: string) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      // let products = await queryRunner.manager.update(
      //   Product,
      //   { name: name },
      //   { name: 'Updated 152' },
      // );
      let product;
      console.log('time started');

      product = await queryRunner.manager.update(
        Product,
        { name: name },
        { name: 'Updated 152' },
      );

      await queryRunner.commitTransaction();

      console.log('productsFindByName:', product);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
