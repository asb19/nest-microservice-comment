import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CommentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
