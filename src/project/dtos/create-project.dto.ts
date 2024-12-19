import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, isString, IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({ description: 'Nome do projeto', example: 'Projeto inicial' })
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name: string; 
  
  @ApiProperty({ description: 'Ids dos responsáveis pelo projeto', example: ['saiu-ksap-ks99-983s', 'jjjj-334f-h3ir-ksoa'] })
  @IsArray()
  accounts: string[];
  
  @ApiProperty({ description: 'Ids dos responsáveis pelo projeto', example: ['saiu-ksap-ks99-983s', 'jjjj-334f-h3ir-ksoa'] })
  @IsArray({message: 'At least one user is required to register a new project'})
  domains: string[];

}
