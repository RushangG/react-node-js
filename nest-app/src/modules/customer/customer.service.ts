import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  create(createCustomerInput: CreateCustomerInput) {
    const customer = this.customerRepo.create(createCustomerInput);
    return this.customerRepo.save(customer);
  }

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: number) {
    let customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerInput: UpdateCustomerInput) {
    let customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    await this.customerRepo.update(id, updateCustomerInput);
    return await this.customerRepo.findOneBy({ id });
  }

  remove(id: number) {
    let customer = this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    this.customerRepo.delete(id);
    return customer;
  }
}
