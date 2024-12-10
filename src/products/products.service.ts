import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ProductsService {

  constructor(private readonly prismaService : PrismaService) {}
 
  async create(createProductDto: CreateProductDto){
    const existingProduct = await this.prismaService.products.findMany({
      where: { product_name: createProductDto.product_name }
    });
    if (existingProduct) {
      return { message: 'This product already exists' };
    }
    else{
    const newProduct = await this.prismaService.products.create(
    {
      data: createProductDto
    });
    return {CreateStatus: "Create Success", newProduct};
  }
  }

  async findAll() {
    return this.prismaService.products.findMany();
  }

  async findOne(id: string) {
    const product = await this.prismaService.products.findUnique({
      where: { product_id: id }, 
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if( product.product_id === id){
      return product;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // ตรวจสอบว่ามี Product ที่ต้องการอัปเดตหรือไม่
    const existingProduct = await this.prismaService.products.findUnique({
      where: { product_id: id },
    });
  
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    // อัปเดตข้อมูล
    const updatedProduct = await this.prismaService.products.update({
      where: { product_id: id },  // ระบุข้อมูลที่จะอัปเดตด้วย product_id
      data: updateProductDto,    // อัปเดตข้อมูลที่ส่งมาจาก DTO
    });
  
    return updatedProduct; // คืนค่าข้อมูลที่อัปเดตกลับไป
  }
  

  remove(id: string) {
    return `This action removes a #${id} product`;
  }

  async findByName(productName: string){
    const findProduct = await this.prismaService.products.findMany({
      where: { product_name: productName }
    });
    if(findProduct.length > 0){
      return true;
    }else{
      return false;
    }
  }
}
