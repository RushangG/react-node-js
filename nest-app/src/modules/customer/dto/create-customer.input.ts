import { InputType, Int, Field } from '@nestjs/graphql';
import { Company } from 'src/modules/companies/entities/company.entity';

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Int, { nullable: true })
  company: Company;
}
