import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
@Injectable()
export class ProductsService {

  constructor(private readonly prismaService : PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore
  ) {}
 
  async create(createProductDto: CreateProductDto){
    const cacheKey = 'allProducts';
    const existingProduct = await this.prismaService.products.findMany({
      where: { product_name: createProductDto.product_name }
    });
    if (existingProduct.length > 0) {
      return { message: 'This product already exists' };
    }
    else{
    const newProduct = await this.prismaService.products.create(
    {
      data: createProductDto
    });
    await this.clearCache(cacheKey);
    return {CreateStatus: "Create Success", newProduct};
  }
  }

  async findAll() {
    const cacheKey = 'allProducts';

    const cachedProducts = await this.cacheManager.get(cacheKey);

    if(cachedProducts) {
      return cachedProducts;
    }

    const products = await this.prismaService.products.findMany();

    if(products && products.length > 0) {
      await this.setCacheData(cacheKey, products);
      return products;
    } else{
      return { message: "NO PRODUCT AVAILABLE !"}
    }
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
    const existingProduct = await this.prismaService.products.findUnique({
      where: { product_id: id },
    });
  
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
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

  async setCacheData(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value, { ttl: 300 }); // บันทึกข้อมูล Cache พร้อม TTL 300 วินาที
  }
  
  async clearCache(key: string): Promise<void> {
    await this.cacheManager.del(key); // ลบข้อมูลจาก Cache
  }
}
