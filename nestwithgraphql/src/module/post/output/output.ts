import { Post } from 'src/model/post.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetPostsResponseGql {
  @Field(() => [Post], { nullable: 'items' })
  posts: Post[];
  @Field()
  count: number;
}

@ObjectType()
export class GetPostResponseGql {
  @Field(() => Post, { nullable: true })
  post: Post;
}
