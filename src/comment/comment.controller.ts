import { Comment, Prisma } from '.prisma/client';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  public constructor(private readonly commentService: CommentService) {}

  @Post('/:postid/comment/create')
  public async CreatreComment(
    @Body() body: Prisma.CommentCreateInput,
  ): Promise<Comment> {
    const data = await this.commentService.createComment(
      body.postId,
      body.content,
    );

    return data;
  }

  @Get('/:postid/comments/')
  public async GetComments(
    @Param('postid') postid: string,
  ): Promise<Comment[]> {
    const data = await this.commentService.getComments(parseInt(postid));

    return data;
  }

  @EventPattern('delete-post')
  public async deletePost(@Payload() data: { id: number }) {
    await this.commentService.deletePostData(data.id);
    console.log(' data listened', data);
  }

  @EventPattern({
    cmd: 'get-comment',
    get: 'comments',
  })
  public async GetCommCommentsents(
    @Payload() data: { id: number },
  ): Promise<Comment[]> {
    console.log('event called');
    const d = await this.commentService.getComments(data.id);
    console.log(d);

    return d;
  }
}
