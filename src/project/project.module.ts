import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController],

})
export class ProjectModule {}
