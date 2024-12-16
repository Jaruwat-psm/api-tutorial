import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id/:dc')
  findOne(@Param('id') id: string, @Param('dc') dc: string) {
    return this.documentsService.findOne(id, dc);
  }

  @Post('/Update')
  update(@Body() updateDocumentDto: UpdateDocumentDto) {
    console.log(updateDocumentDto)
    return this.documentsService.update(updateDocumentDto);
  }

  @Delete(':id/:dc')
  remove(@Param('id') id: number, @Param('dc') dc: string) {
    return this.documentsService.remove(id, dc);
  }
}
