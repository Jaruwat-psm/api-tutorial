import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class DocumentsService {
constructor(private readonly prismaService : PrismaService){}

  create(createDocumentDto: CreateDocumentDto) {
    return 'This action adds a new document';
  }

  findAll() {
    return `All Documents`;
  }

  async findOne(id: string, document: string) {
    let Number: string = "Number";
    if(document === "inbox_document" || document === "internal_office"){
      Number = "inbox_id"
    }

    if(document === "auction_document"){
      Number = "AD_ID";
    }
    const Result = await this.prismaService[document].findMany({
      where: {
        [Number]: id
      },
    })
    if(Result){
      return Result;
    } else {
      return { Error: "Documents Not Found"}
    }
  }

  async update(updateDocumentDto: UpdateDocumentDto) {
    try{
    const document: string = updateDocumentDto.document
    let Number: string = "Number";
    if(document === "inbox_document" || document === "internal_office"){
      Number = "inbox_id"
    }
 const Result = await this.prismaService[document].update({
      where: {
        ID: updateDocumentDto.id,
        depart_NUMBER: updateDocumentDto.department,
        years: updateDocumentDto.years,
      },
      data: {
        [Number]: updateDocumentDto.document_id
      }
    })
    return {Data: Result, Status: 1, Message: "Update Success"};
  }
  catch(err){
   return err.message;
  }
  }

  async remove(id: number, dc: string) {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const Result = await this.prismaService[dc].delete({
      where: {
        ID: numericId,
      },
    })
    if(Result){
      return {Status: 1, Message: "Document Deleted"};
    } else {
      return { Error: "Documents Not Found"}
    }
  }
}
