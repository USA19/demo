import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/core/guards/gql-auth-guard';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/core/customDecorators/getCurrentUserDecorator';
import { CommentService } from './comment.service';
import { User } from 'src/model/user.model';
import { Post } from 'src/model/post.model';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
// import { PostMedia } from 'src/model/postMedia.model';
@InputType()
class AddCommmentBody {
  @Field()
  comment: string;
  @Field(() => String, { nullable: true })
  commentsId: null | string;

  @Field(() => String)
  postId: string;
}

@ObjectType()
export class AddCommentResponseGql {
  @Field(() => Post)
  post: Post;
}

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Mutation(() => AddCommentResponseGql)
  @UseGuards(GqlAuthGuard)
  async addPostComment(
    @Args('body')
    body: AddCommmentBody,
    @CurrentUser() user: User,
  ) {
    const data = {
      userId: user.id,
      comment: body.comment,
      postId: body.postId,
      parentId: body.commentsId,
    };
    return await this.commentService.addComment(data);
  }
}
