import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Model } from 'dynamoose/dist/Model';
import * as dynamoose from "dynamoose";
import { ProjectSchema } from './entities/project-schema';
import { CreateProjectDTO } from './dtos/create-project.dto';
import { EntityTypes } from '../utils/enums';
import { UpdateProjectDTO } from './dtos/update-project.dto';
import { QueryResponse } from 'dynamoose/dist/ItemRetriever';
import { normalizeProjectIds, normalizeProjectIdsForList } from 'src/utils/normalizers';
import { createDynamooseId, createId } from 'src/utils/utils';

@Injectable()
export class ProjectService {
  private dbInstance: Model<Project>
  constructor(
  ) {
    this.dbInstance = dynamoose.model<Project>('crm', ProjectSchema)
  }

  async create(dto: CreateProjectDTO) {
    const pk = createDynamooseId(createId(), EntityTypes.PROJECT);
    let project: Project;
    
    try {
      project = await this.dbInstance.create({ pk, sk: pk, ...dto });  
    } catch (error) {
      throw new Error(error);
    }
    return normalizeProjectIds(project);
  }

  async findById(pk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT)
    const proj = await this.dbInstance.get({ pk, sk: pk });
    if (!proj) throw new NotFoundException('Project Not Found');
    return normalizeProjectIds(proj);
  }

  async findAll() {
    const projects = await this.dbInstance.query('entityType').eq('project').exec();
    const projs = this.arrayByQueryResponse(projects);
    return normalizeProjectIdsForList(projs);
  }

  private arrayByQueryResponse(projQueryResponse: QueryResponse<Project>): Project[] {
    const projs: Project[] = []
    for (let count = 0; count < projQueryResponse.length; count++) {
      projs.push(projQueryResponse[count]);
    }
    return projs;
  }

  async update(pk: string, updateDto: UpdateProjectDTO) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    const project = await this.dbInstance.update({ pk, sk: pk }, updateDto);
    return normalizeProjectIds(project);
  }

  async addAccount(pk: string, accounts: string[]) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    const proj = await this.getAccountsProject(pk);

    for (const acc of proj.accounts) {
      if (!accounts.includes(acc)) {
        accounts.push(acc);
      }
    }
    const updateDto = { accounts }
    const project = await this.dbInstance.update({ pk, sk: pk }, updateDto);
    return normalizeProjectIds(project);
  }

  private async getAccountsProject(pk: string) {
    const proj = await this.dbInstance.query('pk').eq(pk).attribute("accounts");
    const ret: Project = proj[0];
    return ret;
  }

  async delete(pk: string) {
    pk = createDynamooseId(pk, EntityTypes.PROJECT);
    await this.dbInstance.delete({ pk, sk: pk });
  }


}

