import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [ProjectModule, LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
