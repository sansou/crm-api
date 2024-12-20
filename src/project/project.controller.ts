import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dtos/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly service: ProjectService
  ) { }

  @Post()
  async create(
    @Body() projDto: CreateProjectDTO
  ) {    
    // TODO
    //falta pegar o id do usuário que vem do front    
    return await this.service.create(projDto);
  }

  @Get(':id')
  async get(@Param('id') projId: string) {
    return this.service.findById(projId);
  }

  @Get()
  async getAll() {
    console.log('Entrei no controller');
    return this.service.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') projId: string,
    @Body() updateProjDto: any
  ) {
    return this.service.update(projId, updateProjDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') pk: string,
  ) {
    return await this.service.delete(pk);
  }
}
