import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {id: "0030-ITI3-2092", name: "Samsung", description: "S90 Ultra"},
    {id: "0020-ITI3-2093", name: "Apple", description: "iPhone 12 Pro"},
    {id: "0010-ITI3-2094", name: "Google", description: "Pixel 5"},
  ]

  create(createProductDto: CreateProductDto) {
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find(product => product.id === id);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
