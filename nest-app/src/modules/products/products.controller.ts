import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Public } from 'src/auth/public.decorator';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  // @Roles('admin') // only admin access.
  // @UseGuards(RoleGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  // @Roles('user') // Only user access.
  // @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }

  @Get('user/:userId')
  findByUserId(@Req() req, @Param('userId') userId: string) {
    // only login user id only can access their products.
    let loginUserId = req.user?.id; // Get the user ID from the request object
    // console.log('loginUserId', loginUserId);
    // console.log('userId', userId);
    if (loginUserId !== Number(userId)) {
      throw new Error('You are not authorized to access this resource.');
    }

    return this.productsService.findByUserId(Number(userId));
  }
}
