import { Comment, prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createComment(postId: number, content: string): Promise<any> {
    const comment = this.prismaService.comment.create({
      data: {
        postId: postId,
        content: content,
      },
    });
    return comment;
  }

  public async getComments(postId: number): Promise<Comment[]> {
    const comment = this.prismaService.comment.findMany({
      where: {
        postId,
      },
    });
    return comment;
  }

  public async deletePostData(postId: number): Promise<void> {
    const d = await this.prismaService.comment.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
      },
    });

    await this.prismaService.comment.deleteMany({
      where: {
        id: { in: d.map((x) => x.id) },
      },
    });
  }
}
