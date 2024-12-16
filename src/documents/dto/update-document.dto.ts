import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  document_id: any;
  department: any;
  years: any;
  document: any;
  id: any;
}
