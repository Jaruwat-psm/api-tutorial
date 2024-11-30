import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
   readonly product_id: string;
    @IsString()
    product_name: string;
    @IsString()
    product_desc: string;
    @IsOptional()
    product_path?: string;
    @IsString()
    product_type: string;
    @IsOptional()
    product_filename?: string;
  }
  